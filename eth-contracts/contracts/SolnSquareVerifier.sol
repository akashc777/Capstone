pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./ERC721Mintable.sol";
import "./Verifier.sol";


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token,Verifier  {


    // TODO define a solutions struct that can hold an index & an address
    struct solutions {
        bytes32 index;
        address solAddress;
    }



    // TODO define an array of the above struct
    solutions[] sol;


    // TODO define a mapping to store unique solutions submitted
     mapping(bytes32 => solutions) private uniqueSolutions;



    // TODO Create an event to emit when a solution is added
    event SolutionAdded(address sol);



    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(uint256[2] memory a, uint256[2][2]  memory b, uint256[2] memory c, uint256[2] memory inputs) public {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, inputs));
        solutions memory s = solutions(key, msg.sender);
        sol.push(s);
        uniqueSolutions[key] = s;

        emit SolutionAdded(s.solAddress);
    }



    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintSq(address to, uint256 tokenId, uint256[2] memory a, uint256[2][2]  memory b, uint256[2] memory c, uint256[2] memory inputs) public {
        require(Verifier.verifyTx(a, b, c, inputs));
        bytes32 key = keccak256(abi.encodePacked(a, b, c, inputs));
        require(uniqueSolutions[key].index == 0);
        super.mint(to, tokenId);
    }

}




  


























