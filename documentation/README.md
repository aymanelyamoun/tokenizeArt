# DONKEY_42 - ERC721 Token Documentation

## Overview

**Name:** DONKEY_42  
**Ticker:** D42  
**Total Supply:** 42 NFTs  
**Standard:** ERC721 (Non-Fungible Token)  
**Blockchain:** Ethereum
**Symbol:** D42  

DONKEY_42 is a collection of 42 unique non-fungible tokens (NFTs) that represents an artwork and is non-fungible, meaning each token is unique and cannot be replaced by another. The collection will feature artwork for Donkey representations of people with unique characteristics. This collection has a fixed supply of 42 tokens, ensuring exclusivity and rarity.

## Key Features

### 1. Unique Artwork Representation
Each DONKEY_42 token is a distinct digital artwork, representing characters with unique attributes. The characteristics may include different types of glasses, hairstyles, skin tones, and accessories, offering a diverse representation of personalities.

### 2. Limited Supply
The total supply is capped at 42 tokens, creating rarity and exclusivity for the collection. Once all tokens are minted, no additional tokens can be created, making each one extremely valuable.

### 3. ERC721 Compliance
The DONKEY_42 contract fully implements the ERC721 standard, allowing each token to be tracked and transferred as a unique asset. The contract ensures compatibility with Ethereum wallets, marketplaces, and other decentralized applications (dApps).

### 4. Smart Contract Functions
DONKEY_42 implements standard ERC721 functions along with custom methods for minting and transferring tokens. The functions are designed to allow token minting, transfers, and approvals while adhering to the ERC721 standard.

## Minting
- Only the contract owner can mint new tokens.
- A new token is minted by calling the `mint42()` function, which assigns the token to a specified address with its unique metadata (stored via a token URI).
- The contract ensures that no more than 42 tokens can ever be minted.

## Ownership and Provenance
- Ownership of each token is tracked on-chain, and each token has a unique identifier.
- The `ownerOf()` and `balanceOf()` functions allow users to verify ownership of tokens.

## Metadata
Each token’s metadata, including its unique characteristics and an associated image, can be retrieved via the `tokenURI()` function. The metadata is stored off-chain but is linked to the blockchain through unique token IDs.

Each NFT in the GLASSES_42 collection is represented by metadata stored off-chain and accessible via a URL. The metadata is stored using IPFS (InterPlanetary File System) to ensure decentralization and permanence. Below is an example metadata JSON structure:

```{
    "name": "aboudoun doncky 42",
    "description": "42 doncky glasses 1, is a beautiful doncky representation of aboudoun, aboudoun is a very pasionate C# developer, this is the first token in the series",
    "image": "https://ipfs.filebase.io/ipfs/QmUjQQQMtpMaw6wH5rKq8CgRXDNXp8Yr4xS3sgcSMQN5Wz",
    "attributes": [
        {
          "trait_type": "Artist",
          "value": "ael-yamo"
        },
        {
          "trait_type": "speciality",
          "value": "crying"
        }
    ]
}
```

The metadata includes:

Name: The title of the NFT.

Description: A brief summary of the artwork and its significance.

Image: A link to the image file stored on IPFS.

Attributes: Additional traits describing the NFT, such as the artist and specialty.

## Contract Implementation
The contract follows the ERC721 and ERC721Metadata standards, with additional features to support minting and transferring of tokens.

### Constructor
The contract initializes the token name (DONKEY_42), symbol (D42), and sets the contract owner to the account deploying the contract. The contract also defines the token supply range, starting from 1337, and ensures that only 42 tokens can be minted.
```solidity
constructor() {
    _name = "DONKEY_42";
    _symbol = "D42";
    _contract_owner = msg.sender;
    _token_id_count = 1337;
    _max_supply_id = 1337 + 42;
}
```

### Minting
The `mint42()` function allows the contract owner to mint tokens to a specified address. It ensures that only 42 tokens are minted, with the token URI being provided as an argument.
```solidity
function mint42(address _to, string calldata _tokenURI) public _onlyContractOwner {
    require(_to != address(0), "the receiver address is not valid");
    require(_token_id_count < _max_supply_id, "No more tokens can be minted");
    _tokenURIs[_token_id_count] = _tokenURI;
    _owners[_token_id_count] = _to;
    _balances[_to] += 1;
    emit Transfer(_contract_owner, _to, _token_id_count);
    _token_id_count++;
}
```

### Token URI
The metadata for each token can be accessed via the `tokenURI()` function. If no custom URI is set for the token, it defaults to an empty string.
```solidity
function tokenURI(uint256 _tokenId) external view returns (string memory) {
    _requireOwned(_tokenId);
    string memory _tokenURI = _tokenURIs[_tokenId];
    if (bytes(_tokenURI).length > 0) {
        return _tokenURI;
    }
    return "";
}
```

### Transfer Functions
The contract supports multiple transfer functions:
- `safeTransferFrom`: Safely transfers the token between owners, checking if the recipient is a smart contract that supports the `onERC721Received` function.
- `transferFrom`: Allows transferring tokens directly without the safety check for receiving contracts.
```solidity
function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory data) external payable {
    _transferFrom(_from, _to, _tokenId);
    _checkOnERC721Received(_from, _to, _tokenId, data);
}

function transferFrom(address _from, address _to, uint256 _tokenId) external payable {
    _transferFrom(_from, _to, _tokenId);
}
```

### Ownership and Approval
The contract allows the owner of an NFT to approve other addresses to transfer or manage the NFT on their behalf.
```solidity
function approve(address _approved, uint256 _tokenId) external payable {
    address owner = _requireOwned(_tokenId);
    require(owner == msg.sender || isApprovedForAll(owner, msg.sender), "sender is not allowed to control the token");
    _tokenApprovals[_tokenId] = _approved;
    emit Approval(owner, _approved, _tokenId);
}
```

## Support for ERC721 Interfaces
The contract implements multiple interfaces, including:
- `IERC721`: Standard ERC721 functions for token transfers, approvals, and ownership tracking.
- `IERC721Metadata`: Metadata functions to retrieve the name, symbol, and token URI for each token.
- `ERC165`: Interface detection for ERC721 compatibility.
```solidity
function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
    return
        interfaceId == type(IERC721).interfaceId ||
        interfaceId == type(IERC721Metadata).interfaceId ||
        super.supportsInterface(interfaceId);
}
```

## Conclusion
DONKEY_42 is a rare and exclusive collection of 42 digital artworks. By using the ERC721 standard, it ensures that each token is unique and immutable, while also providing functionality for transferring, minting, and managing token ownership. The limited supply of DONKEY_42 ensures that each piece is a valuable and collectible item in the digital art world.
