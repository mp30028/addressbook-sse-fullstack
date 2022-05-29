

export function	DataEventHandler(props){
	let eventData = JSON.parse(props.event.data);
	let person = eventData.source.person;
//	let state = props.state;
//	let setter = props.stateSetter;
		if (eventData.source.eventType === 'UPDATE') {
			props.stateSetter(props.state, props.state.persons.map(p => { return ((p.id === person.id) ? person : p) }));
		} else if (eventData.source.eventType === 'CREATE') {
			props.stateSetter(props.state, { persons: [...props.state.persons, person] });
		} else if (eventData.source.eventType === 'DELETE') {
			props.stateSetter(props.state, { persons: props.state.persons.filter(function(p) { return (p.id === person.id ? null : p) }) });
		}
	};
	
export default DataEventHandler;