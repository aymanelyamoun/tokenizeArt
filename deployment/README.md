# install dependencies
```
npm install
```

# copy the contrcts from code
```
cp -r ../code/contracts ./contracts
```

# deploy to the moonbase alpha testnet
```
npx hardhat ignition deploy ./ignition/modules/glassesNFT.js --network moonbase
```

# verify the contract
```
npx hardhat ignition verify chain-1287
```
