// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract StoppablePattern is Owned { 
  bool public contractStopped = false;
    modifier haltInEmergency { 
        require(contractStopped);
        _;   
    }

    modifier enableInEmergency { 
        require(!contractStopped); 
        _; 
    }

    function toggleContractStopped() public onlyOwner { 
        contractStopped = !contractStopped; 
    }

    function deposit() public payable haltInEmergency { 
        // some code 
    }

    function withdraw() public view enableInEmergency { 
        // some code 
    }  
}
