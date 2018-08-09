import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
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
		if(this.props.empty)
		{
			return (<p>Empty State</p>);
		}	
		else if(this.props.loading)
		{
			return (<p>Loading State</p>);
		}	
		else 
		{
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
				while(day !== targetday) 
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

}

class CitySearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
  }
  
  handleQueryChange(e) {
    this.props.onChange(e.target.value);
  }
  handleQuerySubmit(e) {
	console.log(e.target)
    this.props.onSubmit(e.target.querySelector('input').value);
	e.preventDefault();
  }
  
	render() {
		const query = this.props.query;
		return (
			<form onSubmit={this.handleQuerySubmit} >
			<input 
				type="text" 
				placeholder="Search for a city" 
				value={query} 
				onChange={this.handleQueryChange} 
			/>
			<p><input type="checkbox"/>{' '}Check for Celsius</p>
			</form>
		);
	}
}

/*State in the Application
	- Empty State - initial state
	- Loading State - async with api call, after submit to OpenWeatherAPI
	- Invalid State - city not found in search query
	- Success State - city found in search query and 5 day forecast found
		- Toggle for Celsius vs Fahrenheit - is this state? can be computed
Where does the state live?
	WeatherWidget - Handles Search Bar and Weather Table	
*/


class WeatherWidget extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query : '',
			loading : false,
			empty: true,
			weather : {},
		}
		this.handleQueryChange = this.handleQueryChange.bind(this); //For some reason couldn't get new format to bind properly - using this binding for now
		this.handleQuerySubmit = this.handleQuerySubmit.bind(this); 
	}

	handleQueryChange(query) {
		this.setState({
			query: query,
			loading: true,
			empty: query === '',
		});

	}
	handleQuerySubmit(query) {
		const api_url = "http://api.openweathermap.org/data/2.5/forecast?q=";
		const api_key = "&APPID=f875710aea4e02462c8edf532cad97f3";
		const api_query = query;
		
		this.setState({
			query: query,
			loading: true,
		});
		//fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=f875710aea4e02462c8edf532cad97f3')
		fetch(api_url + api_query + api_key)
			.then(response => response.json())
			.then(data => this.setState({
				loading: false,
				empty: false,
				weather: data
			})
		);
	}
	render() {
		return (
			<div>
				<CitySearchBar 
					query={this.state.query}
					onChange={this.handleQueryChange}
					onSubmit={this.handleQuerySubmit}
				/>
				<WeekWeatherTable 
					query={this.state.query}
					loading={this.state.loading}
					empty={this.state.empty}
					weather={this.state.weather}/>
			</div>
		)
	}
}

export default App;
