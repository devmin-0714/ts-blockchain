# ts-blockchain

[강의 링크](https://www.youtube.com/watch?v=7wAhwv2Rbxw&list=PLAIAppF7linDYmY78NgUIlE9Qv-j4z0wU&index=1)

## 간단한 블록체인을 만들어 보며 타입스크립트를 배워보는 강의

자바스크립트로 컴파일
언어가 예측가능하고 읽기 쉬운 코드로 자바스크립트를 사용가능

## 1. Setting TypeScript Up

$ yarn init -y
$ yarn global add typescript

### tsconfig.json

typescript가 어떻게 javascript로 변환할지 옵션

```js
// tsconfig.json
{
    "compilerOptions": {
        "module": "CommonJS",
        "target": "ES6",
        "sourceMap": true
    },
    "include": ["index.ts"],
    // 어떤 파일들이 컴파일 과정에 포함되는지
    "exclude": ["node_modules"]
}
```

`$ tsc` : ts파일에 있는 코드를 컴파일해서 index.js와 index.js.map을 생성
(`$ sudo apt install node-typescript`)
-> `$ yarn start` 로 대체

```js
// package.json
"scripts": {
"prestart": "tsc",
"start": "node index.js"
}
```

## 2. First steps with Typescript

### 파라미터에 `?`를 붙이면 파라미터를 옵션으로 사용할 수 있다.

```js
const name = "Nicolas",
  age = 24,
  gender = "male";

const sayHi = (name, age, gender?) => {
  console.log(`Hello ${name}, you are ${age}, your gender is ${gender}`);
};

// const sayHi: (name: any, age: any, gender?: any) => void;
sayHi(name, age);

export {};
```

## 3. Types in Typescript

```js
const sayHi = (name: string, age: number, gender: string): string => {
  return `Hello ${name}, you are ${age}, your gender is ${gender}`;
};

// const sayHi: (name: string, age: number, gender: string) => string
console.log(sayHi("Nicolas", 24, "male"));

export {};
```

### TSC watch

매버 tsc 명령어를 통해 ts파일을 js파일로 컴파일 하는 것을 자동으로 해준다.
`$ yarn add tsc-watch --dev`

```js
// package.json

"scripts": {
    "start": "tsc-watch --onSuccess \" node dist/index.js\" "
    }
```

### dist

모든 컴파일된 것들은 dist 폴더로 들어간다.

```js
// tsconfig.json
{
    "compilerOptions": {
        "outDir": "dist"
    },
    "include": ["src/**/*"],
}
```

### 오류

"Cannot find module 'typescript/bin/tsc" 오류발생하여 npm install typescript --save-dev 로 해결

## 4. Interfaces on Typescript

### object를 인자로 넘길때 interfact를 이용

인터페이스는 자바스크립트로 컴파일 되지 않는다.

```js
interface Human {
  name: string;
  age: number;
  gender: string;
}

const person = {
  name: "nicolas",
  age: 22,
  gender: "male",
};

const sayHi = (person: Human): string => {
  return `Hello ${person.name},
    you are ${person.age},
    your gender is ${person.gender}!`;
};

console.log(sayHi(person));

export {};
```

## 5. Classes on Typescript

인터페이스는 자바스크립트로 컴파일되지 않지만, 클래스는 가능하다.
자바스크립트를 인터페이스로 사용하면 타입스크립트 측면에서 좀더 안전하다.
그러나, react, express 등을 사용할 때는 코드에서 클래스를 사용해야한다.

### public, private

private은 클래스 내부에서만 접근 가능

```js
class Human {
    public name: string;
    public age: number; // ex) private age: number
    public gender: string;
    constructor(name: string, age: number, gender: string) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

const lynn = new Human("Lynn", 18, "Female");

const sayHi = (person: Human): string => {
    return`Hello ${person.name},
    you are ${person.age}, // ex) error 발생
    your gender is ${person.gender}!`;
};

console.log(sayHi(lynn));

export {};

// index.js
class Human {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}
```
