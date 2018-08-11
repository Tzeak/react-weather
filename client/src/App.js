import React, { Component } from 'react';
import spinner from './logo.svg';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
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

		const temp_max = this.props.convert 
			? convertCelsius(this.props.temp_max) 
			: convertFahrenheit(this.props.temp_max); 
		const temp_min = this.props.convert 
			? convertCelsius(this.props.temp_min)
			: convertFahrenheit(this.props.temp_min);
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
					<td>Max: {temp_max + (this.props.convert ? ' °C' : ' °F')}</td>
					<td>Min: {temp_min + (this.props.convert ? ' °C' : ' °F')}</td>
				</tr>
			</tbody>
			</table>
			</td>
		);
	}
}

class WeekWeatherTable extends Component {

	render() {
		let cityName = "Townsville";
		let countryName = "USA";
		let cards = Array(5).fill(null);
		let state = ""
		let list = []

		for(let i = 0; i < 5; i++) 
		{
			cards.push(<DayWeatherCard 
				key={i} 
				day={i}
				conditions="Partly Cloudy"
				temp_max= {300}
				temp_min= {280}
				convert= {this.props.convert}
			/>);
		}

		if(this.props.empty)
		{
			state = "empty";
		}	
		else if(this.props.loading)
		{
			state = "loading";
			cityName = "Loading...";
			countryName = '';
		}	
		else if(this.props.failed)
		{
			cityName = "Error";
			countryName = '';
			state = "failed";
		}	
		else 
		{
			state = "success";
			cityName = this.props.weather.city.name;
			countryName = this.props.weather.city.country;
			list = this.props.weather.list;
			cards = [];
			
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
					convert= {this.props.convert}
				/>);

				let targetday = (day+1)%7;
				while(day !== targetday) 
				{
					i++;
					day = new Date(list[i]['dt']*1000).getDay(); //TODO: research - sort of stack breakage?
				}
			}
		}

		return (
			<div>
			<img src={spinner} className={state} id="spinner" alt="loading" />
			<table className={state}>
				<tbody>
				<tr>
					<th colSpan="5">
						{cityName}{' '}{countryName}
					</th>
				</tr>
				<tr>
					{cards}
				</tr>
				</tbody>
			</table>
			</div>
		);
		
	}

}

class CitySearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
    this.handleTempConvert = this.handleTempConvert.bind(this);
  }
  
  handleQueryChange(e) {
    this.props.onChange(e.target.value);
  }
  handleTempConvert(e) {
    this.props.onConvert(e.target.value);
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
			<p><input type="checkbox" onChange={this.handleTempConvert}/>{' '}Check for Celsius</p>
			</form>
		);
	}
}

class WeatherWidget extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query : '',
			empty: true,
			loading : false, //Future design - maybe better to state as an enum?
			failed: false,
			weather : {},
			convert: false,
		}
		this.handleQueryChange = this.handleQueryChange.bind(this); //For some reason couldn't get new format to bind properly - using this binding for now
		this.handleQuerySubmit = this.handleQuerySubmit.bind(this); 
		this.handleTempConvert = this.handleTempConvert.bind(this); 
	}


	handleQueryChange(query) {
		this.setState({
			query: query,
			loading: true,
			empty: query === '',
		});

	}
	handleTempConvert() {
		this.setState({
			convert: !this.state.convert,
		});
	}
	handleQuerySubmit(query) {
		const api_query = encodeURIComponent(query); //
		
		this.setState({
			query: query,
			loading: true,
			failed: false,
			empty: false,
		});
		fetch('/api/weather/' + api_query)
		.then(response => response.json()) //convoluted way of refactoring original code to accept new proxy server under time constraints
		.then(body => body.body)
		.then(response => {
			response = JSON.parse(response);
			console.log(response);
			if (!response.cod == '200') {
				this.setState({
					failed: true,
				});
			}
			return response;
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
					onConvert={this.handleTempConvert}
				/>
				<WeekWeatherTable 
					query={this.state.query}
					loading={this.state.loading}
					failed={this.state.failed}
					empty={this.state.empty}
					weather={this.state.weather}
					convert={this.state.convert}/>
			</div>
		)
	}
}
export default App;
