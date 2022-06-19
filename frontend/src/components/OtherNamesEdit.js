import React, { useState, useEffect } from 'react';
import {OtherNameTypes} from './OtherNameTypes';

const MODULE = "MODULE:OtherNamesEdit";

function OtherNamesEdit(props){
	const FUNCTION = " FUNCTION:OtherNamesEdit";
	const emptyOtherNames = [];
	const [otherNames, setOtherNames] = useState(emptyOtherNames);
	
	useEffect(
		() => {
			setOtherNames(props.otherNames);
		},
		[props.otherNames]
	)
	
	useEffect(
		() => {
			const ROUTINE = "EFFECT:[otherNames]";
			if (otherNames) {
				console.log(`${MODULE} ${FUNCTION} ${ROUTINE}`);
			}

		},
		[otherNames]
	)
	
	const handleChangeToOtherName = (event) => {
		const ROUTINE = "FUNCTION:updateOtherName";
		const {name, value} = event.target;
		console.log(`${MODULE} ${FUNCTION} ${ROUTINE}name=`, name, "value=", value, "event.target.id=", event.target.id);
		const editedItemId = event.target.id.split("_");
		const idToFind = parseInt(editedItemId[1]);
		const otherName = otherNames.find(on => on.id === idToFind);
		otherName[editedItemId[0]] = value;
		let newOtherNames =[];
		newOtherNames = otherNames.map(on => { return ((on.id === otherName.id) ? otherName : on) });
		setOtherNames(newOtherNames);	
	};
	
	const handleDeleteOtherName = (event) =>{
		const ROUTINE = "FUNCTION: handleDeleteOtherName";
		console.log(`${MODULE} ${FUNCTION} ${ROUTINE} event.target.name=`, event.target.name, "event.target.value=", event.target.value, "event.target.id=", event.target.id);
		event.preventDefault();
		const targetId = parseInt(event.target.value);
		const newOtherNames = otherNames.filter((on) => { return (on.id === targetId ? null : on) });
		setOtherNames(newOtherNames);
	};	
	
	const handleAddNewOtherName = (event) =>{
		const ROUTINE = "FUNCTION: handleAddNewOtherName";
		console.log(`${MODULE} ${FUNCTION} ${ROUTINE} event.target.name=`, event.target.name);
		const temporaryId = Date.now() * -1;
		const emptyOtherName = {id: temporaryId , value: "", otherNameType: {id: 6, value: "Firstname at birth"}};
		event.preventDefault();
		const newOtherNames = [...otherNames, emptyOtherName];
		setOtherNames(newOtherNames);
	}
	
		return(
			<div style={{width: "100%"}}>
				<table>
					<thead>
						<tr>
							<th style={{ width: "40%" }}>Other Name</th>
							<th style={{ width: "40%" }}>Type</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{otherNames.map(otherName =>
							<tr key={otherName.id}>
								<td><input type="text" name="otherNameValue" id={"value_" + otherName.id} value={otherName.value} onChange={handleChangeToOtherName}/></td>								
								<td>
									<OtherNameTypes dropDownName={"otherNameType_" + otherName.id} dropDownId={"otherNameType_" + otherName.id} otherNameTypeId={otherName.otherNameType.id} />
								</td>
								
								<td style={{textAlign:"center"}}>
								<button className="deleteButton" name="deleteOtherName" id={'deleteOtherName_' + otherName.id} value={otherName.id}  onClick={handleDeleteOtherName}/>
								</td>
							</tr>	
						)}
						<tr>
							<td colSpan="3" style={{textAlign:"right"}}>
								<button className="addNewButton" id={'addNewOtherName'} onClick={handleAddNewOtherName} />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
};

export default OtherNamesEdit;