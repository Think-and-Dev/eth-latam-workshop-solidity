// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract VariablesPacking {

    struct RegistroSinPacking {
        address variableA;
        address variableB;
        uint96  variableC;
        uint96  variableD;
    }
    /**
        variableA = 20/32 bytes --> SLOT 1 = 20bytes
        variableB = 20/32 bytes --> SLOT 2 = 20 bytes
        variableC = 12/32 bytes --> SLOT 2 = 20 + 12 = 32 bytes
        variableD = 12/32 bytes --> SLOT 3 = 12 bytes
    TOTAL = 3 SLOTS
    */

    struct RegistroConPacking {
        address variableA;
        uint96  variableC;
        address variableB;
        uint96  variableD;
    }

    /**
        variableA = 20/32 bytes --> SLOT 1 = 20bytes
        variableC = 12/32 bytes --> SLOT 1 = 20 + 12 = 32 bytes
        variableB = 20/32 bytes --> SLOT 2 = 20 bytes
        variableD = 12/32 bytes --> SLOT 2 = 20 + 12 bytes = 32 bytes
    ¡ TOTAL = 2 SLOTS ! 
     */

}