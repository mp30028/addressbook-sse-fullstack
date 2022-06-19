import React, { useState, useEffect } from 'react';

const MODULE = "MODULE:OtherNamesEdit";

function OtherNamesEdit(props){
	const FUNCTION = " FUNCTION:OtherNamesEdit";
	const emptyOtherNames = [];
	const [currentOtherNames, setCurrentOtherNames] = useState(emptyOtherNames);
	const [selectedOtherName, setSelectedOtherName] = useState(null);
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
	};
	
	const isOtherNameChecked = (id) =>{
		const ROUTINE = "ROUTINE:isOtherNamChecked";
		console.log(`${MODULE} ${FUNCTION} ${ROUTINE} id=`, id, "selectedOtherName.id=" , selectedOtherName ? selectedOtherName.id : "selectedOtherName is null" );
		return ( selectedOtherName ? selectedOtherName.id === id : false);
	}
	
	const handleSelection = (event) => {
		const ROUTINE = "ROUTINE:handleSelection";
		const idToFind = parseInt(event.target.value);
		const targetOtherName = currentOtherNames.find(on => on.id === idToFind);
		console.log(`${MODULE} ${FUNCTION} ${ROUTINE} targetOtherName=`, targetOtherName);
		if (targetOtherName){
			setSelectedOtherName(targetOtherName);	
		}else{
			setSelectedOtherName(null);
		}
	}
	
	const handleSubmit = (event) =>{
		event.preventDefault();
//		switch(event.target.value){
//			case "UPDATE":
//				selectedPerson.otherNames = selectedPersonsOtherNames;
//				props.updatePerson(selectedPerson);
//				break;
//			case "CREATE":
//				selectedPerson.otherNames = selectedPersonsOtherNames;
//				props.updatePerson(selectedPerson);
//				break;
//			case "CANCEL":
//				navigate("/list", { replace: true });
//				break;
//			case "DELETE":
//				navigate("/list", { replace: true });
//				props.deletePerson(selectedPerson);
//				break;
//			default:
//				navigate("/list", { replace: true });
//		}
	};	
	
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
						{currentOtherNames.map(otherName =>
							<tr key={otherName.id}>
								<td><input type="text" name="otherNameValue" id={"value_" + otherName.id} value={otherName.value} onChange={updateOtherName}/></td>
								<td><input type="text" name="otherNameType" id={"otherNameType.value_" + otherName.id}  value={otherName.otherNameType.value} onChange={updateOtherName}/></td>
								<td style={{textAlign:"center"}}>
									<input type="radio" name="selectOtherName" id={'selectOtherName_' + otherName.id} value={otherName.id} onChange={handleSelection} checked={isOtherNameChecked(otherName.id)} />
									<label htmlFor={'selectOtherName_' + otherName.id} className="ellipses">. . .</label>
								</td>
							</tr>	
						)}
						<tr>
							<td colSpan="3" style={{textAlign:"right"}}>
								<button type="submit" onClick={handleSubmit} value="CREATE">Add</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
};

export default OtherNamesEdit;