const container = document.getElementById("cool-weather");

function ToggleSwitch({ label, isChecked, onChange }) {
  return (
    <div className="option">
      <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={onChange} />
        <span className="slider round"/>
      </label>
      <h3 className="option-text">{label}</h3>
    </div>
  );
}

function WeatherDetail({ title, value }) {
  return (
    <div className="detail">
      <p className="detail-title">{title}</p>
      <p className="detail-value">{value}</p>
    </div>
  );
}
function WeatherWeekDetail({ day, icon, min, max, val }) {
  return (
    <div className="day">
        <h3>{day}</h3>
        <img className='ind-cast' src={icon} alt="Sunny"/>
        <div className="slider-container">
            <p className="temp">{min}</p>
            <input type="range" disabled  min="0" max="50" value={val}/>
            <p className="temp">{max}</p>
        </div>
    </div>
  );
}

function WeatherTempDetail({ time, icon, temp }) {
    return (
    <div className="temp-info">
        <img className="icon" src={icon} alt="sunrise"/>
        <div className="temp-detail">
        <p className="detail-value">{time}</p>
        <p className="detail-value temp">{temp}</p>
        </div>
    </div>
    );
}

function CoolWeather() {
  const [tempToggle, setTempToggle] = React.useState(false);
  const [feelsLikeToggle, setFeelsLikeToggle] = React.useState(false);
  const [tempUnit, setTempUnit] = React.useState("°C");

  const weatherDetails = [
    { title: "Wind", value: "5 km/h" },
    { title: "Humidity", value: "50%" },
    { title: "Visibility", value: "10 km" },
    { title: "AQI", value: "3" },
    { title: "Percipitation", value: "3" },
  ];

  const weatherTimeDetails = [
    { time: "1:00 AM", icon: "assets/sunrise.png", temp: 16 },
    { time: "2:00 AM", icon: "assets/sunny.png", temp: 24 },
    { time: "3:00 AM", icon: "assets/rainy.png", temp: 22 },
    { time: "4:00 AM", icon: "assets/thunder-storm.png", temp: 24 },
    { time: "5:00 AM", icon: "assets/cloudy.png", temp: 23 },
    { time: "6:00 AM", icon: "assets/sunset.png", temp: 14 },
  ];
  const weatherWeekDetails = [
    { day: "Today", icon: "assets/sunny.png", min: 18, max: 28, val: 40 },
    { day: "Mon", icon: "assets/sunny.png", min: 20, max: 26, val: 35 },
    { day: "Tue", icon: "assets/thunder-storm.png", min: 15, max: 20, val: 15 },
    { day: "Wed", icon: "assets/rainy.png", min: 22, max: 25, val: 25 },
    { day: "Thu", icon: "assets/rainy.png", min: 18, max: 28, val: 30 },
    { day: "Fri", icon: "assets/sunny.png", min: 22, max: 28, val: 45 },
    { day: "Sat", icon: "assets/cloudy.png", min: 18, max: 22, val: 22 },
  ];

  const toggleTemperature = () => setTempToggle(!tempToggle);
  const toggleFeelsLike = () => setFeelsLikeToggle(!feelsLikeToggle);

  const formatTemperature = (temp) => {
    if (feelsLikeToggle) {
      return tempToggle
        ? `${Math.round((temp + 2) * 9 / 5 + 32)}°F`
        : `${temp + 2}°C`;
    }

    return tempToggle
      ? `${Math.round((temp * 9) / 5 + 32)}°F`
      : `${temp}°C`;
  };

  return (
    <div className="container">
      <img className="topmedia" src="assets/topmedia.png" alt="Sunny" />
      <section className="weather">
        <div className="selections">
          <ToggleSwitch
            label="Feels Like"
            isChecked={feelsLikeToggle}
            onChange={toggleFeelsLike}
          />
          <ToggleSwitch
            label="°C"
            isChecked={tempToggle}
            onChange={toggleTemperature}
          />
        </div>
        <div className="weather-info">
          <h2>Haverford</h2>
          <h1 className="temp">{formatTemperature(18)}</h1>
        </div>
      </section>
      <br/>
      <section>
        <div className="weather-details">
          {weatherDetails.map((detail) => (
            <WeatherDetail key={detail.title} title={detail.title} value={detail.value} />
          ))}
        </div>
      </section>
      <br/>
      <hr/>
      <br/>
      <section>
        <div className="weather-details">
          {weatherTimeDetails.map((detail) => (
            <WeatherTempDetail
              key={detail.time}
              time={detail.time}
              icon={detail.icon}
              temp={formatTemperature(detail.temp)}
            />
          ))}
        </div>
      </section>
      <br/>
      <hr/>
      <br/>
      <section>
        <h2>Weekly Forecast</h2>
        <div className="forecast">
          {weatherWeekDetails.map((detail) => (
            <WeatherWeekDetail
              key={detail.day}
              day={detail.day}
              icon={detail.icon}
              min={formatTemperature(detail.min)}
              max={formatTemperature(detail.max)}
              val={detail.val}
              tempToggle={tempToggle}
              feelsLikeToggle={feelsLikeToggle}
            />
          ))}
        </div>
      </section>
      <br/>
      <br/>
      <br/>
      <div className="search">
          <input type="text" placeholder="Search City" className="search-bar"/>
          <button type="submit"><i className="fa fa-search search-icon"></i></button>
      </div>
    </div>
    
  );
}

const root = ReactDOM.createRoot(container);
root.render(<CoolWeather />);