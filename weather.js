async function syncIponHubWeather() {
    const cover = document.getElementById('global-weather-cover');
    const rain = document.getElementById('global-rain');

    // 1. LOCK SA CEBU TIME (Kahit nasaan ang user)
    const cebuTime = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Manila"}));
    const hour = cebuTime.getHours();

    // 2. APPLY SKY STANDARD
    cover.classList.remove('day', 'sunset', 'night');
    if (hour >= 18 || hour < 5) cover.classList.add('night');
    else if (hour >= 16) cover.classList.add('sunset');
    else cover.classList.add('day');

    // 3. SYNC WEATHER DATA (OpenWeather API)
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Cebu&appid=da0650965e6d628f844b24131df33246');
        const data = await response.json();
        const isRaining = data.weather[0].main.includes('Rain') || data.weather[0].main.includes('Thunder');

        if (isRaining) {
            rain.classList.add('active');
            localStorage.setItem('iponhub_weather_state', 'rainy');
        } else {
            rain.classList.remove('active');
            localStorage.setItem('iponhub_weather_state', 'clear');
        }
    } catch (err) {
        // Fallback: Check local storage para walang delay sa lipat ng page
        if(localStorage.getItem('iponhub_weather_state') === 'rainy') rain.classList.add('active');
    }
}

// Takbo agad pag-load ng page
window.addEventListener('DOMContentLoaded', syncIponHubWeather);
