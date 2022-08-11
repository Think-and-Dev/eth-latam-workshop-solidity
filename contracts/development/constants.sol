// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract NoConstants {
    address public TOKEN;

    constructor (address _token){
        TOKEN = _token;
    }
}

contract Immutable {
    address public immutable TOKEN;

    constructor(address _token){
        TOKEN = _token;
    }
}

contract Constant {
    address public constant TOKEN = 0x153073310327caA6abB76F735d115E5c8bA1617B;

    constructor(){

    }

}