"use strict";
//watch file constantly tsc file -w
//tsc --init to create a typescript config file
//typescript files should be in the src
/*
const greeting: string = 'Hello';
const numbers: number[] = [1, 2, 3];
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const add = (a, b) => a + b;
let result = add(10, 20);
console.log(result);
app.get('/', (req, res, next) => {
    res.send('Hello');
});
app.listen(5000, () => {
    console.log("Server running");
});
