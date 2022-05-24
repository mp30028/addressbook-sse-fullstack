import React, {Component} from 'react';

class OtherName extends Component{
	GET_OTHER_NAME_BY_ID_API_PATH = (personId) => `/api/persons/other-names/by-person-id/${personId}`;
	EVENT_SOURCE_API_PATH = "/sse/persons/other-names/by-person-id/${personId}";
	API_SERVER_URL_BASE = process.env.REACT_APP_API_SERVER_URL_BASE;
	
	eventSource = new EventSource(this.API_SERVER_URL_BASE + this.EVENT_SOURCE_API_PATH);
	
	constructor(props){
		super(props); //props.personId to be provided to initialise
		this.setState({otherName: null});
	}

	updateState = (eventData) =>{
		let otherName = eventData = JSON.parse(eventData).otherName;
		this.setState({otherName: otherName});
	};
	
	async componentDidMount(){
		const response = await fetch(this.GET_OTHER_NAME_BY_ID_API_PATH(this.props.personId), {mode: "no-cors"});
		const body = await response.json();
		this.setState({otherName: body});
		this.eventSource.onmessage = (e) => {
			this.updateState(e.data);
		};
	};
	
	
	render(){
		return(
			<div>
				{	
					this.state.otherNames.map( otherName =>
						<div style={{width: "100%"}}>
							<span style={{width: "50%"}}>{otherName.value}</span>
							<span style={{width: "50%"}}>{otherName.otherNameType.value}</span>
						</div>
					)
				}
			</div>
		)
	}
};

export default OtherName;