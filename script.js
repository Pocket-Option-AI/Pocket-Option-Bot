// 1. Initialize the Chart
const chartContainer = document.getElementById('chart');
const chart = LightweightCharts.createChart(chartContainer, {
    width: chartContainer.clientWidth,
    height: chartContainer.clientHeight,
    layout: {
        backgroundColor: 'transparent',
        textColor: '#8892b0',
    },
    grid: {
        vertLines: { color: 'rgba(28, 42, 74, 0.5)' },
        horzLines: { color: 'rgba(28, 42, 74, 0.5)' },
    },
    crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
    },
    rightPriceScale: {
        borderColor: '#1c2a4a',
    },
    timeScale: {
        borderColor: '#1c2a4a',
        timeVisible: true,
        secondsVisible: true,
    },
});

// 2. Add the Area Series (The blue gradient line)
const areaSeries = chart.addAreaSeries({
    topColor: 'rgba(77, 166, 255, 0.4)',
    bottomColor: 'rgba(77, 166, 255, 0.0)',
    lineColor: '#4da6ff',
    lineWidth: 2,
});

// 3. Generate Fake Data for the chart
const data = [];
let currentTime = Math.floor(Date.now() / 1000);
let currentPrice = 1.68838;

for (let i = 0; i < 50; i++) {
    currentPrice = currentPrice + (Math.random() - 0.5) * 0.0002;
    data.push({ 
        time: currentTime - (50 - i) * 5, 
        value: currentPrice 
    });
}

areaSeries.setData(data);

// Make the chart responsive when window resizes
window.addEventListener('resize', () => {
    chart.applyOptions({ width: chartContainer.clientWidth });
});

// 4. Simulate the Expiration Timer
const expTimeElement = document.getElementById('expiration-time');

function updateTimer() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    expTimeElement.innerText = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTimer, 1000);

// 5. Add Click Effects to Buttons
const buyBtn = document.querySelector('.btn-buy');
const sellBtn = document.querySelector('.btn-sell');

buyBtn.addEventListener('click', () => {
    alert('Pocket option Bot: Trade placed for BUY. (Demo Mode)');
});

sellBtn.addEventListener('click', () => {
    alert('Pocket option Bot: Trade placed for SELL. (Demo Mode)');
});

// 6. Bottom Nav Click Logic
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
    });
});

// Make sure chart draws correctly on load
setTimeout(() => {
    chart.applyOptions({ width: chartContainer.clientWidth });
}, 100);
