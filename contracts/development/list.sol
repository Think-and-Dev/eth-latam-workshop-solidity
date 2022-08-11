//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract List {
   
    struct UserData  {
        address userAddr;
        uint96 score;
    }

    UserData [] public userDataList;
    mapping(address => uint256) userInfoList;

    event Initialized();
    event Add(address user,uint96 score, address who);
    event Remove(address user, address who);

    constructor(address[] memory _userAddresses, uint96[] memory _scores) {
        uint256 length = _userAddresses.length;
        for(uint256 i = 0; i < length; i++){
            /**
            Add values
             */
            userDataList.push(
                UserData({
                    userAddr: _userAddresses[i],
                    score: _scores[i]
                })
            );
            /**
            * Set that the user info is located in that position
             */
            userInfoList[_userAddresses[i]] = userDataList.length;
        }
        emit Initialized();
    }

    function listLength() external view returns(uint256){
        return userDataList.length;
    }

    function add(address _userAddress, uint96 _score) public {
        userDataList.push(
            UserData({
                userAddr: _userAddress,
                score: _score
            })
        );
        userInfoList[_userAddress] = userDataList.length;

        emit Add(_userAddress,_score,msg.sender);
    }

    function remove(address _userAddress) public {
        uint256 index = userInfoList[_userAddress] - 1;
        /*Make the replacement */
        userDataList[index] = userDataList[userDataList.length - 1];
        userDataList.pop();
        /*MARKS THE ADDRESS WITH A ZERO INDICATING IT HAS NO SCORE*/
        userInfoList[_userAddress] = 0;
        emit Remove(_userAddress, msg.sender);
    }

}
