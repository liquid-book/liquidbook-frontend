import { createChart, CandlestickData, IChartApi, ISeriesApi, Time, DeepPartial, ColorType } from 'lightweight-charts';

interface GeneratedData {
    initialData: CandlestickData<Time>[];
    realtimeUpdates: CandlestickData<Time>[];
}

let randomFactor = 25 + Math.random() * 25;
const samplePoint = (i: number): number =>
    i *
        (0.5 +
            Math.sin(i / 1) * 0.2 +
            Math.sin(i / 2) * 0.4 +
            Math.sin(i / randomFactor) * 0.8 +
            Math.sin(i / 50) * 0.5) +
    200 +
    i * 2;

function generateData(
    numberOfCandles: number = 500,
    updatesPerCandle: number = 5,
    startAt: number = 100
): GeneratedData {
    const createCandle = (val: number, time: Time): CandlestickData<Time> => ({
        time,
        open: val,
        high: val,
        low: val,
        close: val,
    });

    const updateCandle = (candle: CandlestickData<Time>, val: number): CandlestickData<Time> => ({
        time: candle.time,
        close: val,
        open: candle.open,
        low: Math.min(candle.low, val),
        high: Math.max(candle.high, val),
    });

    randomFactor = 25 + Math.random() * 25;
    const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0));
    const numberOfPoints = numberOfCandles * updatesPerCandle;
    const initialData: CandlestickData<Time>[] = [];
    const realtimeUpdates: CandlestickData<Time>[] = [];
    let lastCandle: CandlestickData<Time> = createCandle(samplePoint(-1), date.getTime() / 1000 as Time);
    let previousValue = samplePoint(-1);

    for (let i = 0; i < numberOfPoints; ++i) {
        if (i % updatesPerCandle === 0) {
            date.setUTCDate(date.getUTCDate() + 1);
        }
        const time = date.getTime() / 1000 as Time;
        let value = samplePoint(i);
        const diff = (value - previousValue) * Math.random();
        value = previousValue + diff;
        previousValue = value;

        if (i % updatesPerCandle === 0) {
            const candle = createCandle(value, time);
            lastCandle = candle;
            if (i >= startAt) {
                realtimeUpdates.push(candle);
            }
        } else {
            const newCandle = updateCandle(lastCandle, value);
            lastCandle = newCandle;
            if (i >= startAt) {
                realtimeUpdates.push(newCandle);
            } else if ((i + 1) % updatesPerCandle === 0) {
                initialData.push(newCandle);
            }
        }
    }

    return {
        initialData,
        realtimeUpdates,
    };
}

const chartOptions = {
    layout: {
        textColor: 'black',
        background: { type: ColorType.Solid, color: 'white' },
    },
    height: 200,
};

const container = document.getElementById('container') as HTMLElement;
const chart: IChartApi = createChart(container, chartOptions);

window.addEventListener('resize', () => {
    chart.applyOptions({ height: 200 });
});

const series: ISeriesApi<'Candlestick'> = chart.addCandlestickSeries({
    upColor: '#26a69a',
    downColor: '#ef5350',
    borderVisible: false,
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350',
});

const data = generateData(2500, 20, 1000);

series.setData(data.initialData);
chart.timeScale().fitContent();
chart.timeScale().scrollToPosition(5, false);

function* getNextRealtimeUpdate(realtimeData: CandlestickData<Time>[]): Generator<CandlestickData<Time>, null, unknown> {
    for (const dataPoint of realtimeData) {
        yield dataPoint;
    }
    return null;
}

const streamingDataProvider = getNextRealtimeUpdate(data.realtimeUpdates);

const intervalID = setInterval(() => {
    const update = streamingDataProvider.next();
    if (update.done) {
        clearInterval(intervalID);
        return;
    }
    series.update(update.value);
}, 100);

const styles = `
    .buttons-container {
        display: flex;
        flex-direction: row;
        gap: 8px;
    }
    .buttons-container button {
        all: initial;
        font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu,
            sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 510;
        line-height: 24px;
        letter-spacing: -0.32px;
        padding: 8px 24px;
        color: rgba(19, 23, 34, 1);
        background-color: rgba(240, 243, 250, 1);
        border-radius: 8px;
        cursor: pointer;
    }

    .buttons-container button:hover {
        background-color: rgba(224, 227, 235, 1);
    }

    .buttons-container button:active {
        background-color: rgba(209, 212, 220, 1);
    }
`;

const stylesElement = document.createElement('style');
stylesElement.innerHTML = styles;
container.appendChild(stylesElement);

const buttonsContainer = document.createElement('div');
buttonsContainer.classList.add('buttons-container');
const button = document.createElement('button');
button.innerText = 'Go to realtime';
button.addEventListener('click', () => chart.timeScale().scrollToRealTime());
buttonsContainer.appendChild(button);

container.appendChild(buttonsContainer);