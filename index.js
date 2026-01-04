const setDateTime = ()=>{
    const dateTime = new Date();
    document.getElementById("date").textContent = dateTime.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    document.getElementById("time").textContent = dateTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}

const renderForecast = (f)=>{
    const head = document.getElementById("forecastHead").children[0];
    const tbody = document.getElementById("forecastBody");

    for(let i = 0; i < f.length; i++){
        let date = new Date(f[i].date);
        head.children[i+1].textContent = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "2-digit"
        });

        tbody.children[0].children[i+1].textContent = `${f[i].day.mintemp_f} - ${f[i].day.maxtemp_f}`;
        tbody.children[1].children[i+1].textContent = `${f[i].day.avghumidity}%`;
        tbody.children[2].children[i+1].textContent = `${f[i].day.daily_chance_of_rain}%`;
        tbody.children[3].children[i+1].textContent = f[i].day.totalprecip_in;
        tbody.children[4].children[i+1].textContent = f[i].day.maxwind_mph;
        tbody.children[5].children[i+1].textContent = f[i].astro.sunrise;
        tbody.children[6].children[i+1].textContent = f[i].astro.sunset;
    }
}

const getWeather = ()=>{
    fetch("https://api.weatherapi.com/v1/forecast.json?key=519f51763fa8477b864184849251502&q=29576&days=3&aqi=no", {
        method: "get"
    })
        .then(r=>r.json())
        .then((response)=>{
            console.log(response);
            const tempDisplay = `Temperature: ${response.current.temp_f}\u00B0F`;
            document.getElementById("temp").textContent = tempDisplay;

            const feelsLike = `Feels Like: ${response.current.feelslike_f}\u00B0F`;
            document.getElementById("feels").textContent = feelsLike;

            const currentWeatherImage = document.querySelector("#currentWeather img");
            currentWeatherImage.src = `https:${response.current.condition.icon}`;
            currentWeatherImage.alt = response.current.condition.text;

            const currentWeatherText = document.querySelector("#currentWeather .conditionText");
            currentWeatherText.textContent = response.current.condition.text;

            const currentWind = `Wind: ${response.current.wind_mph}mph ${response.current.wind_dir}`;
            document.getElementById("wind").textContent = currentWind;

            const humidity = `Humidity: ${response.current.humidity}%`;
            document.getElementById("humidity").textContent = humidity;

            renderForecast(response.forecast.forecastday);
        })
        .catch((err)=>{
            console.log(err);
        });
}

const getRadarImage = () =>{
    const img = document.getElementById("radar");
    const base = img.src.split("?")[0];
    img.src = base + "?t=" + Date.now();
}

getWeather();
setInterval(getWeather, 60000);
setDateTime();
setInterval(setDateTime, 10000);
setInterval(getRadarImage, 10 * 1000);
