
$(document).ready(function () {
    // Function to fetch current weather data
    function getCurrentWeather(city) {
      const apiKey = '7b93c7fd3620128f2ed53b98ca195866';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          // Call the function to render current weather
          renderCurrentWeather(data);
        },
        error: function (error) {
          console.error('Error fetching current weather:', error);
        }
      });
    }

    // Function to fetch 5-day forecast
    function getForecast(city) {
      const apiKey = '7b93c7fd3620128f2ed53b98ca195866';
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

      $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          // Call the function to render forecast
          renderForecast(data);
        },
        error: function (error) {
          console.error('Error fetching forecast:', error);
        }
      });
    }

    // Handle form submission
    $("#search-form").submit(function (event) {
      event.preventDefault();
      const city = $("#search-input").val();

      // Call the function to get current weather data
      getCurrentWeather(city);

      // Call the function to get forecast data
      getForecast(city);

      // Update the search history
      updateSearchHistory(city);
    });

    // Handle click on search history item
    $("#history").on("click", ".list-group-item", function () {
      const city = $(this).text();

      // Call the function to get current weather data
      getCurrentWeather(city);

      // Call the function to get forecast data
      getForecast(city);
    });

    // Example function to render current weather
    function renderCurrentWeather(data) {
     // Extract relevant information from the API response
  const city = data.name;
  const date = new Date(data.dt * 1000); // Convert timestamp to date
  const icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  // Format the date using Day.js
  const formattedDate = dayjs(date).format('(M/D/YYYY)');

  // Create the HTML to display current weather
  const html = `
    <div class="current-weather">
      <h2>${city}  ${formattedDate}</h2>
      <img src="${icon}" alt="Weather Icon">
      <p>Temperature: ${temperature} °C</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${windSpeed} m/s</p>
    </div>
  `;

  // Update the HTML in the #today section
  $("#today").html(html);
    }

    // Example function to render forecast
    function renderForecast(data) {
      // Extract the forecast list from the API response
  const forecastList = data.list;

  // Create an array to store HTML for each day
  const forecastHtmlArray = [];

  // Loop through the forecast list
  forecastList.forEach((forecast) => {
    // Extract relevant information for each forecast
    const date = new Date(forecast.dt * 1000); // Convert timestamp to date
    const icon = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
    const temperature = forecast.main.temp;
    const humidity = forecast.main.humidity;

    // Format the date using Day.js
    const formattedDate = dayjs(date).format('M/D/YYYY');

    // Create HTML for each day and push it to the array
    const dayHtml = `
  
      <div class="col-md-2 forecast-item">
        <h3>${formattedDate}</h3>
        <img src="${icon}" alt="Weather Icon">
        <p>Temperature: ${temperature} °C</p>
        <p>Humidity: ${humidity}%</p>
      </div>
    `;
    forecastHtmlArray.push(dayHtml);
    
  });

  // Join the HTML for all days and update the #forecast section
  const forecastHtml = `<h2 class="h4 mt-3 mb-2">5-Day Forecast:</h2>` + forecastHtmlArray.join('');
  $("#forecast").html(forecastHtml);
    }

    // Example function to update search history
    function updateSearchHistory(city) {
      const listItem = $("<a>")
        .addClass("list-group-item list-group-item-action")
        .text(city);
      $("#history").prepend(listItem);
    }
  });