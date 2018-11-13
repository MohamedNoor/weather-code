import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "3e704e82d6e54709079a982e0e64a42f";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    //stops the page from refreshing once a request is made
    e.preventDefault();
    //variables are created for city and country so when ever user enters any city and country it automatically changes the URL
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    //a variable that makes the call and fetches the data is creaated
    const api_call = await fetch((`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`));
    //responce is converted to json format
    const data = await api_call.json();

    // if incorrect data is entered an error message is printed
    if(data.cod === "404"){
         this.setState({
           temperature: undefined,
           city: undefined,
           country: undefined,
           humidity: undefined,
           description: undefined,
           error: "Please make sure your inputs are valid."
           });
  // once the valid city and the corresponding country are entered the information is returned
} else if (city && country) {
       this.setState({
         temperature: data.main.temp,
         city: data.name,
         country: data.sys.country,
         humidity: data.main.humidity,
         description: data.weather[0].description,
         error: ""
       });
  //if no value is entered an error message will appear
     } else {
       this.setState({
         temperature: undefined,
         city: undefined,
         country: undefined,
         humidity: undefined,
         description: undefined,
         error: "Please enter the values."
       });
     }﻿

  }
  //getWeather function is now pass down to the Form section
  render() {
    return (
    <div className="wrapper">
      <div className="main">
        <div className="container">
            <div className="col">
              <div className= "col-xs-5 title-container">
                <Titles/>
              </div>
            <div className="arrow bounce"></div>
            <div className= "weather_section">
              <div className="col-xs-7 form-container">
                <Form getWeather={this.getWeather}/>
                <Weather
                temperature ={this.state.temperature}
                city ={this.state.city}
                country ={this.state.country}
                humidity ={this.state.humidity}
                description ={this.state.description}
                error ={this.state.error}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    );
  }
};

export default App;
