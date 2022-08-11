//SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface iLockV6 {
    function getOwner() external view returns(address);
    function getUnlockTime(address) external view returns(uint);
}

abstract contract  abstractLockV6 {
    function withdraw() public virtual;
}

contract LockV6 is iLockV6, abstractLockV6{
    uint public unlockTime;
    address payable private owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) public payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );
        unlockTime = _unlockTime;
        owner = msg.sender;
    }

    function getOwner() public view override returns(address){
        return owner;
    }

    function getUnlockTime(address _owner) public view override returns(uint){
        require(owner == _owner,"Only owner could ask for unlockTime");
        return unlockTime;
    }

    function withdraw() public override {
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }

}
