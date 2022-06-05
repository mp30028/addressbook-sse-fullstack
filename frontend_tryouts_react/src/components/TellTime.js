import React, { useState } from 'react';

const  TellTime = () =>{
	
	const formatNumber = (n) =>{
		let formattedNumberAsString = n.toString().padStart(2, '0');
		return formattedNumberAsString;
	}
		
	const  currentTime = () => {
		const today = new Date();
		const date = today.getFullYear() + '-' + formatNumber(today.getMonth() + 1) + '-' + formatNumber(today.getDate());
		const time = formatNumber(today.getHours()) + ":" + formatNumber(today.getMinutes()) + ":" + formatNumber(today.getSeconds());
		return  date + ' ' + time;
	}
	
	const refreshTime = () => {
			setDisplayedTime(currentTime());
	}

	const buttonOnClick = () => {
		refreshTime();
	}
	
	const [displayedTime, setDisplayedTime] = useState(currentTime(),[]);
	
	return(
		<div>
			<h1>
				{displayedTime}
			</h1>
			<button onClick={buttonOnClick}>
				Refresh
			</button>
		</div>

	);
}

export default TellTime;