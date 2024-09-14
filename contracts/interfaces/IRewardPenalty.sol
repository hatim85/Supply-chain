// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
import "../library/Declarations.sol";

interface IRewardPenalty {
    function rewardParticipant(address participant, uint256 amount) external;
    function penalizeParticipant(address participant, uint256 amount) external;
    function rewardOnTimeDelivery(address participant) external;
    function penalizeLateDelivery(address participant) external;
    function recordTransaction(string memory qrCode, address from, address to, string memory status) external;
    function updateReputation(address participant, bool isSuccess) external;
}
