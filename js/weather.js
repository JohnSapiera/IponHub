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

        if (condition === 'Rain' || condition === 'Drizzle') {
            // Light to moderate rain — blue sky + rain only
            rain.classList.add('active');
        }

        if (condition === 'Thunderstorm') {
            // Bagyo mode — dark sky + heavy rain + lightning
            sky.style.transition = "background 2s ease";
            sky.style.background = "linear-gradient(180deg, #263238 0%, #37474F 100%)";
            rain.classList.add('active');
            rain.style.opacity = "1.8";

            // Dramatic lightning — every 3 seconds
            setInterval(() => {
                const chance = Math.random();

                if (chance > 0.6) {
                    // Single flash
                    lightning.style.animation = 'flashAnim 0.4s ease-out';
                    setTimeout(() => lightning.style.animation = '', 400);
                }

                if (chance > 0.85) {
                    // Double flash — mas dramatic
                    setTimeout(() => {
                        lightning.style.animation = 'flashAnim 0.3s ease-out';
                        setTimeout(() => lightning.style.animation = '', 300);
                    }, 500);
                }

            }, 3000);
        }

    } catch (e) {
        console.log("Weather Offline");
    }
}

// Run on page load
updateWeather();
