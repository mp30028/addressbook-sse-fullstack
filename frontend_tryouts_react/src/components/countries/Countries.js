import React from 'react';
import { Outlet, Link } from "react-router-dom";
import {AllAfrica} from './AllData';


export default function Countries() {
  return(
			<main >		
				<h1>Static shortlist of African countries</h1>
				<Outlet />
				<nav>
			        <Link to="/nigeria">Nigeria</Link><br/>
			        <Link to="/drc">Democratic Republic of the Congo</Link><br/>
			        <Link to="/egypt">Egypt</Link><br/>
			        <Link to="/ethiopia">Ethiopia</Link><br/>
				</nav>
				<AllAfrica />

			</main >	
	);
}