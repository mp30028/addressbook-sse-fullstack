import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { getById } from './data/PeopleData'
import '../css/Zonesoft.css';

export function PersonEdit() {
	const params = useParams();
	const person = getById(parseInt(params.id));
	return(
		<main>
			{person.id}<br/>
			{person.firstname}<br/>
			{person.lastname}<br/>
			{person.dateOfBirth}<br/>
		</main>
	)
}