var b = "Rishabh";
var c = "Rawat";
var temp = `First Name = ${b} and Last Name = ${c}`;
console.log(temp);
console.log(b.length + c.length);
console.log(b.lastIndexOf("h"));
console.log(b.slice(1, 4));
console.log(b.substring(1, 4));
console.log(b.substr(2, 4));

var updated = b.replace("Ris", "Tis");
console.log(updated);

var ch = c.charCodeAt(1);
console.log(ch);