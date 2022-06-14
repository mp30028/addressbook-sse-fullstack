import React from 'react';

function OtherNamesEdit(props){
		return(
			<div style={{width: "100%"}}>
				<table>
					<thead>
						<th style={{ width: "50%" }}>Other Name</th>
						<th style={{ width: "50%" }}>Type</th>
					</thead>
					<tbody>
						{props.otherNames ?
							props.otherNames.map(otherName =>
							<tr key={otherName.id}>
							
{/*							
								<td style={{ width: "50%" }}>{otherName.value}</td>
								<td style={{ width: "50%" }}>{otherName.otherNameType.value}</td>
							</tr>
							<tr>
*/}							
								<td><input type="text" name="otherNameValue" id="otherNameValue" value={otherName.value}/></td>
								<td><input type="text" name="otherNameType" id="otherNameType" value={otherName.otherNameType.value}/></td>
							</tr>
							
						):
						<tr>
							<td colSpan="2" style={{textAlign: "center"}}> -- No Other Names -- </td>
						</tr>
						}
					</tbody>
				</table>
			</div>
		);
};

export default OtherNamesEdit;