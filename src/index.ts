const sayHi = (name:string, age:number, gender:string): string => {
    return `Hello ${name}, you are ${age}, your gender is ${gender}!`;
};

console.log(sayHi("Nicolas", 24, "male"));

export {};