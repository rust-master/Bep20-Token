pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Bep20Token is ERC20 {

    constructor() ERC20("Bep20Token", "Bep20") {
        _mint(msg.sender, 2000000 * 10** uint256(decimals()));
    }

}