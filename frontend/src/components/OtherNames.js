import React, {Component} from 'react';

class OtherNames extends Component{
	
	constructor(props){
		super(props);
		this.state= {otherNames: props.otherNames};
		console.log(props.otherNames);
	}

	render(){
		return(
			<div style={{width: "100%"}}>
				<table>
					<tbody>
						{this.state.otherNames.map(otherName =>
							<tr key={otherName.id}>
								<td style={{ width: "50%" }}>{otherName.value}</td>
								<td style={{ width: "50%" }}>{otherName.otherNameType.value}</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		)
	}
};

export default OtherNames;