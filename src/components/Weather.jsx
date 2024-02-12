import "../App.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import error from "../error.png";
import WaterIcon from "@mui/icons-material/Water";
import AirIcon from "@mui/icons-material/Air";
import cloud from '../cloud.png'
export default function Weather() {
  return (
    <>
      <div className="container">
        <div className="search-box">
          <LocationOnIcon />
          <input type="text" placeholder="Enter Your Location" />
          <div className="search-icon">
            <SearchIcon />
          </div>
        </div>

        <div className="not-found">
          <img src={error} alt="" />
          <h3>Oops! Invalid Location :/</h3>
        </div>

        <div className="temp">
          <img src={cloud} alt="" style={{
            width:"200px",
            height:"200px"
          }}/>
          <h1 className="temp-degree">
            0<span style={{ fontSize: "17px" }}> &nbsp;&#8451;</span>
          </h1>
          <h3 className="description">break clouds</h3>
        </div>

        <div className="humidity-wind">
          {" "}
          <div className="humidity">
            <WaterIcon sx={{ fontSize: "40px" }} />
            <div>
              <h3>88%</h3>
              <h4>Humidity</h4>
            </div>
          </div>
          <div className="wind">
            <AirIcon sx={{ fontSize: "40px" }} />
            <div>
              <h3>0Km/h</h3>
              <h4>Wind Speed</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
