  async function getWeather() {
      const city = document.getElementById("city").value.trim();
      const error = document.getElementById("error");
      const result = document.getElementById("result");

      if (!city) {
        error.textContent = "Enter a city.";
        result.innerHTML = "";
        return;
      }

      error.textContent = "Loading...";
      result.innerHTML = "";

      try {
        
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
        const geoRes = await fetch(geoUrl);
        const geo = await geoRes.json();

        if (!geo.results || geo.results.length === 0) {
          throw new Error("City not found");
        }

        const { latitude, longitude, name, country } = geo.results[0];

        
        const weatherUrl =
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const weatherRes = await fetch(weatherUrl);
        const weather = await weatherRes.json();

        const w = weather.current_weather;

        error.textContent = "";
        result.innerHTML = `
          <h3>${name}, ${country}</h3>
          <div class="temp">${w.temperature}°C</div>
          <p>Wind: ${w.windspeed} km/h</p>
        
        `;
      } catch (err) {
        error.textContent = "❌ " + err.message;
        result.innerHTML = "";
      }
    }