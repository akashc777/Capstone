var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            for (let i = 1; i <= 10; i++) {
            await this.contract.mint(account_one, i, {from: account_one});
            }
        });

        it('should return total supply', async function () { 
            //await this.contract.mint(account_one, 99, {from: account_one});
            let totalSupply = await this.contract.totalSupply({from: account_one});
            assert.equal(10, totalSupply, "Total supply does not match");
        });

        it('should get token balance', async function () { 
            let tokenBalance = await this.contract.balanceOf(account_one);
            assert.equal(10, tokenBalance, "Token balance does not match");
            
        });

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI(1);
            assert.equal("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", tokenURI, "Invalid token URI");
            
        });

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_one, account_two, 1, {from: account_one});
            let tokenOwner = await this.contract.ownerOf(1);
            assert.equal(account_two, tokenOwner, 'Owner doest not match');
        });
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        });

        it('should fail when minting when address is not contract owner', async function () { 
            let flag = 0;
            try {
                await this.contract.mint(account_two, 1, {from: account_two});  
            }catch(e){
                flag = 1;
            }
            assert.equal(flag, 1, "Able to mint the coin by other users");
            
        });

        it('should return contract owner', async function () { 
            let contractOwner = await this.contract.getOwner();
            assert.equal(contractOwner, account_one, "Owner has been changed !");
        });

    });
})