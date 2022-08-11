//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ReentrancyVictim {
    //Balance tracking
    mapping(address => uint256) public balances;

    //Declare events
    event Deposit(address indexed _from, uint256 _value);
    event Withdraw(address indexed _from, uint256 _value);

    // Allows the caller to add balance
    function getBalance(address _address) public view returns (uint256 balance) {
        balance = balances[_address];
    }

    // Allows the caller to add balance
    function payIn() public payable {
        emit Deposit(msg.sender, msg.value);
        balances[msg.sender] += msg.value;
    }

    // Withdraws the balance available to the caller
    function withdraw() public payable {
        require(balances[msg.sender] > 0, "Insufficient balance");
        emit Withdraw(msg.sender, balances[msg.sender]);
        (bool success, ) = payable(msg.sender).call{value: balances[msg.sender]}("");
        require(success, "Failed to send funds");
        balances[msg.sender] = 0;
    }

    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
