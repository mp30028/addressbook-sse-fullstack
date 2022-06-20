import React from 'react';
import {Outlet, Link} from 'react-router-dom';

function App(){
		return (
			<div>
				<h1>Address Book App</h1>
				<nav className="zsft-menu">
					<Link to="/list">List of People</Link>
				</nav>
				<Outlet />				
			</div>
		);
}

export default App;