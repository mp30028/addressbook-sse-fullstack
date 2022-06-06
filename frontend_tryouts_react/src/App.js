import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TellTime from "./components/TellTime";
import TellTimeUsingEffects from "./components/TellTimeUsingEffects";
import TellTimeUsingCallback from "./components/TellTimeUsingCallback";
import Countries from './components/countries/Countries';
import Country from './components/countries/Country'
import Nigeria from './components/countries/Nigeria';
import DRCongo from './components/countries/DRCongo';
import Egypt from './components/countries/Egypt';
import Ethiopia from './components/countries/Ethiopia';



const App = () => {
	const greeting = 'This message was passed in props!';

	return (
		<div>
			<Example1 messageFromFunctionCaller={"[Calling Example1] " + greeting} /> <hr />
			<Example2 messageFromFunctionCaller={"[Calling Example2] " + greeting} /> <hr />
			<Example3 messageFromFunctionCaller={"[Calling Example3] " + greeting} /> <hr />
			<Example4 /> <hr />
			<Example5 /> <hr />
			<Example6 /> <hr />
			<Example7 /> <hr />
			<Example8 /> <hr />

			<h2> Example 9. demonstrating useState</h2>
			<TellTime /> <hr />

			<h2> Example 10. demonstrating useEffect</h2>
			<TellTimeUsingEffects /> <hr />

			<h2> Example 11. demonstrating useCallback</h2>
			<TellTimeUsingCallback /> <hr />

			<h2> Example 12. demo with React Router</h2>
		
			<div>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Countries  />} >
							<Route path=":name" element={<Country />} />
							<Route path="nigeria" element={<Nigeria />} />
							<Route path="drc" element={<DRCongo />} />
							<Route path="egypt" element={<Egypt />} />
							<Route path="ethiopia" element={<Ethiopia />} />
						    <Route 
						    	path="*" 
						    	element={
						        	<main>
						          		<p>There's nothing here!</p>
						        	</main>
						      	}/>
						</Route>
					</Routes>
				</BrowserRouter>
			</div>

			<hr />
{/*
			<h2> Example 13. second demo with React Router</h2>
			<div>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<AfricanData  />} >
						</Route>
					</Routes>
				</BrowserRouter>
			</div>
			<hr />			
*/}			
		</div>
	);

}

const Example1 = (props) => {
	return <h1>{props.messageFromFunctionCaller}</h1>;
}

const Example2 = ({ messageFromFunctionCaller }) => {
	return <h1>{messageFromFunctionCaller}</h1>;
}

const Example3 = ({ messageFromFunctionCaller }) =>
	<h1>{messageFromFunctionCaller}</h1>;


const Example4 = () => {
	const fixedMessage = "This is a fixed message from Example4. You can''t interact with me";
	return <h1>{fixedMessage}</h1>
}

const Example5 = () => {
	const initialMessage = 'This is an initial message from Example5, but you can change me using the input box below';
	const [message, setMessage] = useState(initialMessage);
	return (
		<div>
			<pre>{initialMessage}</pre>
			<h1>{message}</h1>
			<input
				type="text"
				value={message}
				onChange={event => setMessage(event.target.value)}
			/>
		</div>
	);
}

const Example6 = () => {
	const initialMessage = 'This is an initial message from Example6, but you can change me using the input box below. I behave like Example5 but the underlying code is different';
	const [message, setMessage] = useState(initialMessage);

	const methodToHandleMessageEvent = (event) => {
		setMessage(event.target.value);
	};

	return (
		<div>
			<pre>{initialMessage}</pre>
			<h1>{message}</h1>
			<input
				type="text"
				value={message}
				onChange={methodToHandleMessageEvent}
			/>
		</div>
	);
}

const Example7 = () => {
	const initialMessage = '[FROM Example7] I behave like Example5 and Example6 but demonstrate use of function pointers, properties and state in code';
	const [message, setMessage] = useState(initialMessage);

	const methodToHandleMessageEvent = (event) => {
		setMessage(event.target.value);
	};

	return (
		<Example7a initialMessage={initialMessage} message={message} onMessageChange={methodToHandleMessageEvent} />
	);
}


const Example7a = ({ initialMessage, message, onMessageChange }) => {
	return (
		<div>
			<pre>{initialMessage}</pre>
			<h1>{message}</h1>
			<input
				type="text"
				value={message}
				onChange={onMessageChange}
			/>
		</div>
	);
}

const Example8 = () => {
	//	const initialCount = +localStorage.getItem('storageCount') || 0;
	const initialCount = 0;
	const [count, setCount] = useState(initialCount);

	const handleIncrement = () => setCount(count => count + 1);

	const handleDecrement = () => setCount(count => count - 1);

	useEffect(() => setCount(count => count + 1), []);

	return (
		<div>
			<h1>{count}</h1>

			<button type="button" onClick={handleIncrement}>
				Increment
			</button>
			<button type="button" onClick={handleDecrement}>
				Decrement
			</button>
		</div>
	);
}


export default App;