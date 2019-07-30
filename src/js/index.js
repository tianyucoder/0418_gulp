import {add, mul} from './module1';
import {name, age} from './module2';

console.log(add(1, 2));
console.log(mul(1, 2))
console.log(name,age);

setTimeout(()=>{
	console.log(1)
},200);
