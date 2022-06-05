
let firstHello = "First Hello";

function outer(passedInParameter){
	let outer = "Hello from outer";
	function inner(input){
		console.log("outer", outer);
		console.log("input", input);
		console.log("passedInParameter", passedInParameter);
		console.log("firstHello", firstHello);
	}
	inner(passedInParameter);
}

outer(firstHello);