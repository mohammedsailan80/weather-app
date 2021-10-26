import React from 'react';
import './WeatherContent.css';
class WeatherContent extends React.Component {
  render() {
    const {error}= this.props; 
     return error===false? (
    <React.Fragment>
    {this.props.city && <h1 className="my-5">{this.props.city}  , {this.props.country} </h1>}
    {this.props.weather_icon && <h3 className="my-2 display-1"><i className={this.props.weather_icon}/></h3>}
    {this.props.temperature && <h3>{this.props.temperature} &deg;</h3>}
      <div className="row my-5">
        {this.props.temp_min && <div className="col-6"><h4>{this.props.temp_min} &deg;</h4></div>}
        {this.props.temp_max && <div className="col-6"><h4>{this.props.temp_max} &deg;</h4></div>}
      </div>
      {this.props.description && <h3 className="my-5">{this.props.description}</h3>}
      
    </React.Fragment>
  ):(<React.Fragment>
    <div className="container my-4 my-lg-5 px-lg-5 ">
      <div className="mx-lg-5 alert alert-danger" role="alert">
        {this.props.error_message}
      </div>
    </div>
    </React.Fragment>
  )
  }
 
}

export default WeatherContent;
