
async function FetchAllPersons() {
	let apiPath = "/api/persons/get-all";
	let fetchResult = { persons: [], isDataInitialised: false }

	const response = await fetch(apiPath, { mode: "no-cors" });
	const json = await response.json();
	fetchResult.persons = json;
	fetchResult.isDataInitialised = true;
	console.log(`[FetchAllPersons] fetchResult = ${JSON.stringify(fetchResult)}`);
	return fetchResult;
};

export default FetchAllPersons;