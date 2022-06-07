import React, { useState } from 'react';
import { useNavigate  } from "react-router-dom";
import { getAll } from './data/PeopleData'
import '../css/Zonesoft.css';

export function PeopleList() {
	const [persons, setPersons] = useState(getAll());
	const navigate = useNavigate();

	
	return (
		<main>
			<h3>List of People</h3>
			<table className="zsft-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Firstname</th>
						<th>Lastname</th>
						<th>Date of Birth</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{persons.map(person =>
						<tr key={person.id}>
							<td>{person.id}</td>
							<td>{person.firstname}</td>
							<td>{person.lastname}</td>
							<td>{person.dateOfBirth}</td>
							<td>
								&nbsp;
								<button onClick={() => navigate('/edit/' + person.id)}>
									Edit
								</button>
								&nbsp;
								<button>Delete</button>
							</td>
						</tr>
					)}
					<tr>
						<td colSpan="5">
							<button onClick={() => navigate('/')}>
								Home
							</button>
							<button>Add New</button>
						</td>
					</tr>
				</tbody>
			</table>
		</main>
	);
}