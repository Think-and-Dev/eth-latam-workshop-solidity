//SPDX-License-Identifier: MIT
pragma solidity =0.4.20;

contract LockV4 {
    uint public unlockTime;
    //var public a = unlockTime;
    address public owner;

    event Withdrawal(uint amount, uint when);

    function LockV4(uint _unlockTime) public payable {
        require(now < _unlockTime);
        unlockTime = _unlockTime;
        owner = msg.sender;
    }

    function withdraw() public {
        require(now >= unlockTime);
        require(msg.sender == owner);

        Withdrawal(address(this).balance, now);

        owner.transfer(address(this).balance);
    }
}