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
	return Math.trunc(ktemp * (9/5) - 459.67);
}
function convertCelsius(ktemp) {
	return Math.trunc(ktemp - 273.15);
}

class DayWeatherCard extends Component {
	render() {
		const day = this.props.day;
		const conditions = this.props.conditions;

		const temp_max = convertFahrenheit(this.props.temp_max); //TODO: Create Celsius/Fahrenheit conversions
		const temp_min = convertFahrenheit(this.props.temp_min);
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
					<td>Max: {temp_max}</td>
					<td>Min: {temp_min}</td>
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
		else if(this.props.failed)
		{
			return (<p>Failed State</p>);
		}	
		else 
		{
			const cityName = this.props.weather.city.name;
			const countryName = this.props.weather.city.country;
			const list = this.props.weather.list;
			const cards = [];
			
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
							{cityName}{', '}{countryName}
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
			<button type="submit">Submit</button>
			<p><input type="checkbox"/>{' '}Check for Celsius</p>
			</form>
		);
	}
}

class WeatherWidget extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query : '',
			loading : false, //Future design - maybe better to state as an enum?
			empty: true,
			failed: false,
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
			failed: false,
			empty: false,
		});
		fetch(api_url + api_query + api_key)
		.then(response => {
			if (!response.ok) {
				this.setState({
					failed: true,
				});
			}
			return response.json()
		})
		.then(data => {
			if (this.state.failed)
			{
				alert("Could not find " + query + " in our database. Sorry!");
				return this.setState({loading: false, failed: true, empty: false, weather: data});
			} else {
				return this.setState({ loading: false, empty: false, failed: false, weather: data });
			}
		});
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
					failed={this.state.failed}
					empty={this.state.empty}
					weather={this.state.weather}/>
			</div>
		)
	}
}

export default App;
