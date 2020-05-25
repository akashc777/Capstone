var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const numOriginalTokens = 10;

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
            assert.equal(numOriginalTokens, totalSupply, "Total supply does not match");
        });

        it('should get token balance', async function () { 
            
        });

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            
        });

        it('should transfer token from one owner to another', async function () { 
            
        });
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            
        })

        it('should return contract owner', async function () { 
            
        })

    });
})