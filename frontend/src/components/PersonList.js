import React, { Component } from 'react';
import '../css/Zonesoft.css';
import OtherNames from './OtherNames';
import FetchAllPersons from './FetchAllPersons';
import DataEventListener from './DataEventListener';

class PersonList extends Component {

	constructor(props){
		super(props);
		this.state = { 
			persons: [], 
			isListening: false, 
			isDataInitialised: false, 
			eventSource: null,
			apiPath: "/api/persons/get-all",
			ssePath: "/sse/addressbook",
			baseUrl: process.env.REACT_APP_API_SERVER_URL_BASE
		};
		this.updateState = this.updateState.bind(this);
	}

	updateState = (newStateProperty) =>{
		this.setState(newStateProperty);
	}
	
	async componentDidMount() {	
		if(!this.state.isDataInitialised){
			await FetchAllPersons({stateSetter : this.updateState, apiPath: this.state.apiPath});
		};
		
		DataEventListener({
				isListening: this.state.isListening,
				eventSource: this.state.eventSource,
				stateSetter: this.updateState,
				persons: this.state.persons,
				sseUrl: this.state.baseUrl + this.state.ssePath
		});
	};
	
//	componentWillUnmount() {
//		console.log("componentWillUnmount Triggered");
//		if(this.eventSource){
//			this.eventSource.close();
//			console.log(`[componentWillUnmount]this.eventSource.close() invoked. this.eventSource.readyState = ${this.eventSource.readyState}`);
//		}else{
//			console.log("[componentWillUnmount]this.eventSource is not assigned so cannot be closed");
//		}
//		console.log(`[componentWillUnmount]this.state = ${JSON.stringify(this.state)}`);
//	}

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
								<td colSpan="5">
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