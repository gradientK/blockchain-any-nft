// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./Base64.sol";

/**
 * @title NFT Gram Smart Contract
 * @notice Smart contract to mint, buy & sell NFT
 * Metadata represented in image and description on-chain. 
 * The initial owner is set by the deployer.
 * Owner and author of contract is not liable for any real world loss due to use or misuse.
 */
contract NFTGram {

    // Contract vars
    address payable private contractOwner;
    bool paused;

    // mint count
    uint256 private totalMintable;
    uint256 private mintedCount;

    // Price & fees
    uint256 private priceMin; // minimum price for nft sale, wei
    uint256 private royalty; // percentage, ex. 3 is 3%

    // Nft metadata
    struct NFT {
        uint256 tokenId;
        address payable owner;
        uint256 price; // wei
        uint256 saleIndex; // index in saleList[], [0] means not for sale
        bool exists; // true upon creation
        string name;
        string description;
        string image; // URI location
    }

    // Key: NFT id, value: NFT metadata
    mapping (uint256 => NFT) private nftMap;

    // Key: owner, value: list of owned NFTs by id
    mapping(address => uint256[]) private ownershipMap;

    // List of all nfts for sale
    uint256[] private saleList;

    // Minted
    event Minted(address indexed minter, string indexed tokenId);

    // Paused/Unpaused contract transactions
    event Paused();
    event Unpaused();

    // Transfer of nft ownership
    event Transferred(address indexed from, address indexed to, string indexed tokenId);

    // Transfer of contract ownership
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * Constructor, init contract variables.
     */
    constructor() {
        paused = false;
        saleList.push(0); // init array[0] not for sale
        contractOwner = payable(msg.sender);
        totalMintable = 100000000;
        mintedCount = 0;
        priceMin = 1000;
        royalty = 3;
    }

    /**
     * Mint function. _salePrice of 0 will infer not for sale.
     */
    function mintNFT(string calldata _name, string calldata _description, string calldata _image, uint256 _salePrice) public returns (uint256) {
        require(!paused, "Contract minting temporarily paused for maintenance");
        require(mintedCount < totalMintable, "Cannot mint, total NFTs allowed by contract reached");
        require(bytes(_name).length < 128, "Name is too long, should be less than 128 characters");
        require(bytes(_description).length < 512, "Description is too long, should be less than 512 characters");
        require(bytes(_image).length < 512, "Description is too long, should be less than 512 characters");

        uint256 tokenId = mintedCount + 1;

        uint256 newIndex = 0; // 0 is not for sale
        if (_salePrice > 0) {
            require(priceMin <= _salePrice, "Sale price must meet minimum, increase");
            newIndex = saleList.length; // ex. length 3 is [0,1,2]
            saleList.push(tokenId); // ex. push to array 3, [0,1,2,3]
        }

        nftMap[tokenId] = NFT({
            tokenId: tokenId,
            owner: payable(msg.sender),
            price: _salePrice,
            saleIndex: newIndex,
            exists: true, // true upon creation
            name: _name,
            description: _description,
            image: _image
        });

        mintedCount++;
        ownershipMap[msg.sender].push(tokenId);
        
        emit Minted(msg.sender, Strings.toString(tokenId));

        if (nftMap[tokenId].exists) {
            return tokenId;
        } else {
            return 0;
        }
    }

    /**
     * Get nft sale price.
     */
    function getSalePrice(uint256 _tokenId) public view returns (uint256) {
        require(nftMap[_tokenId].exists, "NFT not found");
        require(nftMap[_tokenId].saleIndex != 0, "NFT is not for sale");
        return nftMap[_tokenId].price;
    }

    /**
     * Get if is for sale.
     */
    function getIsForSale(uint256 _tokenId) public view returns (bool) {
        require(nftMap[_tokenId].exists, "NFT not found");
        if (nftMap[_tokenId].saleIndex == 0) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Get nft owner.
     */
    function getOwner(uint256 _tokenId) public view returns (address) {
        require(nftMap[_tokenId].exists, "NFT not found");
        return nftMap[_tokenId].owner;
    }

    /**
     * Get nft, return array.
     */
    function getNFT(uint256 _tokenId) public view returns (uint256, address, uint256, uint256, string memory, string memory, string memory) {
        require(nftMap[_tokenId].exists, "NFT not found");
        return (nftMap[_tokenId].tokenId, nftMap[_tokenId].owner, nftMap[_tokenId].price, nftMap[_tokenId].saleIndex, nftMap[_tokenId].name, nftMap[_tokenId].description, nftMap[_tokenId].image);
    }

    /**
     * Get nft, return base64 string.
     */
    function getNFTBase64(uint256 _tokenId) public view returns (string memory) {
        require(nftMap[_tokenId].exists, "NFT not found");
        
        string memory currentPrice = Strings.toString(nftMap[_tokenId].price);
        string memory currentSaleIndex = Strings.toString(nftMap[_tokenId].saleIndex);
        return string(abi.encodePacked('data:application/json;base64,', Base64.encode(bytes(abi.encodePacked(
            '{"tokenId":"', 
            nftMap[_tokenId].tokenId,
            '", "owner": "', 
            nftMap[_tokenId].owner,
            '", "price": "', 
            currentPrice,
            '", "saleIndex": "', 
            currentSaleIndex,
            '", "name": "', 
            nftMap[_tokenId].name,
            '", "description": "', 
            nftMap[_tokenId].description,
            '", "image": "', 
            nftMap[_tokenId].image,
            '"}')))));
    }

    /**
     * Get nft metadata, return array
     */
    function tokenURIArray(uint256 _tokenId) public view returns (string memory, string memory, string memory, uint256) {
        require(nftMap[_tokenId].exists, "NFT not found");

        return (nftMap[_tokenId].name, nftMap[_tokenId].description, nftMap[_tokenId].image, nftMap[_tokenId].price);
    }
    
    /**
     * Get nft metadata, return base64 string.
     */
    function tokenURI(uint256 _tokenId) public view returns (string memory) {
        require(nftMap[_tokenId].exists, "NFT not found");
    
        string memory currentPrice = Strings.toString(nftMap[_tokenId].price); 
        return string(abi.encodePacked('data:application/json;base64,', Base64.encode(bytes(abi.encodePacked(
            '{"name":"', 
            nftMap[_tokenId].name,
            '", "description":"', 
            nftMap[_tokenId].description,
            '", "image": "', 
            nftMap[_tokenId].image,
            '", "price": "', 
            currentPrice,
            '"}')))));
    }

    /**
     * Get nft by owner.
     */
    function getNftsOwned() public view returns (uint256[] memory) {
        return ownershipMap[msg.sender];
    }

    /**
     * Get token ID by index in saleList.
     */
    function getForSaleByIndex(uint256 _index) public view returns (uint256) {
        require(_index != 0, "No NFT located in index 0, start at 1");
        require(_index < saleList.length, "Invalid index provided, not enough NFTs for sale");
        // gave up on making a dynamic sized array, waiting for Solidity update
        return saleList[_index];
    }

    /**
     * Get token IDs in saleList by groups of ten.
     * @param _groupOfTen 1 = get 1-10; 2 = get 11-20, 3 = get 21-30, etc.
     */
    function getForSaleByTens(uint256 _groupOfTen) public view returns (uint256[] memory){
        require(_groupOfTen != 0, "Groups of ten start at 1");
        uint256 endIndex = _groupOfTen * 10;
        uint256 startIndex = endIndex - 9;
        
        uint256[] memory tenOnSale = new uint256[](10);
        uint16 tmp = 0;
        for (uint256 i = startIndex; i <= endIndex; i++) {
            if (i < saleList.length) {
                tenOnSale[tmp] = saleList[i];
                tmp++;
            }
        }
        return tenOnSale;
    }

    /**
     * Get data for 5 nfts.
     */
    function getFiveNFTs(uint256 _id1, uint256 _id2, uint256 _id3, uint256 _id4, uint256 _id5) 
            public view returns (uint256[] memory, uint256[] memory, string[] memory, string[] memory) {
        require(nftMap[_id1].exists, "All 5 NFTs not found");
        require(nftMap[_id2].exists, "All 5 NFTs not found");
        require(nftMap[_id3].exists, "All 5 NFTs not found");
        require(nftMap[_id4].exists, "All 5 NFTs not found");
        require(nftMap[_id5].exists, "All 5 NFTs not found");

        uint256[] memory tokens = new uint256[](5);
        uint256[] memory prices = new uint256[](5);
        string[] memory names = new string[](5);
        string[] memory locations = new string[](5);

        tokens[0] = _id1;
        tokens[1] = _id2;
        tokens[2] = _id3;
        tokens[3] = _id4;
        tokens[4] = _id5;

        for (uint16 i = 0; i < 5; i++) {
            prices[i] = nftMap[tokens[i]].price;
            names[i] = nftMap[tokens[i]].name;
            locations[i] = nftMap[tokens[i]].image;
        }

        return (tokens, prices, names, locations);
    }

    /**
     * Get total number of nfts for sale.
     */
    function getTotalForSale() public view returns (uint256) {
        return saleList.length - 1;
    }

    /**
     * Update nft state to for sale. royalty fee subtracted during sale.
     */
    function listForSale(uint256 _tokenId, uint256 _salePrice) external returns (bool) {
        require(!paused, "Contract transactions temporarily paused for maintenance");
        require(nftMap[_tokenId].exists, "NFT not found.");
        require(nftMap[_tokenId].owner == msg.sender, "You are not the owner of the NFT");
        require(nftMap[_tokenId].saleIndex == 0, "NFT is already listed as for sale");
        require(priceMin <= _salePrice, "Sale price must meet minimum, increase");

        nftMap[_tokenId].saleIndex = saleList.length; // ex. [0,1,2] is length 3
        saleList.push(_tokenId); // ex. push to array[3], [0,1,2,3]

        nftMap[_tokenId].price = _salePrice;
        return true;
    }

    /**
     * Update nft state to no longer for sale.
     */
    function delistForSale(uint256 _tokenId) external returns (bool) {
        require(!paused, "Contract transactions temporarily paused for maintenance");
        require(nftMap[_tokenId].exists, "NFT not found.");
        require(nftMap[_tokenId].owner == msg.sender, "You are not the owner of the NFT");

        removeForSaleData(_tokenId);
        return true;
    }

    /**
     * Transfer nft, update to no longer for sale.
     */
    function purchaseNFT(uint256 _tokenId) external payable returns (bool) {
        require(!paused, "Contract transactions temporarily paused for maintenance");
        require (nftMap[_tokenId].exists, "NFT not found");
        require(nftMap[_tokenId].owner != msg.sender, "You already own this NFT");
        require(nftMap[_tokenId].saleIndex != 0, "NFT is not listed for sale");

        uint256 fee = calculateRoyalty(nftMap[_tokenId].price);
        require(nftMap[_tokenId].price + fee < msg.value, "Buyer does not have enough to purchase NFT");
        
        address payable seller = nftMap[_tokenId].owner;
        // seller pays royalty fee x1
        transferFunds(seller, nftMap[_tokenId].price - fee);

        // update ownershipMap
        removeOwnership(_tokenId, nftMap[_tokenId].owner);
        ownershipMap[msg.sender].push(_tokenId);

        // update nft and saleList
        nftMap[_tokenId].owner = payable(msg.sender);
        removeForSaleData(_tokenId);
        
        // buyer pays royalty fee x1
        transferFunds(contractOwner, fee * 2);

        emit Transferred(seller, msg.sender, Strings.toString(_tokenId));
        return true;
    }

    /**
     * Remove NFT.
     */
    function burnNFT(uint256 _tokenId) external returns (bool) {
        require(!paused, "Contract nft burning temporarily paused for maintenance");
        require (nftMap[_tokenId].exists, "NFT not found");
        require(nftMap[_tokenId].owner == msg.sender, "You are not the owner of the NFT");

        if (nftMap[_tokenId].saleIndex != 0) {
            removeForSaleData(_tokenId); // saleList
        }
        removeOwnership(_tokenId, msg.sender);            
        
        delete nftMap[_tokenId];
        return true;
    }

    // ******** Helper Functions ********

    /**
     * Send payment. call returns a boolean value indicating success or failure.
     */
    function transferFunds(address payable _to, uint256 _amount) public returns (bytes memory) {
        (bool sent, bytes memory data) = _to.call{value: _amount}("");
        require(sent, "Failed to send payment");
        return data;
    }

    /**
     * Calculate royalty, _price in wei.
     */
    function calculateRoyalty(uint256 _price) private view returns (uint256) {
        return (_price * royalty) / 100;
    }

    /**
     * Remove and reorganize for sale state from structures.
     */
    function removeForSaleData(uint256 _tokenId) private {
        require (nftMap[_tokenId].saleIndex != 0, "NFT not for sale to remove");
        uint256 oldIndex = nftMap[_tokenId].saleIndex;
        uint256 moveIndex = saleList.length - 1;

        saleList[oldIndex] = saleList[moveIndex]; // move before popping
        saleList.pop();

        nftMap[_tokenId].price = 0;
        nftMap[_tokenId].saleIndex = 0;
    }

    /**
     * Remove nft from owner map.
     */
    function removeOwnership(uint256 _tokenId, address _owner) private returns (bool) {
        bool removed = false;
        for(uint256 i = 0; i < ownershipMap[_owner].length; i++) {
            // string storage currId = ownershipMap[_owner][i];
            if (keccak256(abi.encodePacked(ownershipMap[_owner][i])) == keccak256(abi.encodePacked(_tokenId))) {
                ownershipMap[_owner][i] = ownershipMap[_owner][ownershipMap[_owner].length - 1];
                ownershipMap[_owner].pop();
                removed = true;
                break;
            }
        } 
        return removed;
    }

    // ******** Contract Ownership ********

    /**
     * Get contract owner, if owner.
     */
    function getContractOwner() external view returns (address) {
        return contractOwner;
    }

    /**
     * Transfer contract owner, only callable by current owner.
     */
    function transferContractOwner(address payable _newOwner) external {
        require(contractOwner == msg.sender, "Only owner may transfer contract");
        address oldOwner = contractOwner;
        contractOwner = _newOwner;
        emit OwnershipTransferred(oldOwner, _newOwner);
    }

    /**
     * Pause contract transactions.
     */
    function pause() external returns (bool) {
        require(contractOwner == msg.sender, "Only owner may pause contract");
        require(!paused, "Contract already paused");
        paused = true;
        emit Paused();
        return paused;
    }

    /**
     * Unpause contract transactions.
     */
    function unpause() external returns (bool) {
        require(contractOwner == msg.sender, "Only owner may unpause contract");
        require(paused, "Contract already unpaused");
        paused = false;
        emit Unpaused();
        return paused;
    }

    /**
     * Get royalty.
     */
    function getRoyalty() external view returns (uint256) {
        require(contractOwner == msg.sender, "Only owner may view Royalty");
        return royalty;
    }

    /**
     * Update royalty percentage.
     */
    function updateRoyalty(uint256 _newRoyalty) external {
        require(contractOwner == msg.sender, "Only owner may update Royalty");
        royalty = _newRoyalty;
    }

    /**
     * Get number of NFTs minted in contract.
     */
    function getTotalMinted() external view returns (uint256) {
        return mintedCount;
    }

    /**
     * Get total number of NFTs mintable within contract.
     */
    function getTotalMintable() external view returns (uint256) {
        require(contractOwner == msg.sender, "Only owner may view mintable allowed");
        return totalMintable;
    }

    /**
     * Increase total number of NFTs mintable within contract.
     */
    function increaseTotalMintable(uint256 _increaseAmount) external returns (uint256) {
        require(contractOwner == msg.sender, "Only owner may increase mintable allowed");
        totalMintable += _increaseAmount;
        return totalMintable;
    }

}
