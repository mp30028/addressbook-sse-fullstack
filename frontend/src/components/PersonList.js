import React, { Component } from 'react';
import '../css/Zonesoft.css';
import OtherNames from './OtherNames';

class PersonList extends Component {
	apiPath = null;
	ssePath = null;
	baseUrl = null;
	eventSource = null;
	
	constructor(props){
		super(props);
		this.state = { persons: [], isListening: false, isDataInitialised: false };
		this.apiPath = "/api/persons/get-all";
		this.ssePath = "/sse/addressbook";
		this.baseUrl= process.env.REACT_APP_API_SERVER_URL_BASE;
			
	}

	async componentDidMount() {
		console.log("[componentDidMount] Triggered");
		console.log(`[componentDidMount] this.baseUrl = ${this.baseUrl}`);
		console.log(`[componentDidMount] this.apiPath = ${this.apiPath}`);
		await fetch(this.apiPath, { mode: "no-cors" })
		.then((response) => response.json())
        .then((json) => {
            this.setState({
                persons: json,
                isDataInitialised: true
            })
        })
        .then(() => {console.log(`[componentDidMount] this.state = ${JSON.stringify(this.state)}`)})
        .then(this.setUpEventHandler())
	};
	
	updateState = (event) => {
		let eventData = JSON.parse(event.data);
		let person = eventData.source.person;
		if (eventData.source.eventType === 'UPDATE') {
			this.setState({ persons: this.state.persons.map(p => { return ((p.id === person.id) ? person : p) }) });
		} else if (eventData.source.eventType === 'CREATE') {
			this.setState(({ persons: [...this.state.persons, person] }));
		} else if (eventData.source.eventType === 'DELETE') {
			this.setState({ persons: this.state.persons.filter(function(p) { return (p.id === person.id ? null : p) }) });
		}
	};

	setUpEventHandler(){
		console.log(`[setUpEventHandler] this.state = ${JSON.stringify(this.state)}`);	
		if (this.state.isListening){
			if(this.eventSource){
				this.eventSource.close();
				console.log(`[setUpEventHandler]this.eventSource.close() invoked. this.eventSource.readyState = ${this.eventSource.readyState}`);
				this.eventSource = null;
			}			
		};
			this.eventSource = new EventSource(this.baseUrl + this.ssePath);
			console.log(`[setUpEventHandler] Setting up onmessage handler`);
			this.eventSource.onmessage = (e)=>{
					console.log(`[EventListener-message] Event ${JSON.stringify(e)} triggered and handled by this.eventSource.onmessage handler`);
					 this.updateState(e);
				};
			this.setState({isListening: true},()=>{console.log(`[setUpEventHandler] this.state = ${JSON.stringify(this.state)}`)});
			console.log(`[setUpEventHandler] this.eventSource.url = ${this.eventSource.url}`);	
	}

	componentWillUnmount() {
		console.log("componentWillUnmount Triggered");
		if(this.eventSource){
			this.eventSource.close();
			console.log(`[componentWillUnmount]this.eventSource.close() invoked. this.eventSource.readyState = ${this.eventSource.readyState}`);
		}else{
			console.log("[componentWillUnmount]this.eventSource is not assigned so cannot be closed");
		}
		console.log(`[componentWillUnmount]this.state = ${JSON.stringify(this.state)}`);
	}

	render() {
		return (
			<div>
				<div>
					<table className="zsft-table">
						<thead>
							<tr>
								<th>ID</th>
								<th>Firstname</th>
								<th>Lastname</th>
								<th>Date of Birth</th>
								<th>Other Names</th>
							</tr>
						</thead>
						<tbody>
							{this.state.persons.map(person =>
								<tr key={person.key}>
									<td>{person.id}</td>
									<td>{person.firstname}</td>
									<td>{person.lastname}</td>
									<td>{person.dateOfBirth[2]}/{person.dateOfBirth[1]}/{person.dateOfBirth[0]}</td>
									<td className="subtableContainer"><OtherNames personId={person.id} otherNames={person.otherNames}/></td>
								</tr>
							)}
							<tr>
								<td colspan="5">
									<button>Edit</button>
									<button>Delete</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default PersonList;