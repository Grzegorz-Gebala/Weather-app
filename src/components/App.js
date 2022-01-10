import React, { Component } from 'react';
import Form from './Form'
import Result  from './Result';
import './App.css';

class App extends Component {

  state = {
    value: '',
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temp: '',
    pressure: '',
    wind: '',
    err: '',
  }

  handleInputChange = (e) => {  //Obsługa danych
    this.setState({
      value: e.target.value
    })
  }

  //obsługa wyszukiwania miasta
  handleCitySubmit = (e) => {
    e.preventDefault() //zatrzymanie odświeżania strony
    console.log('potwierdzony formularz');
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=63bd8ce397de0535389900af7b42078a&units=metric`;

    fetch(API) //Wysłanie żądania pod powyższy adres o dane (metoda promise obietnica)
      .then(response => {
        if(response.ok) {   //jeśli pozytywna odpowiedź to lecimy dalej do then z lini 39 i 40
          return response  
        } 
        throw Error('The inquiry could not be processed')   //jeśli negatywna to mamy taki komunikat i przerwanie wykonywania metody i uruchamia catch z lini 53
    })
    .then(response => response.json()) //wyodrębniamy json, przerabiamy na obiekt i wysyłamy do then 40
    .then(data => {
      const time = new Date().toLocaleString()
      this.setState({  //uruchamiamy metodę setState (każde wywołanie this.State uruchamia nam metodę render i przekazuje do Result i Form)
        err: false,
        date: time,
        city: this.state.value,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        temp: data.main.temp,
        pressure: data.main.pressure,
        wind: data.wind.speed,
      })
    })
    .catch(err => {
      console.log(err);
      this.setState(state => ({ //state - przekazanie obiektu
        err: true,
        city: this.state.value
      }))
    })

  } 

  render() {
    return (
      <div className="App">
        <Form 
          value={this.state.value} 
          change={this.handleInputChange} // przekazuję ten tą metodę do komponentu Form, bo tutaj mamy input state value
          submit={this.handleCitySubmit}
        />  
        
        <Result weather={this.state}/>
      </div>
    );
  }  
}

export default App;
