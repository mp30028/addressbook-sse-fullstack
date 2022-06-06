import { useParams } from "react-router-dom";
import { getCountryByName } from "./data/Africa";

export default function Country() {
	let params = useParams();
	let country = getCountryByName(params.name);
	return (
		<main>
			<h2>Country {country.name}</h2>
			<table>
				<tbody>
					<tr><td><b>Poputlation</b></td><td>{country.pop2022}</td></tr>
					<tr><td><b>Income per capita</b></td><td>{country.gniLatest}</td></tr>
					<tr><td><b>Growth Rate</b></td><td>{country.GrowthRate}</td></tr>
					<tr><td><b>Land Area</b></td><td>{country.area}</td></tr>
				</tbody>
			</table>
		</main>
	)
}