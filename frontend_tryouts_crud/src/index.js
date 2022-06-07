import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import{PeopleList} from './components/PeopleList';
import{PersonEdit} from './components/PersonEdit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<main>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} >
					<Route path="list" element={<PeopleList />} />
					<Route path="edit/:id" element={<PersonEdit />} />
					<Route
						path="*"
						element={
							<main>
								<p>There's nothing here!</p>
							</main>
						} />
				</Route>
			</Routes>
		</BrowserRouter>
	</main>
);

