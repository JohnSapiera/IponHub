// Sa loob ng syncIponHubWeather() function:
const hour = new Date().getHours();
const sky = document.getElementById('cebu-sky');

sky.classList.remove('sky-day', 'sky-sunset', 'sky-night');

if (hour >= 18 || hour < 5) {
    sky.classList.add('sky-night'); // Eto ang magti-trigger sa CSS sky-night
} else if (hour >= 16) {
    sky.classList.add('sky-sunset');
} else {
    sky.classList.add('sky-day');
}
