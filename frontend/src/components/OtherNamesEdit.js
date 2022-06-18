import React, { useState, useEffect } from 'react';

const MODULE = "MODULE:OtherNamesEdit";

function OtherNamesEdit(props){
	const FUNCTION = " FUNCTION:OtherNamesEdit";
	const emptyOtherNames = [];
	const [currentOtherNames, setCurrentOtherNames] = useState(emptyOtherNames);
	
	useEffect(
		() => {
			setCurrentOtherNames(props.otherNames);
		},
		[props.otherNames]
	)
	
	useEffect(
		() => {
			const ROUTINE = "EFFECT:[currentOtherNames]";
			if (currentOtherNames) {
				console.log(`${MODULE} ${FUNCTION} ${ROUTINE}`);
			}

		},
		[currentOtherNames]
	)
	
	const updateOtherName = (event) => {
		const ROUTINE = "FUNCTION:updateOtherName";
		const {name, value} = event.target;
		console.log(`${MODULE} ${FUNCTION} ${ROUTINE}name=`, name, "value=", value, "event.target.id=", event.target.id);
		const editedItemId = event.target.id.split("_");
		const idToFind = parseInt(editedItemId[1]);
		const otherName = currentOtherNames.find(on => on.id === idToFind);
		otherName[editedItemId[0]] = value;
		let newOtherNames =[];
		newOtherNames = currentOtherNames.map(on => { return ((on.id === otherName.id) ? otherName : on) });
		setCurrentOtherNames(newOtherNames);	
	}
	
		return(
			<div style={{width: "100%"}}>
				<table>
					<thead>
						<tr>
							<th style={{ width: "50%" }}>Other Name</th>
							<th style={{ width: "50%" }}>Type</th>
						</tr>
					</thead>
					<tbody>
						{currentOtherNames ?
							currentOtherNames.map(otherName =>
							<tr key={otherName.id}>
								<td><input type="text" name="otherNameValue" id={"value_" + otherName.id} value={otherName.value} onChange={updateOtherName}/></td>
								<td><input type="text" name="otherNameType" id={"otherNameType.value_" + otherName.id}  value={otherName.otherNameType.value} onChange={updateOtherName}/></td>
							</tr>
							
						):
						<tr>
							<td colSpan="2" style={{textAlign: "center"}}> -- No Other Names -- </td>
						</tr>
						}
					</tbody>
				</table>
			</div>
		);
};

export default OtherNamesEdit;