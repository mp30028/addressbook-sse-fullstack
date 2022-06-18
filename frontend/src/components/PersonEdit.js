import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/Zonesoft.css';
import OtherNamesEdit from './OtherNamesEdit';

const MODULE = "MODULE:PersonEdit";

export function PersonEdit(props) {
	const FUNCTION = " FUNCTION:PersonEdit";
	console.log(`${MODULE} ${FUNCTION} props.selectedPerson=`, props.selectedPerson);
	let [selectedPerson, setSelectedPerson] = useState(props.selectedPerson);
	let [selectedPersonsOtherNames, setSelectedPersonsOtherNames] = useState([]);
	const navigate = useNavigate();

	
	const handleChange = (event) => {
		const {name, value} = event.target;
		if (name === 'id'){
			setSelectedPerson({...selectedPerson, [name]:parseInt(value)})	
		}else{
			setSelectedPerson({...selectedPerson, [name]:value})
		}
		
	}
	
	const handleSubmit = (event) =>{
		event.preventDefault();
		switch(event.target.value){
			case "UPDATE":
				selectedPerson.otherNames = selectedPersonsOtherNames;
				props.updatePerson(selectedPerson);
				break;
			case "CREATE":
				selectedPerson.otherNames = selectedPersonsOtherNames;
				props.updatePerson(selectedPerson);
				break;
			case "CANCEL":
				navigate("/list", { replace: true });
				break;
			case "DELETE":
				navigate("/list", { replace: true });
				props.deletePerson(selectedPerson);
				break;
			default:
				navigate("/list", { replace: true });
		}
	}


	useEffect(
		() =>{
			const deepCopy = (src) => {
				let target = Array.isArray(src) ? [] : {};
				for (let key in src) {
					let v = src[key];
					if (v) {
						if (typeof v === "object") {
							target[key] = deepCopy(v);
						} else {
							target[key] = v;
						}
					} else {
						target[key] = v;
					}
				}
				return target;
			}
			if (props.selectedPerson){
				setSelectedPerson(props.selectedPerson);
				if (props.selectedPerson.otherNames){
					setSelectedPersonsOtherNames(deepCopy(props.selectedPerson.otherNames));
				}else{
					setSelectedPersonsOtherNames(null);
				}
			}
		},
		[props.selectedPerson]
	)
	
	return (
		<form style={{padding: "1rem", width:"30%" }}>
			<table  className="zsft-table">
				<tbody>
				<tr>
					<th>Person ID</th>
					<td>
						<input type="text" name="personId" id="personId" value={selectedPerson.id} readOnly />
					</td>
				</tr>
				<tr>
					<th>Firstname</th>
					<td><input type="text" name="firstname" id="firstname" value={selectedPerson.firstname} onChange={handleChange} /></td>
				</tr>
				<tr>
					<th>Lastname</th>
					<td><input type="text" name="lastname" id="lastname" value={selectedPerson.lastname} onChange={handleChange} /></td>
				</tr>
				<tr>
					<th>Date of Birth</th>
					<td><input type="text" name="dateOfBirth" id="dateOfBirth" value={selectedPerson.dateOfBirth} onChange={handleChange} /></td>
				</tr>
				<tr>
					<th>Other Names</th>
					<td className="subtableContainer">
						<OtherNamesEdit otherNames={selectedPersonsOtherNames}/>
					</td>
				</tr>
						<tr>
							<td colSpan="2" style={{textAlign:"right"}}>
								{(props.action === "EDIT") ? <button type="submit" onClick={handleSubmit} value="DELETE">Delete</button> : "" }
								{(props.action === "EDIT") ? <button type="submit" onClick={handleSubmit} value="UPDATE">Save</button>: ""}
								{(props.action === "ADD") ? <button type="submit" onClick={handleSubmit} value="CREATE">Add New</button>: ""}					
								<button type="submit" onClick={handleSubmit} value="CANCEL">Cancel</button>
							</td>
						</tr>
				</tbody>
			</table>
		</form>


	);

}

export default PersonEdit;