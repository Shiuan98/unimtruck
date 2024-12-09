// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract UnicornMilkTruck is ERC721Enumerable, Ownable {
    
    using Strings for uint256;
    string private _baseTokenURI;
    uint256 private price;
    uint256 public maxSupply = 10000;
    uint256 public maxMintAmount = 10;

    constructor(
        string memory _initBaseURI,
        uint256 _price
    ) ERC721("Unicorn Milk Truck", "UNIM-TRUCK") {
        setBaseURI(_initBaseURI);
        setPrice(_price);
    }

    // Mint a Truck
    function mintTruck(address _to, uint256 _mintAmount) public payable {
        require(msg.sender == tx.origin, "Caller is another contract.");
        require(_mintAmount <= maxMintAmount, "Max. 10 NFTs per transaction.");
        uint256 supply = totalSupply();
        require(supply + _mintAmount <= maxSupply, "Not enough token supply.");
        require(msg.value >= price * _mintAmount, "Transaction is underpriced.");
        for (uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(_to, supply + i);
        }
    }

    function _baseURI() internal view virtual override returns (string memory) {return _baseTokenURI;}

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId));
        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
            ? string(abi.encodePacked(currentBaseURI, tokenId.toString()))
            : "";
    }

    function isTruckHolder(address wallet) public view returns (bool) {
        return balanceOf(wallet) > 0;
    }

    function trucksOwnedByAddress(address wallet) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(wallet);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(wallet, i);
        }
        return tokenIds;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    function setPrice(uint256 _newPrice) public onlyOwner {
        price = _newPrice;
    }

    function withdraw() public payable onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0);
        require(payable(msg.sender).send(address(this).balance));
    }

    function withdrawERCToken(IERC20 token) public onlyOwner {
        uint256 tokenBalance = token.balanceOf(address(this));
        token.transfer(msg.sender, tokenBalance);
    }
}