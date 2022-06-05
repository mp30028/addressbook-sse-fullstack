import React, {useState, useEffect} from 'react';
import '../css/Zonesoft.css';
import OtherNames from './OtherNames';

export function PersonList(){
	const apiPath = "/api/persons/get-all";
	const ssePath = "/sse/addressbook";
	const baseUrl = process.env.REACT_APP_API_SERVER_URL_BASE;
	const [persons, setPersons] =  useState([]);
	const [isDataInitialised, setIsDataInitialised] =  useState();
	const [dataEvent, setDataEvent]= useState(null);
	
	useEffect(
		() => {
			if(isDataInitialised === undefined){
				setIsDataInitialised(false);
			}else{
				if(isDataInitialised === false){
					console.log("[useEffect - fetch started]");
					fetch(apiPath, { mode: "no-cors" })
					.then((response) => response.json())
					.then((data) => {setPersons(data); return data;})
					.then((data) => console.log("[useEffect - fetch completed]","data.length=",data.length)) 
					.then(() => setIsDataInitialised(true))
				}
			}
		},
		[isDataInitialised]
	);
	
	useEffect(
		() =>{
			if (isDataInitialised === true){
				console.log("[useEffect - when isDataInitialised changes]", "isDataInitialised = ", isDataInitialised);			
				const messageHandler = (event) => {
					console.log("[messagHandler] Message Handler Triggered", "event=", event);
					const eventData = JSON.parse(event.data);
					const person = eventData.source.person;
					const eventType = eventData.source.eventType;
					setDataEvent({ person: person, eventType: eventType });
				};
				const eventSource = new EventSource(baseUrl + ssePath);
				eventSource.onmessage = messageHandler;
			}
		},
		[isDataInitialised, baseUrl]
	);
	
	useEffect(
		() => {
			if (dataEvent){
				let newPersons = [];
				if (dataEvent.eventType === 'UPDATE') {
					newPersons = persons.map(p => { return ((p.id === dataEvent.person.id) ? dataEvent.person : p) });
				} else if (dataEvent.eventType === 'CREATE') {
					newPersons = [...persons, dataEvent.person];
				} else if (dataEvent.eventType === 'DELETE') {
					newPersons = persons.filter((p) => { return (p.id === dataEvent.person.id ? null : p) })
				}
				setPersons(newPersons);
				setDataEvent(null);
			}
		},
		[dataEvent, persons]
	);
	

		return (
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
							{persons.map(person =>
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
		);
}

export default PersonList;