import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	/*
	constructor(props) {
		super(props);
		this.state = {
			weather: null,
		};
	}

	componentDidMount() {
		fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=f875710aea4e02462c8edf532cad97f3')
		.then(response => response.json())
		.then(data => this.setState({weather: data.list}));
	}*/

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">5 Day Weather Viewer</h1>
				</header>
				<p className="App-intro">
					Here comes the weather
				</p>
				<WeatherWidget/>
			</div>
		);
	}
}
//List of components

//WeatherWidget
	//City Search Bar
	//5 Day Weather Table
		//City Heading
		//Day Weather Card
			//Day Title
			//Weather Conditions
			//Weather Temperature

function convertFahrenheit(ktemp) {
	return ktemp * (9/5) - 459.67;
}
function convertCelsius(ktemp) {
	return ktemp - 273.15;
}

class DayWeatherCard extends Component {
	render() {
		const day = this.props.day;
		const conditions = this.props.conditions;

		const temp_max = this.props.temp_max; //TODO: Create Celsius/Fahrenheit conversions
		const temp_min = this.props.temp_min;
		const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		return (
			<td className='weather-card' id={weekday[day]}>
			<table>
			<tbody>
				<tr>
					<th colSpan="2">
						{weekday[day]}
					</th>
				</tr>
				<tr>
					<td colSpan="2">{conditions}</td>
				</tr>
				<tr>
					<td>{temp_max}</td>
					<td>{temp_min}</td>
				</tr>
			</tbody>
			</table>
			</td>
		);
	}
}

class WeekWeatherTable extends Component {
	render() {
		const cityName = this.props.weather.city.name;
		const list = this.props.weather.list;
		const cards = [];
		const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //NOTE: Breaks DRY
		
		for(let i = 0; i < list.length; i+=5) //magic number - why does this work?
		{
			let date = new Date(list[i]['dt']*1000);
			let day = date.getDay();
			cards.push(<DayWeatherCard 
				key={i} 
				day={day}
				conditions={list[i]['weather'][0]['main']}
				temp_max={list[i]['main']['temp_max'] }
				temp_min={list[i]['main']['temp_min'] }
			/>);

			let targetday = (day+1)%7;
			while(day != targetday) 
			{
				i++;
				day = new Date(list[i]['dt']*1000).getDay(); //TODO: research - sort of stack breakage?
			}
		}

		return (
			<table>
				<tbody>
				<tr>
					<th colSpan="5">
						{cityName}
					</th>
				</tr>
				<tr>
					{cards}
				</tr>
				</tbody>
			</table>
		);
	}
}

class CitySearchBar extends Component {
	render() {
		return (
			<form>
			<input type="text" placeholder="Search for a city"/>
			<p><input type="checkbox"/>{' '}Check for Celsius</p>
			</form>
		);
	}
}

class WeatherWidget extends Component {
	render() {
		return (
			<div>
				<CitySearchBar />
				<WeekWeatherTable weather={WEATHER}/>
			</div>
		)
	}
}


const WEATHER = 
{
    "cod": "200",
    "message": 0.0042,
    "cnt": 38,
    "list": [
        {
            "dt": 1533794400,
            "main": {
                "temp": 292.24,
                "temp_min": 292.24,
                "temp_max": 292.393,
                "pressure": 1019.28,
                "sea_level": 1038.93,
                "grnd_level": 1019.28,
                "humidity": 72,
                "temp_kf": -0.15
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 1.77,
                "deg": 305.002
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-09 06:00:00"
        },
        {
            "dt": 1533805200,
            "main": {
                "temp": 294.53,
                "temp_min": 294.53,
                "temp_max": 294.626,
                "pressure": 1019.54,
                "sea_level": 1039,
                "grnd_level": 1019.54,
                "humidity": 66,
                "temp_kf": -0.1
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 2.51,
                "deg": 338.009
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-09 09:00:00"
        },
        {
            "dt": 1533816000,
            "main": {
                "temp": 295.86,
                "temp_min": 295.86,
                "temp_max": 295.905,
                "pressure": 1019.37,
                "sea_level": 1038.82,
                "grnd_level": 1019.37,
                "humidity": 59,
                "temp_kf": -0.05
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 3.02,
                "deg": 343.003
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-09 12:00:00"
        },
        {
            "dt": 1533826800,
            "main": {
                "temp": 295.751,
                "temp_min": 295.751,
                "temp_max": 295.751,
                "pressure": 1019.27,
                "sea_level": 1038.65,
                "grnd_level": 1019.27,
                "humidity": 54,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 2.47,
                "deg": 344.5
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-09 15:00:00"
        },
        {
            "dt": 1533837600,
            "main": {
                "temp": 289.914,
                "temp_min": 289.914,
                "temp_max": 289.914,
                "pressure": 1019.66,
                "sea_level": 1039.36,
                "grnd_level": 1019.66,
                "humidity": 66,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 1.42,
                "deg": 347.003
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2018-08-09 18:00:00"
        },
        {
            "dt": 1533848400,
            "main": {
                "temp": 285.936,
                "temp_min": 285.936,
                "temp_max": 285.936,
                "pressure": 1020.17,
                "sea_level": 1040,
                "grnd_level": 1020.17,
                "humidity": 80,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 0.95,
                "deg": 129.502
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2018-08-09 21:00:00"
        },
        {
            "dt": 1533859200,
            "main": {
                "temp": 284.369,
                "temp_min": 284.369,
                "temp_max": 284.369,
                "pressure": 1020.81,
                "sea_level": 1040.74,
                "grnd_level": 1020.81,
                "humidity": 83,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 1.17,
                "deg": 188.506
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2018-08-10 00:00:00"
        },
        {
            "dt": 1533870000,
            "main": {
                "temp": 285.385,
                "temp_min": 285.385,
                "temp_max": 285.385,
                "pressure": 1021.41,
                "sea_level": 1041.34,
                "grnd_level": 1021.41,
                "humidity": 81,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 1.96,
                "deg": 220.004
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-10 03:00:00"
        },
        {
            "dt": 1533880800,
            "main": {
                "temp": 294.868,
                "temp_min": 294.868,
                "temp_max": 294.868,
                "pressure": 1021.87,
                "sea_level": 1041.45,
                "grnd_level": 1021.87,
                "humidity": 66,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "02d"
                }
            ],
            "clouds": {
                "all": 8
            },
            "wind": {
                "speed": 1.86,
                "deg": 260.505
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-10 06:00:00"
        },
        {
            "dt": 1533891600,
            "main": {
                "temp": 298.172,
                "temp_min": 298.172,
                "temp_max": 298.172,
                "pressure": 1021.27,
                "sea_level": 1040.75,
                "grnd_level": 1021.27,
                "humidity": 63,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 2.46,
                "deg": 277.501
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-10 09:00:00"
        },
        {
            "dt": 1533902400,
            "main": {
                "temp": 299.055,
                "temp_min": 299.055,
                "temp_max": 299.055,
                "pressure": 1020.22,
                "sea_level": 1039.54,
                "grnd_level": 1020.22,
                "humidity": 57,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 2.95,
                "deg": 276.003
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-10 12:00:00"
        },
        {
            "dt": 1533913200,
            "main": {
                "temp": 298.844,
                "temp_min": 298.844,
                "temp_max": 298.844,
                "pressure": 1019.21,
                "sea_level": 1038.58,
                "grnd_level": 1019.21,
                "humidity": 53,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 2.96,
                "deg": 279.002
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-10 15:00:00"
        },
        {
            "dt": 1533924000,
            "main": {
                "temp": 294.574,
                "temp_min": 294.574,
                "temp_max": 294.574,
                "pressure": 1018.9,
                "sea_level": 1038.49,
                "grnd_level": 1018.9,
                "humidity": 62,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "02n"
                }
            ],
            "clouds": {
                "all": 8
            },
            "wind": {
                "speed": 2.45,
                "deg": 261.505
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2018-08-10 18:00:00"
        },
        {
            "dt": 1533934800,
            "main": {
                "temp": 291.084,
                "temp_min": 291.084,
                "temp_max": 291.084,
                "pressure": 1018.84,
                "sea_level": 1038.46,
                "grnd_level": 1018.84,
                "humidity": 75,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 2.82,
                "deg": 270.502
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2018-08-10 21:00:00"
        },
        {
            "dt": 1533945600,
            "main": {
                "temp": 288.526,
                "temp_min": 288.526,
                "temp_max": 288.526,
                "pressure": 1019.02,
                "sea_level": 1038.66,
                "grnd_level": 1019.02,
                "humidity": 86,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 1.87,
                "deg": 254.506
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2018-08-11 00:00:00"
        },
        {
            "dt": 1533956400,
            "main": {
                "temp": 288.641,
                "temp_min": 288.641,
                "temp_max": 288.641,
                "pressure": 1018.92,
                "sea_level": 1038.69,
                "grnd_level": 1018.92,
                "humidity": 86,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 1.53,
                "deg": 247.006
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-11 03:00:00"
        },
        {
            "dt": 1533967200,
            "main": {
                "temp": 296.434,
                "temp_min": 296.434,
                "temp_max": 296.434,
                "pressure": 1018.7,
                "sea_level": 1038.13,
                "grnd_level": 1018.7,
                "humidity": 65,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 2.42,
                "deg": 254
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-11 06:00:00"
        },
        {
            "dt": 1533978000,
            "main": {
                "temp": 298.528,
                "temp_min": 298.528,
                "temp_max": 298.528,
                "pressure": 1017.69,
                "sea_level": 1036.98,
                "grnd_level": 1017.69,
                "humidity": 56,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 4.21,
                "deg": 256.5
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-11 09:00:00"
        },
        {
            "dt": 1533988800,
            "main": {
                "temp": 299.514,
                "temp_min": 299.514,
                "temp_max": 299.514,
                "pressure": 1016.44,
                "sea_level": 1035.69,
                "grnd_level": 1016.44,
                "humidity": 49,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "02d"
                }
            ],
            "clouds": {
                "all": 8
            },
            "wind": {
                "speed": 4.87,
                "deg": 256.002
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-11 12:00:00"
        },
        {
            "dt": 1533999600,
            "main": {
                "temp": 298.901,
                "temp_min": 298.901,
                "temp_max": 298.901,
                "pressure": 1015.24,
                "sea_level": 1034.57,
                "grnd_level": 1015.24,
                "humidity": 45,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 4.65,
                "deg": 257
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-11 15:00:00"
        },
        {
            "dt": 1534010400,
            "main": {
                "temp": 295.282,
                "temp_min": 295.282,
                "temp_max": 295.282,
                "pressure": 1014.8,
                "sea_level": 1034.18,
                "grnd_level": 1014.8,
                "humidity": 48,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 3.67,
                "deg": 251.5
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2018-08-11 18:00:00"
        },
        {
            "dt": 1534021200,
            "main": {
                "temp": 292.46,
                "temp_min": 292.46,
                "temp_max": 292.46,
                "pressure": 1014.35,
                "sea_level": 1033.93,
                "grnd_level": 1014.35,
                "humidity": 57,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 3.47,
                "deg": 251.004
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2018-08-11 21:00:00"
        },
        {
            "dt": 1534032000,
            "main": {
                "temp": 290.627,
                "temp_min": 290.627,
                "temp_max": 290.627,
                "pressure": 1014.02,
                "sea_level": 1033.67,
                "grnd_level": 1014.02,
                "humidity": 64,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 3.37,
                "deg": 249.001
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2018-08-12 00:00:00"
        },
        {
            "dt": 1534042800,
            "main": {
                "temp": 289.695,
                "temp_min": 289.695,
                "temp_max": 289.695,
                "pressure": 1013.85,
                "sea_level": 1033.54,
                "grnd_level": 1013.85,
                "humidity": 71,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 2.87,
                "deg": 248.505
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-12 03:00:00"
        },
        {
            "dt": 1534053600,
            "main": {
                "temp": 295.427,
                "temp_min": 295.427,
                "temp_max": 295.427,
                "pressure": 1013.49,
                "sea_level": 1032.86,
                "grnd_level": 1013.49,
                "humidity": 63,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "clouds": {
                "all": 12
            },
            "wind": {
                "speed": 2.36,
                "deg": 241.505
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-12 06:00:00"
        },
        {
            "dt": 1534064400,
            "main": {
                "temp": 298.865,
                "temp_min": 298.865,
                "temp_max": 298.865,
                "pressure": 1012.36,
                "sea_level": 1031.74,
                "grnd_level": 1012.36,
                "humidity": 58,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 3.81,
                "deg": 247.003
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-12 09:00:00"
        },
        {
            "dt": 1534075200,
            "main": {
                "temp": 299.276,
                "temp_min": 299.276,
                "temp_max": 299.276,
                "pressure": 1011.24,
                "sea_level": 1030.71,
                "grnd_level": 1011.24,
                "humidity": 54,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "clouds": {
                "all": 48
            },
            "wind": {
                "speed": 5.01,
                "deg": 259.5
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-12 12:00:00"
        },
        {
            "dt": 1534086000,
            "main": {
                "temp": 296.911,
                "temp_min": 296.911,
                "temp_max": 296.911,
                "pressure": 1010.59,
                "sea_level": 1029.87,
                "grnd_level": 1010.59,
                "humidity": 60,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 56
            },
            "wind": {
                "speed": 4.16,
                "deg": 266.007
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-12 15:00:00"
        },
        {
            "dt": 1534096800,
            "main": {
                "temp": 294.389,
                "temp_min": 294.389,
                "temp_max": 294.389,
                "pressure": 1009.86,
                "sea_level": 1029.26,
                "grnd_level": 1009.86,
                "humidity": 63,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 2.86,
                "deg": 257.503
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2018-08-12 18:00:00"
        },
        {
            "dt": 1534107600,
            "main": {
                "temp": 291.567,
                "temp_min": 291.567,
                "temp_max": 291.567,
                "pressure": 1009.18,
                "sea_level": 1028.59,
                "grnd_level": 1009.18,
                "humidity": 72,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "clouds": {
                "all": 44
            },
            "wind": {
                "speed": 2.47,
                "deg": 253.004
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2018-08-12 21:00:00"
        },
        {
            "dt": 1534118400,
            "main": {
                "temp": 292.365,
                "temp_min": 292.365,
                "temp_max": 292.365,
                "pressure": 1008.45,
                "sea_level": 1027.9,
                "grnd_level": 1008.45,
                "humidity": 72,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02n"
                }
            ],
            "clouds": {
                "all": 20
            },
            "wind": {
                "speed": 2.57,
                "deg": 237.507
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2018-08-13 00:00:00"
        },
        {
            "dt": 1534129200,
            "main": {
                "temp": 291.037,
                "temp_min": 291.037,
                "temp_max": 291.037,
                "pressure": 1007.82,
                "sea_level": 1027.26,
                "grnd_level": 1007.82,
                "humidity": 81,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 3.41,
                "deg": 238.506
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-13 03:00:00"
        },
        {
            "dt": 1534140000,
            "main": {
                "temp": 295.648,
                "temp_min": 295.648,
                "temp_max": 295.648,
                "pressure": 1007.25,
                "sea_level": 1026.56,
                "grnd_level": 1007.25,
                "humidity": 68,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "clouds": {
                "all": 20
            },
            "wind": {
                "speed": 4.6,
                "deg": 245.501
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-13 06:00:00"
        },
        {
            "dt": 1534150800,
            "main": {
                "temp": 296.362,
                "temp_min": 296.362,
                "temp_max": 296.362,
                "pressure": 1006.93,
                "sea_level": 1026.23,
                "grnd_level": 1006.93,
                "humidity": 58,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 88
            },
            "wind": {
                "speed": 5.81,
                "deg": 264.513
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-13 09:00:00"
        },
        {
            "dt": 1534161600,
            "main": {
                "temp": 296.93,
                "temp_min": 296.93,
                "temp_max": 296.93,
                "pressure": 1006.24,
                "sea_level": 1025.47,
                "grnd_level": 1006.24,
                "humidity": 54,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 68
            },
            "wind": {
                "speed": 6.01,
                "deg": 263.008
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-13 12:00:00"
        },
        {
            "dt": 1534172400,
            "main": {
                "temp": 296.052,
                "temp_min": 296.052,
                "temp_max": 296.052,
                "pressure": 1005.53,
                "sea_level": 1024.76,
                "grnd_level": 1005.53,
                "humidity": 53,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 92
            },
            "wind": {
                "speed": 6.36,
                "deg": 261.5
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2018-08-13 15:00:00"
        },
        {
            "dt": 1534183200,
            "main": {
                "temp": 294.63,
                "temp_min": 294.63,
                "temp_max": 294.63,
                "pressure": 1005.44,
                "sea_level": 1024.66,
                "grnd_level": 1005.44,
                "humidity": 59,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }
            ],
            "clouds": {
                "all": 88
            },
            "wind": {
                "speed": 4.63,
                "deg": 270.5
            },
            "rain": {
                "3h": 0.025
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2018-08-13 18:00:00"
        },
        {
            "dt": 1534194000,
            "main": {
                "temp": 293.658,
                "temp_min": 293.658,
                "temp_max": 293.658,
                "pressure": 1005.23,
                "sea_level": 1024.63,
                "grnd_level": 1005.23,
                "humidity": 65,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }
            ],
            "clouds": {
                "all": 88
            },
            "wind": {
                "speed": 4.62,
                "deg": 271
            },
            "rain": {
                "3h": 0.0375
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2018-08-13 21:00:00"
        }
    ],
    "city": {
        "id": 524901,
        "name": "Moscow",
        "coord": {
            "lat": 55.7522,
            "lon": 37.6156
        },
        "country": "RU"
    }
}
export default App;
