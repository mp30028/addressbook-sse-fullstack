import React, { useState, useEffect } from 'react';
import '../css/Zonesoft.css';
import OtherNamesEdit from './OtherNamesEdit';

export function PersonEdit(props) {
//	const emptyPerson =  {id:0, firstname:'', lastname:'', dateOfBirth: ''};
	console.log("[PersonEdit] props.selectedPerson=", props.selectedPerson);
	let [person, setPerson] = useState(props.selectedPerson);
	console.log("[PersonEdit] person)=", person);
//debugger;
	const updatePerson = (event) => {
		const {name, value} = event.target;
		if (name === 'id'){
			setPerson({...person, [name]:parseInt(value)})	
		}else{
			setPerson({...person, [name]:value})
		}
		
	}
	
	const handleSubmit = (event) =>{
		event.preventDefault();
//		props.updatePersons(event.target.value, person);
	}


	useEffect(
		() =>{
			setPerson(props.selectedPerson);
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
						<input type="text" name="personId" id="personId" value={person.id} readOnly />
					</td>
				</tr>
				<tr>
					<th>Firstname</th>
					<td><input type="text" name="firstname" id="firstname" value={person.firstname} onChange={updatePerson} /></td>
				</tr>
				<tr>
					<th>Lastname</th>
					<td><input type="text" name="lastname" id="lastname" value={person.lastname} onChange={updatePerson} /></td>
				</tr>
				<tr>
					<th>Date of Birth</th>
					<td><input type="text" name="dateOfBirth" id="dateOfBirth" value={person.dateOfBirth} onChange={updatePerson} /></td>
				</tr>
				<tr>
					<th>Other Names</th>
					<td className="subtableContainer">
						<OtherNamesEdit otherNames={person.otherNames}/>
{/* 
						<table id="otherNamesTable" className="subtableContainer">
							
							<thead>
								<tr>
									<th>Other-Name</th>
									<th>Name-Type</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
							<tr>
								<td>
									<input type="text" name="otherNameValue" id="otherNameValue" />
								</td>

								<td>
									<select name="otherNameTypeId" id="otherNameTypeId">
										<option value="-1"></option>
									</select>
								</td>

								<td>
									<button type="button" name="otherNameDeleteButton" id="otherNameDeleteButton"></button>
								</td>
							</tr>
							</tbody>
						</table>
*/}
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