const fetchBtn = document.getElementById("getWeatherButton");
const weatherDiv = document.querySelector(".forecast-div");

const fetchWeatherHandler = () => {
  if (!navigator.geolocation) {
    weatherDiv.innerHTML = "<h3>Geolocation not supported by browser</h3>";
    return;
  }

  // Getting the current geolocation
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiKey = "YOUR APIKEY GOES HERE";
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(apiURL);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        console.log(data);
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const location = data.name;

        document.getElementById("weatherResult").innerHTML = `
          <h2>Weather in ${location}</h2>
          <p>Temperature: ${temperature}°C</p>
          <p>Description: ${description}</p>
        `;
      } catch (error) {
        weatherDiv.innerHTML = `<h3>${error.message}</h3>`;
      }
    },
    (error) => {
      weatherDiv.innerHTML = `<h3>Error getting geolocation: ${error.message}</h3>`;
    }
  );
};

fetchBtn.addEventListener("click", fetchWeatherHandler);
