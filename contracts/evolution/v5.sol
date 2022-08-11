//SPDX-License-Identifier: MIT
pragma solidity =0.5.16;

contract LockV5 {
    uint public unlockTime;
    //var public a = unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) public payable {
        require(
            now < _unlockTime,
            "Unlock time should be in the future"
        );
        unlockTime = _unlockTime;
        owner = msg.sender;
    }

    function withdraw() public {
        require(now >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, now);

        owner.transfer(address(this).balance);
    }
}