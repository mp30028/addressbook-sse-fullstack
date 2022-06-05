import React, {useEffect} from 'react';

function FetchAllPersons(props) {
	
	let response = null;
	useEffect(() => {
		response = fetch(props.apiPath, { mode: "no-cors" });
	},[]);

	
useEffect(() => {
		const json = response.json();
		console.log("[FetchAllPersons]", "json=", json);
		props.setPersons(json);
		console.log("[FetchAllPersons - useEffect[response]]", "props.persons.length=", props.persons.length);
	}, [response]);
	
	useEffect(() => {
		props.setIsDataInitialised(true);
		console.log("[FetchAllPersons - useEffect[props.persons]]","props.isDataInitialised=", props.isDataInitialised, "props.persons.length=", props.persons.length )
	}, [props.persons])
	


return(true);

};

export default FetchAllPersons;