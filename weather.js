/* IponHub | Universal Weather Engine 2026 */
async function updateWeatherEngine() {
    const sky = document.getElementById('cebu-sky');
    const rain = document.getElementById('rain');
    const lightning = document.getElementById('lightning');
    const clouds = document.querySelectorAll('.vector-cloud');
    
    if (!sky) return; // Safety check

    // 1. TIME-BASED COLORS
    const hour = new Date().getHours();
    let isNight = (hour >= 18 || hour < 5);
    let isSunset = (hour >= 16 && hour < 18);

    if (isNight) {
        sky.style.background = "linear-gradient(180deg, #0B0E14 0%, #1A237E 100%)";
        document.documentElement.style.setProperty('--cloud-shadow', 'rgba(0,0,0,0.4)');
    } else if (isSunset) {
        sky.style.background = "linear-gradient(180deg, #E64A19 0%, #FFB74D 100%)";
        document.documentElement.style.setProperty('--cloud-shadow', 'rgba(230,74,25,0.4)');
    } else {
        sky.style.background = "linear-gradient(180deg, #40C4FF 0%, #B3E5FC 100%)";
        document.documentElement.style.setProperty('--cloud-shadow', 'rgba(129, 212, 250, 0.6)');
    }

    // 2. OPENWEATHER API SYNC
    try {
        const resp = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Cebu&appid=da0650965e6d628f844b24131df33246');
        const data = await resp.json();
        const condition = data.weather[0].main; 

        // Rain Logic
        if (condition === 'Rain' || condition === 'Drizzle' || condition === 'Thunderstorm') {
            if (rain) rain.classList.add('active');
        } else {
            if (rain) rain.classList.remove('active');
        }

        // Lightning Logic
        if (condition === 'Thunderstorm') {
            if (!window.lightningTimer) {
                window.lightningTimer = setInterval(() => {
                    if (Math.random() > 0.7 && lightning) {
                        lightning.style.animation = 'flashAnim 0.5s ease-out';
                        setTimeout(() => lightning.style.animation = '', 500);
                    }
                }, 4000);
            }
        } else {
            if(window.lightningTimer) {
                clearInterval(window.lightningTimer);
                window.lightningTimer = null;
            }
        }

        // Cloud Visibility Logic
        // Kung "Clear", bawasan natin ang dami ng clouds (opacity)
        clouds.forEach(c => {
            if (condition === 'Clouds' || condition === 'Rain' || condition === 'Thunderstorm') {
                c.style.opacity = "0.8";
            } else {
                c.style.opacity = "0.3"; // Konti lang pag clear
            }
        });

    } catch (e) {
        console.log("IponHub Weather: Offline/Error - Using Time Sync only.");
    }
}

// Takbo agad pag-load
updateWeatherEngine();
// Refresh every 10 minutes
setInterval(updateWeatherEngine, 600000);
