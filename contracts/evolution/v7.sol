//SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

contract LockV7 {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        /**
        THIS RESULTS IN ERROR
        require(
            now < _unlockTime,
            "Unlock time should be in the future
        )
         */
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = msg.sender;
    }
    
    function withdraw() public {
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
