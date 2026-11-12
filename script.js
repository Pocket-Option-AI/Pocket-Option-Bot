document.addEventListener("DOMContentLoaded", function() {
    const chartContainer = document.getElementById('chart');
    
    // 1. Create the chart
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
        rightPriceScale: {
            borderColor: '#1c2a4a',
        },
        timeScale: {
            borderColor: '#1c2a4a',
            timeVisible: true,
            secondsVisible: true,
        },
    });

    // 2. Add the blue area series
    const areaSeries = chart.addAreaSeries({
        topColor: 'rgba(77, 166, 255, 0.4)',
        bottomColor: 'rgba(77, 166, 255, 0.0)',
        lineColor: '#4da6ff',
        lineWidth: 2,
    });

    // 3. Generate initial data
    let currentPrice = 1.68838;
    let currentTime = Math.floor(Date.now() / 1000);
    const data = [];

    for (let i = 0; i < 50; i++) {
        currentPrice += (Math.random() - 0.5) * 0.0002;
        data.push({ 
            time: currentTime - (50 - i) * 2, 
            value: currentPrice 
        });
    }
    areaSeries.setData(data);

    // 4. Make the chart move live every 1 second
    setInterval(() => {
        currentTime += 1; 
        currentPrice += (Math.random() - 0.5) * 0.0002; 
        areaSeries.update({ 
            time: currentTime, 
            value: currentPrice 
        });
    }, 1000);

    // 5. Update the timer at the top
    const expTimeElement = document.getElementById('expiration-time');
    if (expTimeElement) {
        setInterval(() => {
            const now = new Date();
            expTimeElement.innerText = 
                String(now.getHours()).padStart(2, '0') + ':' + 
                String(now.getMinutes()).padStart(2, '0') + ':' + 
                String(now.getSeconds()).padStart(2, '0');
        }, 1000);
    }

    // 6. Resize handler for mobile
    window.addEventListener('resize', () => {
        chart.applyOptions({ width: chartContainer.clientWidth });
    });
});
