// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MisUseOfStorage {
    //Balances
    mapping(address => uint) s_balances;

    // Historico de transferencias
    mapping(address => uint256[]) s_transfers;

    function transfer(address payable receiver, uint256 amount) public payable{
        require(s_balances[address(this)]>= amount, "Not enough balance");
        
        transferBalance(address(this),receiver, amount);

        //SEND ETH
        (bool sent,) = receiver.call{value: amount}("");
        require(sent, "Failed to send Ether");

        //MAL USO DE STORAGE: GUARDO QUE LE ENVIE ETH
        s_transfers[receiver].push(amount);
    }

    function transferBalance(address from, address to, uint amount) internal{
        //Transfer code
    }

}







contract GoodUseOfStorage {
    //Balances
    mapping(address => uint) s_balances;

    //Transfer Event
    event Transfer(address indexed sender, address indexed receiver, uint256 amount);

    function transfer(address payable receiver, uint256 amount) public payable{
        require(s_balances[address(this)]>= amount, "Not enough balance");
        
        transferBalance(address(this),receiver, amount);

        //SEND ETH
        (bool sent,) = receiver.call{value: amount}("");
        require(sent, "Failed to send Ether");

        emit Transfer(address(this), receiver, amount);
    }

    function transferBalance(address from, address to, uint amount) internal{
        //Transfer code
    }

}