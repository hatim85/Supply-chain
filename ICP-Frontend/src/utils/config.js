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

// TokenRewards deployed to: 0x7F555dB484Cd60dbDBC4BdDcCCF15Addf232BBC3
// RewardPenalty deployed to: 0x685aF160cDe8f785C5363cB2e4a50fD9B5D94676
// PharmaChain deployed to: 0x64427Fb138Bc773E12ee875F9470D375cD1955Ec
// Drug deployed to: 0x67FCa62c658a56d5Cf087239626b60e5E74Fbb18
// Batch deployed to: 0xb7DB91D55212C907C196b0A32Ae39259e6B55CC4
// IoT deployed to: 0xFA24da4A74aBcD8171AA2Fbd9895e80270ECC8A5
// Hospital deployed to: 0x901732aCD559263cf7498B0710d5dD61ABaCFfFA
// Manufacturer deployed to: 0xe6E313a1162042e55c9B0f14a72C0d99901f7632
// Wholesaler deployed to: 0x28680a4a3287361c558D6e917b8810A953bFa615
// Distributor deployed to: 0xCC46f1F6068852CDc65E8Dc56660e9513b161066

export const CONTRACT_ADDRESSES = {
    tokenRewards: "0x7F555dB484Cd60dbDBC4BdDcCCF15Addf232BBC3",
    rewardPenalty: "0x685aF160cDe8f785C5363cB2e4a50fD9B5D94676",
    pharmaChain: "0x64427Fb138Bc773E12ee875F9470D375cD1955Ec",
    drug: "0x67FCa62c658a56d5Cf087239626b60e5E74Fbb18",
    batch: "0xb7DB91D55212C907C196b0A32Ae39259e6B55CC4",
    iot: "0xFA24da4A74aBcD8171AA2Fbd9895e80270ECC8A5",
    hospital: "0x901732aCD559263cf7498B0710d5dD61ABaCFfFA",
    manufacturer: "0xBac55D78D3c43b949c3B82AB74e75b2cae579506",
    wholesaler: "0x991c5Cded504cEB18FEC7CB33f0d057D9071266c",
    distributor: "0xCC46f1F6068852CDc65E8Dc56660e9513b161066",
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
