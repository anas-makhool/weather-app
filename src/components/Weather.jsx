import "../App.css";
import { useRef, useState, useEffect } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import error from "../error.png";
import WaterIcon from "@mui/icons-material/Water";
import AirIcon from "@mui/icons-material/Air";
import cloud from "../cloud.png";
import mist from "../mist.png";
import rain from "../rain.png";
import snow from "../snow.png";
import clear from "../clear.png";
//
export default function Weather() {
  const [temp, setTemp] = useState({
    tempDegree: "",
    description: "",
    humidity: "",
    windSpeed: "",
    weatherState: "",
  });
  const [cityName, setCityName] = useState("");
  const APIKey = useRef("e7e1a37606465a6edb07c73c38ec905d");
  let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey.current}`;
  // Function Handlers
  const handleSearchInput = (e) => {
    setCityName(e.target.value);
  };

  const btnSearchClick = () => {
    if (cityName === "") {
      return;
    } else {
      fetch(weatherAPI)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          //
          const container = document.querySelector(".container");
          const image = document.querySelector(".temImg");
          const tempDiv = document.querySelector(".temp");
          const windAndHumidityDiv = document.querySelector(".humidity-wind");
          const notFoundDiv = document.querySelector(".not-found");
          //
          if (data.cod < 301) {
            notFoundDiv.style.display = "none";
            // notFoundDiv.style.scale = 0;
            container.style.height = "500px";
            image.style.width = "200px";
            image.style.height = "200px";
            tempDiv.style.display = "block";
            windAndHumidityDiv.style.display = "flex";
            //
            setTemp({
              tempDegree: Math.round(data.main.temp - 272.15),
              description: data.weather[0].description,
              humidity: data.main.humidity,
              windSpeed: data.wind.speed,
              weatherState: data.name,
            });
            //
            switch (data.weather[0].main) {
              case "Clear":
                image.src = clear;
                break;
              case "Rain":
                image.src = rain;
                break;
              case "Snow":
                image.src = snow;
                break;
              case "Clouds":
                image.src = cloud;
                break;
              case "Haze":
                image.src = mist;
                break;
              default:
                image.src = "";
            }
          } else {
            //
            container.style.height = "500px";
            tempDiv.style.display = "none";
            windAndHumidityDiv.style.display = "none";
            notFoundDiv.style.display = "block";
            notFoundDiv.style.scale = 1;
          }
        });
    }
    setCityName("");
  };
  //
  // TODO:
  const containerRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        containerRef.current.style.height = "100px";
        document.querySelector(".not-found").style.scale = 0;
        document.querySelector(".temp").style.scale = 0;
        document.querySelector(".temp").style.scale = 0;
        document.querySelector(".humidity-wind").style.display = "none";
        
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="container" ref={containerRef}>
        <div className="search-box">
          <LocationOnIcon />
          <input
            type="text"
            placeholder="Enter Your Location"
            value={cityName.toUpperCase()}
            onChange={handleSearchInput}
          />
          <div className="search-icon" onClick={btnSearchClick}>
            <SearchIcon />
          </div>
        </div>

        <div className="not-found">
          <img src={error} alt="" />
          <h3>Oops! Invalid Location :/</h3>
        </div>

        <div className="temp">
          <h3 className="weather-state">
            {temp.weatherState.charAt(0).toUpperCase() +
              temp.weatherState.slice(1)}
          </h3>
          <img
            className="temImg"
            src=""
            alt=""
            style={{ width: "0px", height: "0px" }}
          />
          <h1 className="temp-degree">
            {temp.tempDegree}
            <span style={{ fontSize: "17px" }}> &nbsp;&#8451;</span>
          </h1>
          <h3 className="description">{temp.description}</h3>
        </div>

        <div className="humidity-wind">
          {" "}
          <div className="humidity">
            <WaterIcon sx={{ fontSize: "40px" }} />
            <div>
              <h3>{temp.humidity}%</h3>
              <h4>Humidity</h4>
            </div>
          </div>
          <div className="wind">
            <AirIcon sx={{ fontSize: "40px" }} />
            <div>
              <h3>{temp.windSpeed}Km/h</h3>
              <h4>Wind Speed</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
