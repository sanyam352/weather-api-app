let input = document.querySelector(".searchbar input");
let getdata = document.querySelector("button");
let weathercontainer = document.querySelector(".weathercontainer");

function getWeatherEmoji(description) {
  const weatherEmojis = {
    "clear sky": "☀️",
    "few clouds": "🌤️",
    "scattered clouds": "⛅",
    "broken clouds": "☁️",
    "overcast clouds": "☁️",
    "light rain": "🌦️",
    "moderate rain": "🌧️",
    "heavy intensity rain": "🌧️",
    thunderstorm: "⛈️",
    "thunderstorm with rain": "🌩️",
    "light snow": "🌨️",
    snow: "❄️",
    "heavy snow": "☃️",
    mist: "🌫️",
    fog: "🌫️",
    smoke: "💨",
    windy: "🌬️",
    tornado: "🌪️",
    haze: "🌁",
  };

  return weatherEmojis[description.toLowerCase()] || "";
}

getdata.addEventListener("click", function () {
  let city = input.value.trim();

  if (city.toLowerCase() === "kashmir") {
    city = "azad kashmir";
  }

  if (city) {
    fetchdata(city);
  } else {
    alert("Please enter a valid city name");
  }
});

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getdata.click();
  }
});

async function fetchdata(city) {
  try {
    let apikey = "91d657ac319586d3f7417b6db40593ac";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    let response = await fetch(url);

    let data = await response.json();

    if (data.cod == 404) {
      throw new Error("Please enter a valid city name");
    }

    let country = data.sys.country;
    let cityname = data.name;
    let weatherdescription = data.weather[0].description;
    let temperature = data.main.temp;
    let humidity = data.main.humidity;
    let wind = data.wind.speed;
    let pressure = data.main.pressure;
    let feelslike = data.main.feels_like;

    let emoji = getWeatherEmoji(weatherdescription);

    document.querySelector(".countryname").textContent = country;
    document.querySelector(".city").textContent = cityname;
    document.querySelector(".weatherdescription").textContent =weatherdescription;
    document.querySelector(".temp").textContent = Math.round(temperature);
    document.querySelector(".weatherdescription").innerHTML = `${emoji} ${weatherdescription}`;
    document.querySelector(".humiditydata").textContent = humidity;
    document.querySelector(".winddata").textContent = wind;
    document.querySelector(".pressuredata").textContent = pressure;
    document.querySelector(".feelslikedata").textContent =Math.round(feelslike);

      if (city.toLowerCase() === "azad kashmir") {
        document.querySelector(".countryname").textContent = "India";
        document.querySelector(".city").textContent = "Kashmir";
      }

    weathercontainer.style.transition = "opacity 0.5s ease-in-out";
    weathercontainer.style.display = "block";
  } catch (error) {
    alert(error.message);
  }
}
