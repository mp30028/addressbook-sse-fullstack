import React, { useState, useEffect } from 'react';
import '../css/Zonesoft.css';
import OtherNamesEdit from './OtherNamesEdit';

export function PersonEdit(props) {
	console.log("[PersonEdit] props.selectedPerson=", props.selectedPerson);
	let [selectedPerson, setSelectedPerson] = useState(props.selectedPerson);
	let [selectedPersonsOtherNames, setSelectedPersonsOtherNames] = useState([]);
	console.log("[PersonEdit] person)=", selectedPerson);


	
	const updatePerson = (event) => {
		const {name, value} = event.target;
		if (name === 'id'){
			setSelectedPerson({...selectedPerson, [name]:parseInt(value)})	
		}else{
			setSelectedPerson({...selectedPerson, [name]:value})
		}
		
	}
	
	const handleSubmit = (event) =>{
		event.preventDefault();
		selectedPerson.otherNames = selectedPersonsOtherNames;
		props.updatePerson(selectedPerson);
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
			setSelectedPerson(props.selectedPerson);
			setSelectedPersonsOtherNames(deepCopy(props.selectedPerson.otherNames))

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
					<td><input type="text" name="firstname" id="firstname" value={selectedPerson.firstname} onChange={updatePerson} /></td>
				</tr>
				<tr>
					<th>Lastname</th>
					<td><input type="text" name="lastname" id="lastname" value={selectedPerson.lastname} onChange={updatePerson} /></td>
				</tr>
				<tr>
					<th>Date of Birth</th>
					<td><input type="text" name="dateOfBirth" id="dateOfBirth" value={selectedPerson.dateOfBirth} onChange={updatePerson} /></td>
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
								{(props.action === "ADD") ? <button type="submit" onClick={handleSubmit} value="CREATE">Create</button>: ""}					
								<button type="submit" value="CANCEL">Cancel</button>
							</td>
						</tr>
				</tbody>
			</table>
		</form>


	);

}

export default PersonEdit;