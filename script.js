// We wait for the phone to fully load before doing anything
window.addEventListener("load", function() {
    
    // Wait a tiny bit more to ensure the Samsung screen is sized correctly
    setTimeout(function() {
        const chartContainer = document.getElementById('chart');
        
        // If the container is somehow 0 height, force a minimum height for mobile
        if (chartContainer.clientHeight === 0) {
            chartContainer.style.height = "300px";
        }

        // 1. Create the Chart (Exact colors from your screenshot)
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

        // 2. Add the blue line (Exact color from screenshot)
        const areaSeries = chart.addAreaSeries({
            topColor: 'rgba(77, 166, 255, 0.4)',
            bottomColor: 'rgba(77, 166, 255, 0.0)',
            lineColor: '#4da6ff',
            lineWidth: 2,
        });

        // 3. Generate the Fake Data (The zig-zag shape)
        const data = [];
        let currentTime = Math.floor(Date.now() / 1000);
        let currentPrice = 1.68838;

        for (let i = 0; i < 60; i++) {
            // This creates the specific spikes seen in your image
            if (i > 10 && i < 15) currentPrice -= 0.0002;
            else if (i > 15 && i < 25) currentPrice += 0.0003;
            else currentPrice += (Math.random() - 0.5) * 0.0001;
            
            data.push({ 
                time: currentTime - (60 - i) * 5, 
                value: currentPrice 
            });
        }

        areaSeries.setData(data);

        // 4. Fix resizing for Mobile
        window.addEventListener('resize', () => {
            chart.applyOptions({ width: chartContainer.clientWidth });
        });

        // 5. The live timer at the top
        const expTimeElement = document.getElementById('expiration-time');
        if(expTimeElement) {
            setInterval(() => {
                const now = new Date();
                expTimeElement.innerText = 
                    String(now.getHours()).padStart(2, '0') + ':' + 
                    String(now.getMinutes()).padStart(2, '0') + ':' + 
                    String(now.getSeconds()).padStart(2, '0');
            }, 1000);
        }

        // 6. Buy/Sell Buttons
        const buyBtn = document.querySelector('.btn-buy');
        const sellBtn = document.querySelector('.btn-sell');
        
        if(buyBtn) buyBtn.addEventListener('click', () => alert('Pocket option Bot: BUY placed.'));
        if(sellBtn) sellBtn.addEventListener('click', () => alert('Pocket option Bot: SELL placed.'));

    }, 800); // Wait 0.8 seconds for the Samsung browser to settle
});
