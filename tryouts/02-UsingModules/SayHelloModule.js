

export function SayHello(name){
	let message = `Hello ${name} from SayHelloModule`;
	console.log(message);
	return message;
}

export default SayHello;