import React from 'react';

function OtherNames(props){
		console.log(props.otherNames);
		return(
			<div style={{width: "100%"}}>
				<table>
					<tbody>
						{props.otherNames.map(otherName =>
							<tr key={otherName.id}>
								<td style={{ width: "50%" }}>{otherName.value}</td>
								<td style={{ width: "50%" }}>{otherName.otherNameType.value}</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		);
};

export default OtherNames;