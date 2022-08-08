// SPDX-License-Identifier: UNLICENSED

import "@openzeppelin/contracts/security/Pausable.sol";

pragma solidity ^0.8.9;

contract OzStoppablePattern is Pausable { 

    function deposit() public payable whenNotPaused { 
        // some code 
    }

    function withdraw() public view { 
        // some code 
    }  

    function onlyPaused() public view whenPaused returns (bool) {
        return this.paused();
    }
}
