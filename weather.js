async function syncIponHubWeather() {
    const sky = document.getElementById('cebu-sky');
    const rain = document.getElementById('rain');
    const lightning = document.getElementById('lightning');

    // 1. REALTIME TIME CHECK (PH Standard Time)
    const now = new Date();
    const hour = now.getHours(); // 0 to 23

    // Reset classes muna para malinis
    sky.classList.remove('sky-day', 'sky-sunset', 'sky-night');

    // Apply Sky based on Time
    if (hour >= 18 || hour < 5) {
        sky.classList.add('sky-night');
    } else if (hour >= 16) {
        sky.classList.add('sky-sunset');
    } else {
        sky.classList.add('sky-day');
    }

    // 2. REALTIME WEATHER CHECK (Cebu City)
    try {
        // Ginagamit ang iyong API Key
        const apiKey = 'da0650965e6d628f844b24131df33246';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Cebu&appid=${apiKey}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        // Check kung may ulan sa data
        const weatherMain = data.weather[0].main.toLowerCase();
        const isRaining = weatherMain.includes('rain') || weatherMain.includes('drizzle') || weatherMain.includes('thunderstorm');

        if (isRaining) {
            rain.classList.add('active');
            
            // Kung Thunderstorm, mag-trigger ng random lightning
            if (weatherMain.includes('thunder')) {
                triggerLightning(lightning);
            }
        } else {
            rain.classList.remove('active');
        }

    } catch (error) {
        console.log("Weather Sync Failed: Offline or API Error");
    }
}

// Function para sa random na kidlat
function triggerLightning(element) {
    setInterval(() => {
        if (Math.random() > 0.8) { // 20% chance tuwing 5 seconds
            element.style.animation = 'flashAnim 0.4s ease-out';
            setTimeout(() => { element.style.animation = ''; }, 400);
        }
    }, 5000);
}

// Takbo agad pagka-load ng page
window.addEventListener('DOMContentLoaded', syncIponHubWeather);

// Refresh weather every 10 minutes para laging realtime
setInterval(syncIponHubWeather, 600000);
