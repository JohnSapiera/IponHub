/* ============================================
   weather.js
   IponHub — Weather System (Time + OpenWeather)
   ============================================ */

async function updateWeather() {
    const sky       = document.getElementById('cebu-sky');
    const rain      = document.getElementById('rain');
    const lightning = document.getElementById('lightning');

    // Time-based sky color
    const hour     = new Date().getHours();
    const isNight  = (hour >= 18 || hour < 5);
    const isSunset = (hour >= 16 && hour < 18);

    if (isNight) {
        sky.style.background = "linear-gradient(180deg, #0B0E14 0%, #1A237E 100%)";
    } else if (isSunset) {
        sky.style.background = "linear-gradient(180deg, #E64A19 0%, #FFB74D 100%)";
    } else {
        sky.style.background = "linear-gradient(180deg, #40C4FF 0%, #B3E5FC 100%)";
    }

    // Live weather from OpenWeather
    try {
        const resp      = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Cebu&appid=da0650965e6d628f844b24131df33246');
        const data      = await resp.json();
        const condition = data.weather[0].main;

        if (condition === 'Rain' || condition === 'Drizzle' || condition === 'Thunderstorm') {
            rain.classList.add('active');

            if (condition === 'Thunderstorm') {
                setInterval(() => {
                    if (Math.random() > 0.8) {
                        lightning.style.animation = 'flashAnim 0.4s ease-out';
                        setTimeout(() => lightning.style.animation = '', 400);
                    }
                }, 5000);
            }
        }
    } catch (e) {
        console.log("Weather Offline");
    }
}

// Run on page load
updateWeather();
