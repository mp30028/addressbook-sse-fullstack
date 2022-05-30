
export function DataEventListener(props){
	
	const shutdownEventSource = () =>{
		if (props.isListening) {
			if (props.eventSource) {
				props.eventSource.close();
				props.stateSetter({eventSource: null})
			}
			props.stateSetter({isListening: false});
		};		
	}
	
	const handler = (e) => {
		let eventData = JSON.parse(e.data);
		let person = eventData.source.person;
		let newPersons = [];
		if (eventData.source.eventType === 'UPDATE') {
			newPersons = props.persons.map(p => { return ((p.id === person.id) ? person : p) });
		} else if (eventData.source.eventType === 'CREATE') {
			newPersons = [...props.persons, person];
		} else if (eventData.source.eventType === 'DELETE') {
			newPersons = props.persons.filter((p) => { return (p.id === person.id ? null : p) })
		}
		props.stateSetter({ persons: newPersons });
		props.persons = newPersons;
	};
		
	const setup = () =>{
		shutdownEventSource();
		let eventSource = new EventSource(props.sseUrl);
		eventSource.onmessage = handler;
		props.stateSetter({eventSource: eventSource});
		props.stateSetter({isListening: true});			
	}
	
	setup();

}

export default DataEventListener;