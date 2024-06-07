document.addEventListener('DOMContentLoaded', () => {
    const reloadInterval = 30000; // 30 seconds
    const iframes = document.querySelectorAll('iframe');

    setInterval(() => {
        iframes.forEach(iframe => {
            const src = iframe.src;
            iframe.src = '';
            iframe.src = src;
        });
    }, reloadInterval);

    document.getElementById('goBackButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    document.getElementById('DynamicButton').addEventListener('click', () => {
        window.location.href = 'dynamic_poster.html';
    });
    
    document.getElementById('SatelliteButton').addEventListener('click', () => {
        window.location.href = 'satellite.html';
    })
});