window.addEventListener("load", function() {
    setTimeout(function() {
        const chartContainer = document.getElementById('chart');
        
        // Force dimensions for Samsung mobile
        chartContainer.style.width = chartContainer.clientWidth + 'px';
        chartContainer.style.height = chartContainer.clientHeight + 'px';

        const chart = LightweightCharts.createChart(chartContainer, {
            width: chartContainer.clientWidth,
            height: chartContainer.clientHeight,
            layout: { backgroundColor: 'transparent', textColor: '#8892b0' },
            grid: { vertLines: { color: 'rgba(28, 42, 74, 0.3)' }, horzLines: { color: 'rgba(28, 42, 74, 0.3)' } },
            crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
            rightPriceScale: { borderColor: 'transparent' },
            timeScale: { borderColor: 'transparent', timeVisible: true, secondsVisible: true },
        });

        const areaSeries = chart.addAreaSeries({
            topColor: 'rgba(77, 166, 255, 0.4)',
            bottomColor: 'rgba(77, 166, 255, 0.0)',
            lineColor: '#4da6ff',
            lineWidth: 2,
        });

        // Generate initial data matching the screenshot
        const data = [];
        let currentTime = Math.floor(Date.now() / 1000);
        let currentPrice = 1.68838;

        for (let i = 0; i < 50; i++) {
            if (i > 10 && i < 15) currentPrice -= 0.0002;
            else if (i > 15 && i < 25) currentPrice += 0.0003;
            else currentPrice += (Math.random() - 0.5) * 0.0001;
            
            data.push({ time: currentTime - (50 - i) * 5, value: currentPrice });
        }
        areaSeries.setData(data);

        // MAKE THE GRAPH MOVE LIKE A LIVE MARKET
        setInterval(() => {
            currentTime += 5;
            currentPrice += (Math.random() - 0.48) * 0.0001; // Slight upward bias
            
            const newPoint = { time: currentTime, value: currentPrice };
            areaSeries.update(newPoint);
            
            // Keep the chart scrolling by shifting the visible range
            chart.timeScale().scrollToPosition(1, false);
            
        }, 1000); // Updates every 1 second

        // Window resize handling
        window.addEventListener('resize', () => {
            chart.applyOptions({ width: chartContainer.clientWidth, height: chartContainer.clientHeight });
        });

        // Timer
        const expTimeElement = document.getElementById('expiration-time');
        setInterval(() => {
            const now = new Date();
            expTimeElement.innerText = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0');
        }, 1000);

        // Buttons
        document.querySelector('.btn-buy').addEventListener('click', () => alert('Pocket option Bot: BUY placed.'));
        document.querySelector('.btn-sell').addEventListener('click', () => alert('Pocket option Bot: SELL placed.'));

    }, 500);
});
