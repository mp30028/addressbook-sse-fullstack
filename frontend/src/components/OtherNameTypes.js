import React, { useState, useEffect } from 'react';
import {GetOtherNameTypes} from '../services/PersonDataService';

const MODULE = "MODULE:OtherNameTypes";

export const OtherNameTypes = (props) =>{
	const FUNCTION = "FUNCTION:OtherNameTypes";
	const [otherNameTypes, setOtherNameTypes] = useState([]);
	const [currentValue, setCurrentValue]=useState(props.otherNameTypeId);

	useEffect(
		() =>{
			const ROUTINE = "EFFECT:[]";
			GetOtherNameTypes({setOtherNameTypes: setOtherNameTypes});
			console.log(`${MODULE} ${FUNCTION} ${ROUTINE} Invoked`);
		},
		[]
	)
	
	useEffect(
		() => {
			const ROUTINE = "EFFECT:[currentValue]";
			console.log(`${MODULE} ${FUNCTION} ${ROUTINE} HOOK TRIGGERED`);
			props.setOtherNameTypeId(currentValue);
		},
		[currentValue, props]
	)
	
	const handleChange = (event) =>{
		const ROUTINE = "FUNCTION:handleChange";
		const {name, value} = event.target;
		console.log(`${MODULE} ${FUNCTION} ${ROUTINE} name=`, name, "value", value);
		setCurrentValue(value);
	}
	
	return (
		<main>
			<select name={props.dropDownName} id={props.dropDownId} value={currentValue} onChange={handleChange}>
				{otherNameTypes.map(
					(otherNameType) => <option value={otherNameType.id} key={otherNameType.id}>{otherNameType.value}</option>
				)}
			</select>
		</main>
	);
	
}