
async function FetchAllPersons(props) {

	const response = await fetch(props.apiPath, { mode: "no-cors" });
	const json = await response.json();
	props.stateSetter({ persons: json });
	props.stateSetter({isDataInitialised: true})
};

export default FetchAllPersons;