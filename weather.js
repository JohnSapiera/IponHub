/* IponHub Weather Engine - Zero UI Conflict */
async function syncIponHubWeather() {
    const sky = document.getElementById('cebu-sky');
    const rain = document.getElementById('rain');
    const lightning = document.getElementById('lightning');
    if (!sky) return;

    const hour = new Date().getHours();
    
    // 1. Oras lang ang binabago sa Background
    sky.classList.remove('sky-day', 'sky-sunset', 'sky-night');
    if (hour >= 18 || hour < 5) sky.classList.add('sky-night');
    else if (hour >= 16 && hour < 18) sky.classList.add('sky-sunset');
    else sky.classList.add('sky-day');

    // 2. Weather Sync (Rain/Lightning)
    try {
        const res = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Cebu&appid=da0650965e6d628f844b24131df33246');
        const data = await res.json();
        const main = data.weather[0].main;

        if (rain) {
            (main === 'Rain' || main === 'Drizzle' || main === 'Thunderstorm') 
            ? rain.classList.add('active') : rain.classList.remove('active');
        }

        if (main === 'Thunderstorm' && lightning) {
            if (!window.lgtInterval) {
                window.lgtInterval = setInterval(() => {
                    if (Math.random() > 0.8) {
                        lightning.style.animation = 'flashAnim 0.4s ease-out';
                        setTimeout(() => lightning.style.animation = '', 400);
                    }
                }, 5000);
            }
        }
    } catch (err) { console.log("Weather offline."); }
}
syncIponHubWeather();
setInterval(syncIponHubWeather, 600000);
