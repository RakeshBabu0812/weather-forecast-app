
import React,{useEffect,useRef,useState}from "react";
import  "./Weather.css";
import search_icon from "../assets/search.png";
import clear from "../assets/clear.png";
import  cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";





const Weather=()=>{
    const inputref=useRef();
     const [weatherdata,setWeatherdata]=useState(false);
     const allicons={
        "01d":clear,
        "01n":clear,
        "02d":cloud,
        "02n":cloud,
        "03d":cloud,
        "03n":cloud,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow
     }
    const search=async(city)=>{
        if(city===""){
            alert("Enter city name");
            return;
        }
        try{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_ID}`
            const response=await fetch(url);
            const data=await response.json();
            if(!response.ok){
                 alert(data.message);
                 return;
            }
            console.log(data);
            const icon=allicons[data.weather[0].icon] || clear;
            setWeatherdata({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon:icon
            })
        }
        catch(err){
            setWeatherdata(false);
            console.error("Error in fetching weather data");
        }
    }
    useEffect(()=>{
      search("New York");
    },[])

    return(
        <div className="weather">
          <div className="search-bar">
            <input ref={inputref}  type="text" placeholder="Search"/>
        <img src={search_icon}  alt=" "  onClick={()=>{
            search(inputref.current.value)
        }} />
          </div>
          {weatherdata?<>

           <img src={weatherdata.icon} alt="" className="weather-icon"/>
          <p className="temperature">{weatherdata.temperature}&deg;c</p>
          <p className="location">{weatherdata.location}</p>
          <div className="weather-data">
            <div className="col">
                <img src={humidity} alt="" />
                <div>
                    <p>{weatherdata.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>
             <div className="col">
                <img src={wind} alt="" />
                <div>
                    <p>{weatherdata.windSpeed}km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
          </div>
          </>:<></>}
        </div>
    );

}
export default Weather