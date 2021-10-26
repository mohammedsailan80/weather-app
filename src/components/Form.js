import React from 'react';

import { CountryDropdown } from 'react-country-region-selector';
import './Form.css';
class Form extends React.Component {
  state = { country: '' };


  selectCountry (val) {
    this.setState({ country: val });
  }

  handleSubmit =(e) =>{
    e.preventDefault();
    this.props.getweather(this.state.country,e.target.elements[1].value);    
    
}
  render() {
    const { country } = this.state;
      return (
        <React.Fragment>
        <h3 className="text center mt-5">Please select your country then write your city.</h3>
          <form onSubmit={this.handleSubmit}>
              <div className="row mt-5">
                <div className="col-md-3  my-3 my-lg-0 offset-md-2 form-group">
                    <CountryDropdown
                      className="form-control forms"
                      placeholder="country"
                      name="country"
                      value={country}
                      onChange={(val) => this.selectCountry(val)} />
                </div>
                <div className="col-md-3  my-3 my-lg-0 form-group">
                  <input
                    className="form-control forms"
                    placeholder="city"
                    name="city"
                    />
                </div>
                <div className="col-md-3  my-3 my-lg-0 mt-md-0">
                    <button type="submit" className="btn btn-warning"><b>Get weather</b></button>
                </div>
              </div>
          </form>
        </React.Fragment>
      );
  }
 
}

export default Form;
