import React from 'react';

const Result = props => {

    const { date, city, sunrise, sunset, temp, pressure, wind, err } = props.weather

    let content = null;

    if(!err && city) {

        let sunriseTime = new Date(sunrise * 1000).toLocaleTimeString(); //fck* date
        let sunsetTime = new Date(sunset * 1000).toLocaleTimeString(); //fck* second date
        content = (
            <div>
            <h1>Results of searching for {city}</h1>
            <div>Date: {date} GMT+1</div>
            <div>Temperature: {temp} &#176;C</div>
            <div>Time of sunrise: {sunriseTime} GMT+1</div>
            <div>Time os sunset: {sunsetTime} GMT+1</div>
            <div>Pressure: {pressure} hPa</div>
            <div>Wind speed: {wind} m/s</div>
            </div>
        )
    }
    
    return (
        <div className='result'>
            {err ? `We don't have ${city} in our database` : content}
        </div>
    );
}

export default Result;