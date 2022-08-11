// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ReasonStrings {
    uint256 balance; 
    uint256 amount; 

    modifier badReasonString {
        require(balance >= amount, "To whomsoever it may concern. I am writing this error message to let you know that the amount you are trying to transfer is unfortunately more than your current balance. Perhaps you made a typo or you are just trying to be a hacker boi. In any case, this transaction is going to revert. Please try again with a lower amount. Warm regards, EVM");
        _;
    }

    modifier goodReasonString {
        require(balance >= amount, "Insufficient balance");
    }

    modifier possibleOptionForLongStrings {
        require(balance >= amount, "CODE ERROR: 20, please refer to www....");
    }


}