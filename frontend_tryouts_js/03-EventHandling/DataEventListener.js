//const EventSource = require('eventsource');

export function DataEventListener(props){
	let eventSource = null;
	
	const shutdownEventSource = () =>{
		if (props.isListening) {
			if (eventSource) {
				eventSource.close();
				console.log(`[setUp]eventSource.close() invoked. eventSource.readyState = ${eventSource.readyState}`);
				eventSource = null;
			}
		};		
	}
		
	const setup = () =>{
		shutdownEventSource();
		eventSource = new EventSource(props.sseUrl);
		console.log(`[setUp] Setting up onmessage handler`);
		eventSource.onmessage = (e) => {
			console.log(`[EventListener-message] Event ${JSON.stringify(e)} triggered and handled by eventSource.onmessage handler`);
			props.handler({event: e, state: props.state, stateSetter: props.stateSetter });
			
		};
		props.isListening = true;				
	}
	
	setup();

}

export default DataEventListener;