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
  //

  const btnSearchClick = async () => {
    try {
      if (cityName === "") {
        return;
      }
      //
      const response = await fetch(weatherAPI);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch weather data or error in the country name: (${
            response.url.match(/q=([^&]+)/)[1]
          } Not Found)`
        );
      }
      //
      const data = await response.json();
      const image = document.querySelector(".temImg");
      setTemp({
        tempDegree: Math.round(data.main.temp - 272.15),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        weatherState: data.name,
      });
      // image manage
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

      notFoundHide();
    } catch (error) {
      console.error("Error fetching weather data:", error);
      FoundHide();
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
        containerRef.current.style.height = "80px";
        document.querySelector(".not-found").style.transform = "scale(0)";
        document.querySelector(".found").style.transform = "scale(0)";
        setTimeout(() => {
          document.querySelector(".not-found").style.display = "none";
          document.querySelector(".found").style.display = "none";
        }, 1000);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //
  // TODO:
  const inputRef = useRef(null);
  useEffect(() => {
    function wow(e) {
      if (e.key === "Enter") {
        document.querySelector(".search-icon").click();
      }
    }
    document.addEventListener("keydown", wow);
    return () => {
      document.removeEventListener("keydown", wow);
    };
  });
  const notFoundHide = () => {
    containerRef.current.style.height = "500px";
    document.querySelector(".found").style.display = "block";
    setTimeout(() => {
      document.querySelector(".found").style.transform = "scale(1)";
    }, 300);
    document.querySelector(".not-found").style.display = "none";
  };
  //
  const FoundHide = () => {
    containerRef.current.style.height = "410px";
    document.querySelector(".not-found").style.display = "block";
    setTimeout(() => {
      document.querySelector(".not-found").style.transform = "scale(1)";
    }, 300);
    document.querySelector(".found").style.display = "none";
  };

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
            ref={inputRef}
          />
          <div className="search-icon" onClick={btnSearchClick}>
            <SearchIcon />
          </div>
        </div>

        <div className="not-found">
          <img src={error} alt="" style={{ width: "320px" }} />
          <h3>Oops! Invalid Location :/</h3>
        </div>
        <div className="found">
          <div className="temp">
            <h3 className="weather-state">
              {temp.weatherState.charAt(0).toUpperCase() +
                temp.weatherState.slice(1)}
            </h3>
            <img
              className="temImg"
              src=""
              alt=""
              style={{ width: "200px", height: "200px" }}
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
      </div>
    </>
  );
}
