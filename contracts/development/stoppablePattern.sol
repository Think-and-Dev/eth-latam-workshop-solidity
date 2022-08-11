//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract StoppablePattern { 
  address public owner;
  bool public contractStopped = false;

    modifier haltInEmergency { 
        require(!contractStopped);
        _;   
    }

    modifier enableInEmergency { 
        require(contractStopped); 
        _; 
    }
    
    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    constructor(address _owner){
        require(_owner != address(0), "OWNER CAN NOT BE NULL");
        owner = _owner;
    }

    function toggleContractStopped() public onlyOwner { 
        contractStopped = !contractStopped; 
    }

    function deposit() public payable haltInEmergency { 
        // some code 
    }

    function withdraw() public haltInEmergency{
        //some code
    }

    function emergencyWithdraw() public view enableInEmergency { 
        // some code 
    }  
}
