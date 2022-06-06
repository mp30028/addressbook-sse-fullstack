import React from 'react';
import { Link} from "react-router-dom";
import { getAllCountries} from "./data/Africa";
//import { getData as getWorldData } from "./data/World";

export function AllAfrica() {
	const africanData = getAllCountries();
	return (
		<main >
			<h1>Data for African Countries</h1>

			<nav>
				{africanData.map(
					(country) => {
						console.log(country);
						return(
							<Link to={`/${country.name}`} key={country.name}>
								{country.name}<br/>
							</Link>
						);
					}
				)}
			</nav>
		</main >
	);
}

//export function World() {
//	let worldData = getWorldData();
//	return (
//		<div>
//			<h1>Data for All Countries</h1>
//			<nav>
//				{worldData.map(
//					(country) => {
//						console.log(country);
//						<Link to={`/worldData/${country.cca2}`} key={country.cca2}>
//							{country.name}
//						</Link>
//						return country;
//					}
//				)}
//			</nav>
//			<Outlet />
//		</div>
//	);
//}