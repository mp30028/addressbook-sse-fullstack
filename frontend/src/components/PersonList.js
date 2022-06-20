import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {Outlet, Route, Routes, useNavigate} from 'react-router-dom';
import '../css/Zonesoft.css';
import OtherNames from './OtherNames';
import PersonEdit from './PersonEdit';
import {GetAll, AddNew,Delete, Update, ListenForDataEvents} from '../services/PersonDataService';

const MODULE = "MODULE:PersonList";

export function PersonList(){	
	const FUNCTION = " FUNCTION:PersonList";

	const emptyPerson = useMemo(() => {return  {id:0, firstname:'', lastname:'', dateOfBirth: '', otherNames: []}}, []);
	const [persons, setPersons] =  useState([]);
	const [dataEvent, setDataEvent]= useState(null);
	const [selectedPerson, setSelectedPerson] = useState(null);
	const [fetchedData, setFetchedData] = useState([]);
//	const [addNewRequested, setAddNewRequested] = useState(false);
	const navigate = useNavigate();
	
	const handleDataEvent = useCallback(
		(dataEvent) => {
			const ROUTINE = "ROUTINE:handleDataEvent";
			console.log(`${MODULE} ${FUNCTION} ${ROUTINE} dataEvent=`, dataEvent);
			let newPersons = [];
			if (dataEvent.eventType === 'UPDATE') {
				newPersons = persons.map(p => { return ((p.id === dataEvent.person.id) ? dataEvent.person : p) });
			} else if (dataEvent.eventType === 'CREATE') {
				newPersons = [...persons, dataEvent.person];
			} else if (dataEvent.eventType === 'DELETE') {
				newPersons = persons.filter((p) => { return (p.id === dataEvent.person.id ? null : p) });
				if (selectedPerson) {
					if (selectedPerson.id === dataEvent.person.id) {
						setSelectedPerson(null);
					}
				}
			}
			setPersons(newPersons);
		},
		[persons, selectedPerson]
	)
	
	useEffect(
		() =>{
			const ROUTINE = "EFFECT:[fetchedData]";
			console.log(`${MODULE} ${FUNCTION} ${ROUTINE} fetchedData.length=`, fetchedData.length);
			if(fetchedData.length > 0){
				setPersons(fetchedData);
				ListenForDataEvents({setDataEvent: setDataEvent});
			}else{
				const data = GetAll({setData: setFetchedData});
				if (data){
					setFetchedData(data);	
				}
				
			}
		},
		[fetchedData]
	);
	
	useEffect(
		() => {
			const ROUTINE = "EFFECT:[dataEvent, handleDataEvent]";
			console.log(`${MODULE} ${FUNCTION} ${ROUTINE} dataEvent=`, dataEvent);
			if(dataEvent){
				handleDataEvent(dataEvent);
				setDataEvent(null);
			};
		},
		[dataEvent, handleDataEvent]
	);

	useEffect(
		() =>{
			const ROUTINE = "EFFECT:[selectedPerson, navigate, emptyPerson]";
			console.log(`${MODULE} ${FUNCTION} ${ROUTINE} selectedPerson.id=`, selectedPerson ? selectedPerson.id : "selectedPerson is null");
			if(!selectedPerson){
				navigate("/list", { replace: true });
				
			} else if(selectedPerson.id === emptyPerson.id){
				navigate("add", { replace: true });
			}else{
	    		navigate("edit", { replace: true });
	    	}
		},
		[selectedPerson, navigate, emptyPerson]	
	);

	const handleSelection = (event) => {
		const ROUTINE = "ROUTINE:handleSelection";
		const idToFind = parseInt(event.target.value);
		const targetPerson = persons.find(p => p.id === idToFind);
		console.log(`${MODULE} ${FUNCTION} ${ROUTINE} targetPerson=`, targetPerson);
		if (targetPerson){
			setSelectedPerson(targetPerson);	
		}else{
			setSelectedPerson(null);
		}
	}
	
	const isChecked = (id) =>{
//		const ROUTINE = "ROUTINE:isChecked";
//		console.log(`${MODULE} ${FUNCTION} ${ROUTINE} id=`, id, "selectedPerson.id=" , selectedPerson ? selectedPerson.id : "selectedPerson is null" );
		return ( selectedPerson ? selectedPerson.id === id : false);
	}
	
	const handleAddNew = (event) => {
		setSelectedPerson(emptyPerson);
	}
	
	const addNewPerson = (sourcePerson) =>{
		AddNew({sourcePerson: sourcePerson});
		setSelectedPerson(null);
	}	
	
	const updatePerson = (sourcePerson) =>{
		Update({sourcePerson: sourcePerson});
		setSelectedPerson(null);
	}

	const deletePerson = (sourcePerson) => {
		const ROUTINE = "FUNCTION:deletePerson";
		console.log(`${MODULE} ${FUNCTION} ${ROUTINE} sourcePerson=`, sourcePerson);
		Delete({ sourcePerson: sourcePerson });
		setSelectedPerson(null);
	}

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
										<input type="radio" name="selectPerson" id={'selected' + person.id} value={person.id} onChange={handleSelection} checked={isChecked(person.id)} />
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
					<Route path="edit" element={<PersonEdit action="EDIT" selectedPerson={selectedPerson} updatePerson={updatePerson} deletePerson={deletePerson} />} />
					<Route path="add" element={<PersonEdit action="ADD" selectedPerson={selectedPerson} addNewPerson={addNewPerson} />} />
				</Routes>
				<Outlet />
			</div>
		);
}

export default PersonList;