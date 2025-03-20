const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Donkey42", (m)=>{
    const deployer = m.getAccount(0);

    const glasses = m.contract("Donkey42", [],{
        from: deployer,
    });

    return {glasses};
})