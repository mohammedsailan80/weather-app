import React from 'react';
import Form from './components/Form';
import WeatherContent from './components/WeatherContent';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';

import './App.css';

const api_key="25362ec0583954a9f79bc57ac6ae66c9";
/* api.openweathermap.org/data/2.5/weather?q=London&appid="25362ec0583954a9f79bc57ac6ae66c9"*/
class App extends React.Component {
  state = {
    temperature: '',
    city: '',
    country: '',
    temp_max: '',
    temp_min: '',
    humidity: '',
    weather_icon: '',
    description: '',
    error: false,
    error_message: ''
  }
  weatherIcon ={
    Thunderstorm: 'wi wi-thunderstorm',
    Drizzle: 'wi wi-sleet',
    Rain: 'wi wi-storm-showers',
    Snow: 'wi wi-snow',
    Atmosphere: 'wi wi-fog',
    Clear: 'wi wi-day-sunny',
    Clouds: 'wi wi-day-fog',
  }

  calCelsius(temp){
    let cell =Math.floor(temp - 273.15);
    return cell;
  }
  get_weatherIcon(icons , rangeID){
    switch(true){
      case rangeID >= 200 && rangeID <= 232:
        this.setState({weather_icon:this.weatherIcon.Thunderstorm})
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({weather_icon:this.weatherIcon.Drizzle})
        break;
      case rangeID >= 500 && rangeID <= 531:
        this.setState({weather_icon:this.weatherIcon.Rain})
        break;
      case rangeID >= 600 && rangeID <= 622:
        this.setState({weather_icon:this.weatherIcon.snow})
        break;
      case rangeID >= 701 && rangeID <= 781:
        this.setState({weather_icon:this.weatherIcon.Atmosphere})
        break;
      case rangeID === 800 :
        this.setState({weather_icon:this.weatherIcon.Clear})
        break;
      case rangeID >= 801 && rangeID <= 804:
        this.setState({weather_icon:this.weatherIcon.Clouds})
        break;
      default:
        this.setState({weather_icon:this.weatherIcon.Clouds})
    }
  }
  getweather = async (countres ,cites)=>{
    const city =cites;
    const country =countres;
    if(city && country)
    {
      const api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key}`);
      const data = await api.json();
      console.log(data);
      if(data.cod!== '404'){
        this.setState({
          temperature: this.calCelsius(data.main.temp),
          city: data.name,
          country: data.sys.country,
          temp_max: this.calCelsius(data.main.temp_max),
          temp_min: this.calCelsius(data.main.temp_min),
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: false
        })
        this.get_weatherIcon(this.weatherIcon,data.weather[0].id);
      }else{
        this.setState({
          error: true,  
          error_message:' The name of the city may be wrong or please check the letters.'
        })
      }
    }else{
      this.setState({
        error: true,
        error_message:' The name of the country and the city fields are required.'
      })
    }
    
    
  }
  render() {
     return (
    <div className="App">
      <Form getweather = {this.getweather}/>
      <WeatherContent
        temperature = {this.state.temperature}
        city = {this.state.city}
        country = {this.state.country}
        temp_max = {this.state.temp_max}
        temp_min = {this.state.temp_min}
        humidity = {this.state.humidity}
        description = {this.state.description}
        error = {this.state.error}
        error_message = {this.state.error_message}
        weather_icon = {this.state.weather_icon}
     />
    </div>
  );
  }
 
}

export default App;
