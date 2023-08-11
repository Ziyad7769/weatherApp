const apiKey = "fce6bead8e2a056e9deb5346f7c8bbfc";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    const data = await response.json();
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".card").style.background =
      "linear-gradient(135deg, lightcoral, red)";
    document.querySelector(".temp").innerHTML = data.cod;
    document.querySelector(".city").innerHTML = data.message;
  } else {
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector("#humidity").src = "images/humidity.png"
    document.querySelector("#wind").src = "images/wind.png";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".card").style.background =
      "linear-gradient(135deg, #00feba, #5b548a)";

    document.querySelector(".datetime").style.display = "block";

    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;

      default:
        break;
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Execute a function when the user presses a key on the keyboard
searchBox.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter" && searchBox.value.length !== 0) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    checkWeather(searchBox.value);
  }
});

setInterval(
  () =>
    (document.querySelector(".datetime").innerHTML =
      new Date().toDateString() + " " + new Date().toLocaleTimeString("en-in")),
  1000
);
