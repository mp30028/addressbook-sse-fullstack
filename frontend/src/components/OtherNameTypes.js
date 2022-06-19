import React, { useState, useEffect } from 'react';
import {GetOtherNameTypes} from '../services/PersonDataService';

const MODULE = "MODULE:OtherNameTypes";

export const OtherNameTypes = (props) =>{
	const FUNCTION = "FUNCTION:OtherNameTypes";
	const [otherNameTypes, setOtherNameTypes] = useState([]);

	useEffect(
		() =>{
			const ROUTINE = "EFFECT:[]";
			GetOtherNameTypes({setOtherNameTypes: setOtherNameTypes});
			console.log(`${MODULE} ${FUNCTION} ${ROUTINE} Invoked`);
		},
		[]
	)
	
//	useEffect(
//		() =>{
//			const ROUTINE = "EFFECT:[fetchedOtherNameTypes]";
//			console.log(`${MODULE} ${FUNCTION} ${ROUTINE} otherNameTypes.length=`, otherNameTypes ? otherNameTypes.length : "otherNameTypes is null or undefined");
//		},
//		[otherNameTypes]
//	)
	
	const handleChange = (event) =>{
		const ROUTINE = "FUNCTION:handleChange";
		console.log(`${MODULE} ${FUNCTION} ${ROUTINE} event=`, event);
	}
	
	return (
		<main>
			<select name={props.dropDownName} id={props.dropDownId} value={props.otherNameTypeId} onChange={handleChange}>
				{otherNameTypes.map(
					(otherNameType) => <option value={otherNameType.id} key={otherNameType.id}>{otherNameType.value}</option>
				)}
			</select>
		</main>
	);
	
}