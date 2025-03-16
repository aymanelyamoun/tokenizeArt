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
DONKEY_42 is a rare and exclusive collection of 42 digital artworks celebrating diversity and individuality. By using the ERC721 standard, it ensures that each token is unique and immutable, while also providing functionality for transferring, minting, and managing token ownership. The limited supply of DONKEY_42 ensures that each piece is a valuable and collectible item in the digital art world.



<!-- DONKEY_42 - ERC721 Token Documentation
Overview

Name: DONKEY_42
Ticker: D42
Total Supply: 42 NFTs
Standard: ERC721 (Non-Fungible Token)
Blockchain: Ethereum (or another compatible blockchain)
Symbol: D42

DONKEY_42 is a collection of 42 unique non-fungible tokens (NFTs) that represent artwork celebrating people with unique characteristics. Each token features a one-of-a-kind digital representation, capturing the essence of individuality and diversity. This collection has a fixed supply of 42 tokens, ensuring exclusivity and rarity.
Key Features
1. Unique Artwork Representation

Each DONKEY_42 token is a distinct digital artwork, representing characters with unique attributes. The characteristics may include different types of glasses, hairstyles, skin tones, and accessories, offering a diverse representation of personalities.
2. Limited Supply

The total supply is capped at 42 tokens, creating rarity and exclusivity for the collection. Once all tokens are minted, no additional tokens can be created, making each one extremely valuable.
3. ERC721 Compliance

The DONKEY_42 contract fully implements the ERC721 standard, allowing each token to be tracked and transferred as a unique asset. The contract ensures compatibility with Ethereum wallets, marketplaces, and other decentralized applications (dApps).
4. Smart Contract Functions

DONKEY_42 implements standard ERC721 functions along with custom methods for minting and transferring tokens. The functions are designed to allow token minting, transfers, and approvals while adhering to the ERC721 standard.
Minting

    Only the contract owner can mint new tokens.
    A new token is minted by calling the mint42() function, which assigns the token to a specified address with its unique metadata (stored via a token URI).
    The contract ensures that no more than 42 tokens can ever be minted.

Ownership and Provenance

    Ownership of each token is tracked on-chain, and each token has a unique identifier.
    The ownerOf() and balanceOf() functions allow users to verify ownership of tokens.

Metadata

Each token’s metadata, including its unique characteristics and an associated image, can be retrieved via the tokenURI() function. The metadata is stored off-chain but is linked to the blockchain through unique token IDs.
Contract Implementation

The contract follows the ERC721 and ERC721Metadata standards, with additional features to support minting and transferring of tokens.
Constructor

The contract initializes the token name (DONKEY_42), symbol (D42), and sets the contract owner to the account deploying the contract. The contract also defines the token supply range, starting from 1337, and ensures that only 42 tokens can be minted.

constructor() {
    _name = "DONKEY_42";
    _symbol = "D42";
    _contract_owner = msg.sender;
    _token_id_count = 1337;
    _max_supply_id = 1337 + 42;
}

Minting

The mint42() function allows the contract owner to mint tokens to a specified address. It ensures that only 42 tokens are minted, with the token URI being provided as an argument.

function mint42(address _to, string calldata _tokenURI) public _onlyContractOwner {
    require(_to != address(0), "the receiver address is not valid");
    require(_token_id_count < _max_supply_id, "No more tokens can be minted");
    _tokenURIs[_token_id_count] = _tokenURI;
    _owners[_token_id_count] = _to;
    _balances[_to] += 1;
    emit Transfer(_contract_owner, _to, _token_id_count);
    _token_id_count++;
}

Token URI

The metadata for each token can be accessed via the tokenURI() function. If no custom URI is set for the token, it defaults to an empty string.

function tokenURI(uint256 _tokenId) external view returns (string memory) {
    _requireOwned(_tokenId);
    string memory _tokenURI = _tokenURIs[_tokenId];
    if (bytes(_tokenURI).length > 0) {
        return _tokenURI;
    }
    return "";
}

Transfer Functions

The contract supports multiple transfer functions:

    safeTransferFrom: Safely transfers the token between owners, checking if the recipient is a smart contract that supports the onERC721Received function.
    transferFrom: Allows transferring tokens directly without the safety check for receiving contracts.

function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory data) external payable {
    _transferFrom(_from, _to, _tokenId);
    _checkOnERC721Received(_from, _to, _tokenId, data);
}

function transferFrom(address _from, address _to, uint256 _tokenId) external payable {
    _transferFrom(_from, _to, _tokenId);
}

Ownership and Approval

The contract allows the owner of an NFT to approve other addresses to transfer or manage the NFT on their behalf.

function approve(address _approved, uint256 _tokenId) external payable {
    address owner = _requireOwned(_tokenId);
    require(owner == msg.sender || isApprovedForAll(owner, msg.sender), "sender is not allowed to control the token");
    _tokenApprovals[_tokenId] = _approved;
    emit Approval(owner, _approved, _tokenId);
}

Support for ERC721 Interfaces

The contract implements multiple interfaces, including:

    IERC721: Standard ERC721 functions for token transfers, approvals, and ownership tracking.
    IERC721Metadata: Metadata functions to retrieve the name, symbol, and token URI for each token.
    ERC165: Interface detection for ERC721 compatibility.

function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
    return
        interfaceId == type(IERC721).interfaceId ||
        interfaceId == type(IERC721Metadata).interfaceId ||
        super.supportsInterface(interfaceId);
}

Conclusion

DONKEY_42 is a rare and exclusive collection of 42 digital artworks celebrating diversity and individuality. By using the ERC721 standard, it ensures that each token is unique and immutable, while also providing functionality for transferring, minting, and managing token ownership. The limited supply of DONKEY_42 ensures that each piece is a valuable and collectible item in the digital art world. -->

<!-- DONKEY_42 - ERC721 Token Documentation
Overview

Name: DONKEY_42
Ticker: D42
Total Supply: 42 NFTs
Standard: ERC721 (Non-Fungible Token)
Blockchain: Ethereum (or another compatible blockchain)
Symbol: D42

DONKEY_42 is a collection of 42 unique non-fungible tokens (NFTs) that represent artwork designed to showcase people with unique characteristics. Each token is a one-of-a-kind digital artwork symbolizing individuality, diversity, and identity.

The total supply is capped at 42 tokens, making each NFT a rare, valuable representation of distinct individuals or personalities.
Key Features
1. Unique Artwork Representation

Each DONKEY_42 token is a distinct digital artwork representing a character with a unique set of traits, features, or attributes. These artworks celebrate diversity by depicting characters with distinct and memorable characteristics, such as different styles of glasses, hair, skin tone, clothing, and more.
2. Limited Supply

Only 42 tokens will ever exist, ensuring rarity and exclusivity. The capped supply highlights the value and uniqueness of each NFT.
3. ERC721 Compliance

DONKEY_42 adheres to the ERC721 standard, ensuring compatibility with major Ethereum wallets, marketplaces, and other decentralized applications (dApps). Each token is indivisible and has a unique ID that makes it distinguishable from other tokens in the collection.
4. Ownership and Provenance

With each DONKEY_42 token, the owner can prove their possession of a unique piece of digital art through the blockchain. Each token is linked to its creator and previous owners, providing a transparent and immutable record of ownership (provenance).
5. Metadata and Attributes

Each DONKEY_42 token contains metadata that includes a description of the artwork, an image (typically a URL to the image or IPFS), and specific attributes related to the character's appearance or traits. These attributes could include:

    Glasses Type (e.g., round, square, futuristic, vintage)
    Hair Color/Style
    Skin Tone
    Clothing
    Special Features (e.g., tattoos, accessories, etc.)

6. Smart Contract Functions

The contract will include standard ERC721 functions, such as:

    mint(): Minting new tokens to a specific address.
    safeTransferFrom(): Safe transfer of tokens between owners.
    ownerOf(): Returns the owner of a specific token.
    getTokenURI(): Fetches metadata, such as the token’s image and attributes.
    approve() and setApprovalForAll(): Enable users to approve other addresses to manage their NFTs.
    totalSupply(): Returns the total number of tokens minted (in this case, 42).

Contract Details

The DONKEY_42 token is built on the Ethereum blockchain using the ERC721 standard. Below is a brief outline of the smart contract implementation.
Constructor

The constructor initializes the token name ("DONKEY_42") and ticker ("D42") and sets the total supply to a fixed value of 42. This ensures that no more than 42 tokens can ever be minted.

constructor() ERC721("DONKEY_42", "D42") {
    // Total supply is limited to 42
    totalSupply = 42;
    currentTokenId = 0;
}

Minting Process

Minting a new DONKEY_42 token will be available only through a special minting function, which will limit the supply to 42 tokens. Once all tokens are minted, the minting function will be disabled.

function mint(address to) public onlyOwner {
    require(currentTokenId < totalSupply, "All tokens have been minted.");
    _safeMint(to, currentTokenId);
    currentTokenId++;
}

Token URI

The metadata of each token (such as the image and attributes) is stored and retrievable through the tokenURI() function. This function will return the metadata, which is typically hosted on IPFS or another decentralized storage platform.

function _baseURI() internal view virtual override returns (string memory) {
    return "https://api.DONKEY_42.com/metadata/"; // Base URL for the metadata
}

Attributes

Each token’s metadata will include attributes that describe the unique features of the character it represents. The metadata can include information like glasses type, character traits, and any additional information about the artwork.

{
  "name": "DONKEY_42 #1",
  "description": "A character with round glasses, blonde hair, and a stylish outfit.",
  "image": "https://ipfs.io/ipfs/Qm12345.../1.png",
  "attributes": [
    { "trait_type": "Glasses Type", "value": "Round" },
    { "trait_type": "Hair Color", "value": "Blonde" },
    { "trait_type": "Clothing", "value": "Casual" }
  ]
}

Usage
Ownership

Once minted, each DONKEY_42 token can be transferred, sold, or traded on supported platforms, such as OpenSea, Rarible, or others that support ERC721 tokens. Owners will have full control over their token and can show off their unique, digital artwork.
Marketplaces

The DONKEY_42 collection is listed on various NFT marketplaces, where collectors and enthusiasts can browse and purchase their favorite characters. Users can view the artwork and its associated metadata on these platforms.
Future Enhancements

The future roadmap for DONKEY_42 may include features such as:

    Augmented Reality (AR) Integration: Enabling owners to view their DONKEY_42 character in augmented reality.
    Secondary Market Benefits: Providing exclusive perks or rewards for holders of DONKEY_42 tokens in the form of airdrops, exclusive content, or access to events.
    Collaboration with Artists: Expanding the collection through collaborations with other digital artists, offering new unique designs.

Conclusion

DONKEY_42 is a unique collection of 42 one-of-a-kind digital artworks celebrating diversity and individuality. Each token represents a character with distinct traits, promoting the concept of uniqueness in the digital art world. By combining art, blockchain technology, and the ERC721 standard, DONKEY_42 is set to become a rare and exclusive collection. -->



<!-- This document outlines the specifications and functionality of the DONKEY_42 ERC721 Non-Fungible Token (NFT) contract. This contract represents a collection of digital artworks depicting unique characters, each with distinctive glasses and other characteristics. The contract has a maximum capacity of 42 tokens. This is a contract implementation that adheres to the ERC721, ERC165, and ERC721Metadata interfaces.
Contract Details

# Contract Name: DONKEY_42
Symbol: GLS42
Maximum Supply: 42
Standard: ERC721 (Custom)
Blockchain: [Specify the blockchain, e.g., Ethereum]
Contract Address: [To be deployed and added later]

# Token Description

Each token in the DONKEY_42 collection represents a unique digital artwork depicting a character with distinct glasses and other unique traits.

Uniqueness: Every character is designed to be unique, with variations in appearance, glasses styles, and other characteristics.
Maximum Capacity: The contract has a maximum capacity of 42 tokens, ensuring a limited and potentially rare collection.
Artistic Representation: The tokens serve as digital representations of artistic creations, potentially including visual art, generative art, or other forms of digital expression.
Metadata: Each token is associated with metadata conforming to the ERC721 metadata standard. This metadata includes:
    name: The name of the character.
    description: A description of the character's appearance, personality, and backstory, with specific attention to their glasses.
    image: A link to the digital artwork representing the character.
    attributes: A list of key characteristics and traits of the character, particularly focusing on the style and features of their glasses.
 -->
