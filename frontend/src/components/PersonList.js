import React, {useState, useEffect, useMemo} from 'react';
import {Outlet, Route, Routes, useNavigate} from 'react-router-dom';
import '../css/Zonesoft.css';
import OtherNames from './OtherNames';
import PersonEdit from './PersonEdit';

export function PersonList(){
	
	
//-------------------------------------------------------------Data Fetch And Synch code--------------------------------------------------------------	
	
	const apiPath = "/api/persons/get-all";
	const ssePath = "/sse/addressbook";
	const baseUrl = process.env.REACT_APP_API_SERVER_URL_BASE;
	const [persons, setPersons] =  useState([]);
	const [isDataInitialised, setIsDataInitialised] =  useState();
	const [dataEvent, setDataEvent]= useState(null);
	const [selectedPerson, setSelectedPerson] = useState(null);

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
				setAction({act: "dataEvent", person: selectedPerson});
			}
		},
		[dataEvent, persons, selectedPerson]
	);
	
	
//-------------------------------------------------------------UI Code--------------------------------------------------------------
	const navigate = useNavigate();
	const emptyPerson = useMemo(() => {return  {id:0, firstname:'', lastname:'', dateOfBirth: ''}}, []);
//	const [selectedPerson, setSelectedPerson] = useState(null);
	const [action, setAction] = useState();
	let lastAction = {act: null, person: null};

	const handleSelection = (event) => {
		const idToFind = parseInt(event.target.value);
		lastAction.act = event.target.name;
		lastAction.person = persons.find(p => p.id === idToFind);
		setAction(lastAction);
		console.log("[PersonList.handleSelection] lastAction=", lastAction)
	}
	
	const handleAddNew = (event) => {
		lastAction.act = event.target.name;
		lastAction.person = emptyPerson;
		setAction(lastAction);
	}
	
//	const shouldSelect = (id) =>{
//		return ( selectedPerson ? selectedPerson.id === id : false);
//	}

	useEffect(
		() => {
			if (action){
				switch(action.act){
					case "selectPerson":
						setSelectedPerson(action.person);
						break;
					case "addPerson":
						setSelectedPerson(emptyPerson);
						break;
					case "dataEvent":
						const idToFind = parseInt(action.person.id);
						let person = persons.find(p => p.id === idToFind);
						if (!person){
							setSelectedPerson(emptyPerson);
						}
						break;
					default:
						setSelectedPerson(null);
						break;
				};
			};
		},
		[action, emptyPerson, persons]		
	)
	
	useEffect(
		() =>{
			if(!selectedPerson){
				navigate("/list", { replace: true });
				
			} else if(selectedPerson.id === emptyPerson.id){
				navigate("add", { replace: true });
			}else{
				console.log("[PeopleList.useEffect[selectedPerson]] selectedPerson", selectedPerson);
	    		navigate("edit", { replace: true });
	    	}
		},
		[selectedPerson, navigate, emptyPerson]	
	);
		return (
			<div style={{ display: "flex", width: "100%"}}>
				<nav className="zsft-explorer" style={{width: "50%"}}>
					<table className="zsft-table" style={{width: "100%"}}>
						<thead>
							<tr>
								<th>ID</th>
								<th>Firstname</th>
								<th>Lastname</th>
								<th>Date of Birth</th>
								<th>Other Names</th>
								<th></th>
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
									<td style={{textAlign:"center"}}>
										<input type="radio" name="selectPerson" id={'selected' + person.id} value={person.id} onChange={handleSelection}  />
										<label htmlFor={'selected' + person.id} className="ellipses">. . .</label>
									</td>
								</tr>
							)}
							<tr>
								<td colSpan="7" style={{textAlign:"right"}}>
									<button type="submit" name="addPerson" onClick={handleAddNew}>Add New</button>
								</td>
							</tr>
						</tbody>
					</table>
				</nav>
				<Routes>
					<Route path="edit" element={<PersonEdit action="EDIT" selectedPerson={selectedPerson} />} />
					<Route path="add" element={<PersonEdit action="ADD" selectedPerson={selectedPerson} />} />
				</Routes>
				<Outlet />
			</div>
		);
}

export default PersonList;