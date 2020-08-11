import React from 'react'
import Title from './Title.js';
import Form from './Form.js'
import Weather from './Weather.js';

const API_KEY="c6a0dae3e235fa8f15e133be48f282d0";
 class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

   getWeather= async(e)=>{
    console.log("Entering async function");
     e.preventDefault();
     console.log("defaulte prevented successfully");
     const city = e.target.elements.city.value;
     const country = e.target.elements.country.value;
     console.log("city: "+ city +" country:" +country);
     const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID='+ API_KEY);
     const data= await api_call.json();
     console.log("Api call made : Date received is as follows" );
     console.log(data);
     if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values."
      });
    }
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Title />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
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
