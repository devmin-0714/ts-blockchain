interface Human {
    name: string,
    age: number,
    gender: string
}

const person = {
    name: 'nicolas',
    age: 22,
    gender: 'male'
};

const sayHi = (person: Human): string => {
    return`Hello ${person.name},
    you are ${person.age},
    your gender is ${person.gender}!`;
};

console.log(sayHi(person));

export {};