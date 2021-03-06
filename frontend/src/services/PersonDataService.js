

const MODULE = "MODULE:PersonDataService";
const ssePath = "/sse/addressbook";
const baseUrl = process.env.REACT_APP_API_SERVER_URL_BASE;
const apiPathToGetAll = "/api/persons/get-all";
const apiPathToOtherNameTypes = "/api/persons/other-name-types";
const apiPathToUpdate = "/api/persons/update";
const apiPathToDelete = "/api/persons/delete/{id}";
const apiPathToAddNew = "/api/persons/add-new";

export function GetAll(props) {
	const FUNCTION = " FUNCTION:GetAll";
	fetch(apiPathToGetAll, { mode: "no-cors" })
		.then((response) => response.json())
		.then((data) => { console.log(`[${MODULE} ${FUNCTION}] data.length=`, data.length); return data })
		.then((data) => { props.setData(data); return data });
}

export const ListenForDataEvents = (props) => {
	const FUNCTION = "FUNCTION: ListenForDataEvents";
	const messageHandler = (event) => {
		const ROUTINE = "ROUTINE:messageHandler";
		console.log(`${MODULE} ${FUNCTION} ${ROUTINE} event=`, event);
		const eventData = JSON.parse(event.data);
		const person = eventData.source.person;
		const eventType = eventData.source.eventType;
		props.setDataEvent({ person: person, eventType: eventType });
	};
	console.log(`${MODULE} ${FUNCTION}`);
	const eventSource = new EventSource(baseUrl + ssePath);
	eventSource.onmessage = messageHandler;
}

export const AddNew = (props) => {
	const FUNCTION = "FUNCTION: AddNew";
	console.log(`${MODULE} ${FUNCTION} props.sourcePerson=`, props.sourcePerson);
	const jsonString = JSON.stringify(props.sourcePerson, null, "    ");
	console.log(`${MODULE} ${FUNCTION} sourcerPerson (as-string)=`, jsonString);
	fetch(
		apiPathToAddNew,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Accept': 'application/json, text/plain'
			},
			body: jsonString
		}
	)
}

export const Delete = (props) => {
	const FUNCTION = "FUNCTION:Delete";
	console.log(`${MODULE} ${FUNCTION} props.sourcePerson=`, props.sourcePerson);
	fetch(
		apiPathToDelete.replace("{id}", props.sourcePerson.id),
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Accept': 'application/json, text/plain'
			}
		}
	)
}

export const Update = (props) => {
	const FUNCTION = "FUNCTION:Update";
	console.log(`${MODULE} ${FUNCTION} props.sourcePerson=`, props.sourcePerson);
	const jsonString = JSON.stringify(props.sourcePerson, null, "    ");
	console.log(`${MODULE} ${FUNCTION} sourcerPerson (json) = `, jsonString);
	fetch(
		apiPathToUpdate,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Accept': 'application/json, text/plain'
			},
			body: jsonString
		}
	)
}

export const GetOtherNameTypes = (props) =>{
	const FUNCTION = " FUNCTION:GetOtherNameTypes";
	fetch(apiPathToOtherNameTypes, { mode: "no-cors" })
		.then((response) => response.json())
		.then((data) => {console.log(`[${MODULE} ${FUNCTION}] data.length=`, data.length);return data})
		.then((data) => {props.setOtherNameTypes(data); return data});
}	