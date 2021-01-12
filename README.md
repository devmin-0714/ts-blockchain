# ts-blockchain

[강의 링크](https://www.youtube.com/watch?v=7wAhwv2Rbxw&list=PLAIAppF7linDYmY78NgUIlE9Qv-j4z0wU&index=1)
[소스 코드](https://github.com/devpark0714/ts-blockchain)

### 간단한 블록체인을 만들어 보며 타입스크립트를 배워보는 강의

자바스크립트로 컴파일이 가능하며 언어가 예측가능하고 읽기 쉬운 코드로 자바스크립트를 사용가능

### 블록체인

각 블록에는 해시값을 가지고 있으며 각 블록이 체이닝을 이루고 있다.

***

## 1. Setting TypeScript Up

`$ yarn init -y`
`$ yarn global add typescript`

### tsconfig.json

typescript가 어떻게 javascript로 변환할지 옵션을 설정

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

***

## 2. First steps with Typescript

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

***

## 3. Types in Typescript

```js
const sayHi = (name: string, age: number, gender: string): string => {
  return `Hello ${name}, you are ${age}, your gender is ${gender}`;
};

// const sayHi: (name: string, age: number, gender: string) => string
console.log(sayHi("Nicolas", 24, "male"));

export {};
```

### 1) TSC watch

매번 tsc 명령어를 통해 ts파일을 js파일로 컴파일 하던 것을 자동으로 해준다.
`$ yarn add tsc-watch --dev`

```js
// package.json

"scripts": {
    "start": "tsc-watch --onSuccess \" node dist/index.js\" "
    }
```

### 2) dist

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

### 3) 오류

타입스크립트를 작성하기 위해 필요
오류 : `"Cannot find module 'typescript/bin/tsc"`
해결 : `$ npm install typescript --save-dev`

## 4. Interfaces on Typescript

### 겍체를 인자로 넘길때 interfact를 이용

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

***

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

***

## 6. Blockchain Creating a Block

### 블록 구조 만들기

```js
class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;
    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
        }
}

const genesisBlock: Block = new Block(0, '7412667', '', 'Hello', 123456);

// `blockchain`은 오직 `Block`에 관련된 것만 추가된다.
const blockchainn: Block[] = [genesisBlock];

console.log(blockchain);

export {};
```

***

## 7. Creating a Block

### 새 블록 만들기

해쉬값을 암호화하는 라이브러리
`$ yarn add crypto-js`

```js
import * as CryptoJS from "crypto-js";

class Block {
  // 클래스가 생성되지 않아도 호출할 수 있는 method
  // index.js에서 클래스의 바깥에 나타난다.
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
}

const genesisBlock: Block = new Block(0, "7412667", "", "Hello", 123456);

const blockchain: Block[] = [genesisBlock];

// 블록체인의 길이를 알기 위해
const getBlockchain = (): Block[] => blockchain;

// 가장 최근의 블록
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

export {};
```

***

## 8. Validating Block Structure

```js
import * as CryptoJS from "crypto-js";

class Block {
  // 타입 체크
  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
}

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimestamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );
  // 새로운 블록을 만들때 블록체인에 추가
  addBlock(newBlock);
  return newBlock;
};

// 블록의 해쉬 얻기
const getHashforBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timestamp,
    aBlock.data
  );

// 블록체인의 기반은 블록들이 자신의 전 블록으로 링크가 되있기 때문에
// cadidate 블럭과 previous 블럭을 비교가 필요
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

// 블록체인에 블록을 추가
const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);
/* [
  Block {
    index: 0,
    hash: '7412667',
    previousHash: '',
    data: 'Hello',
    timestamp: 123456
  },
  Block {
    index: 1,
    hash: '685619eeffd544173c3aba38c72cedb09236da037bf6745bf17a66bd02934a15',
    previousHash: '7412667',
    data: 'second block',
    timestamp: 1610462771
  },
  Block {
    index: 2,
    hash: 'ffb63d0c98b6cd2688e3441e06fbe023332dd297134842059627c5cb7638f66f',
    previousHash: '685619eeffd544173c3aba38c72cedb09236da037bf6745bf17a66bd02934a15',
    data: 'third block',
    timestamp: 1610462771
  },
  Block {
    index: 3,
    hash: '7d958c9f4dbec239a28559ccd2f80606d054d580f38d2b75d87f5a904d1208a5',
    previousHash: 'ffb63d0c98b6cd2688e3441e06fbe023332dd297134842059627c5cb7638f66f',
    data: 'fourth block',
    timestamp: 1610462771
  }
]
*/

export {};
```
