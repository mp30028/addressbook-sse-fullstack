import React from 'react';
import { Outlet, Link } from "react-router-dom";
//import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
	return (

		<main >
			<h1>Example CRUD App</h1>
			<nav>
				<Link to="/list">List of People</Link><br />
			</nav>
			<Outlet />
		</main >

	);
}

export default App;
