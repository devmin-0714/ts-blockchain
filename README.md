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

### 2. First steps with Typescript

파라미터에 `?`를 붙이면 파라미터를 옵션으로 사용할 수 있다.

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
