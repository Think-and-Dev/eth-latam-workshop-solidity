//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract ReentrancyProtected {
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
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // Withdraws the balance available to the caller
    function withdraw() public payable {
        require(balances[msg.sender] > 0, "Insufficient balance");
        uint256 balance = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: balance}("");
        require(success, "Failed to send funds");
        emit Withdraw(msg.sender, balance);
    }

    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
