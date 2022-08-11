// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract LockV8 {
    uint256 public unlockTime;
    address payable public owner;

    event Withdrawal(uint256 amount, uint256 when);

    constructor(uint256 _unlockTime) payable {
        require(block.timestamp < _unlockTime, "Unlock time should be in the future");

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }

    function safeSub(uint256 a, uint256 b) external pure returns (uint256) {
        return a - b;
    }

    function unsafeSub(uint256 a, uint256 b) external pure returns (uint256) {
        unchecked {
            return a - b;
        }
    }

    function safeSubWithSafeMath(uint256 a, uint256 b) external pure returns (uint256) {
        return SafeMath.sub(a, b, "Unsafe sub attempt");
    }
}
