// config.js
import TokenRewardsABI from "./abis/TokenRewards";
import RewardPenaltyABI from "./abis/RewardPenalty";
import PharmaChainABI from "./abis/PharmaChain";
import DrugABI from "./abis/Drug";
import BatchABI from "./abis/Batch";
import IoTABI from "./abis/IoT";
import HospitalABI from "./abis/Hospital";
import ManufacturerABI from "./abis/Manufacturer";
import WholesalerABI from "./abis/Wholesaler";
import DistributorABI from "./abis/Distributor";

export const CONTRACT_ADDRESSES = {
    tokenRewards: "0x8464135c8F25Da09e49BC8782676a84730C318bC",
    rewardPenalty: "0x71C95911E9a5D330f4D621842EC243EE1343292e",
    pharmaChain: "0x948B3c65b89DF0B4894ABE91E6D02FE579834F8F",
    drug: "0x712516e61C8B383dF4A63CFe83d7701Bce54B03e",
    batch: "0xbCF26943C0197d2eE0E5D05c716Be60cc2761508",
    iot: "0x59F2f1fCfE2474fD5F0b9BA1E73ca90b143Eb8d0",
    hospital: "0xC6bA8C3233eCF65B761049ef63466945c362EdD2",
    manufacturer: "0x1275D096B9DBf2347bD2a131Fb6BDaB0B4882487",
    wholesaler: "0x05Aa229Aec102f78CE0E852A812a388F076Aa555",
    distributor: "0x0b48aF34f4c854F5ae1A3D587da471FeA45bAD52",
};

export const CONTRACT_ABIS = {
    tokenRewards: TokenRewardsABI,
    rewardPenalty: RewardPenaltyABI,
    pharmaChain: PharmaChainABI,
    drug: DrugABI,
    batch: BatchABI,
    iot: IoTABI,
    hospital: HospitalABI,
    manufacturer: ManufacturerABI,
    wholesaler: WholesalerABI,
    distributor: DistributorABI,
};
