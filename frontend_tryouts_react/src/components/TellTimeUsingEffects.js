import React, { useEffect, useState } from 'react';

const  TellTimeUsingEffects = () =>{
	
	const [displayedTime, setDisplayedTime] = useState(null);
	const [timeToRefresh, setTimeToRefresh] = useState(true);
	

		
	const buttonOnClick = () => {
		setTimeToRefresh(true);
	}
	
	useEffect(() => {		
		const currentTime = () => {
			const formatNumber = (n) => {
				let formattedNumberAsString = n.toString().padStart(2, '0');
				return formattedNumberAsString;
			};
			const today = new Date();
			const date = today.getFullYear() + '-' + formatNumber(today.getMonth() + 1) + '-' + formatNumber(today.getDate());
			const time = formatNumber(today.getHours()) + ":" + formatNumber(today.getMinutes()) + ":" + formatNumber(today.getSeconds());
			const returnValue = date + ' ' + time;
			console.log("[currentTime]", returnValue);
			return returnValue;
		};

		if(timeToRefresh){
			setDisplayedTime(currentTime());
			setTimeToRefresh(false);
		}
	},	
	[timeToRefresh]);
	
	
	
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

export default TellTimeUsingEffects;