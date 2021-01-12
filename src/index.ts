import * as CryptoJS from 'crypto-js';

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    // 클래스가 생성되지 않아도 호출할 수 있는 method
    static calculateBlockHas = (
        index: number,
        previousHash: string,
        timestamp: number,
        data: string
    ): string => 
        CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

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

const blockchain: Block[] = [genesisBlock];

// 블록체인의 길이를 알기 위해
const getBlockchain = (): Block[] => blockchain;

// 가장 최근의 블록
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

export {};
