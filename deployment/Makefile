all:copy-contracts
	npx hardhat compile
	npx hardhat ignition deploy ./ignition/modules/glassesNFT.js --network moonbase
	npx hardhat ignition verify chain-1287

clean:
	npx hardhat clean

copy-contracts:
	cp -r ../code/contracts ./contracts