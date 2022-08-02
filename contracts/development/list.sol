// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract List {
    uint256 [] public list;
    mapping(uint256 => uint256) idList;

    event Initialized();
    event Add(uint256 number, address indexed who);
    event Remove(uint256 number, address indexed who);

    constructor(uint256[] memory values) {
        uint256 length = values.length;
        for(uint256 i = 0; i < length; i++){
            list.push(values[i])
            idList[values[i]] = list.length
        }
    }

    function listLength() external view returns(uint256){
        return list.length;
    }

    function add(uint256 value) public {
        list.push(value)
        idList[value] = list.length

        emit Add(value,msg.sender)
    }

    function remove(uint256 position) public {
        uint256 index = idList[position] - 1;

        list[index] = farmInfoList[farmInfoList.length - 1];
        farmInfoList.pop();
        farmIdList[_farmingAddr] = 0;
        emit RemoveFarm(_farmingAddr);
    }

}
