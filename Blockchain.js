var Block = require('./Block');

class Blockchain
{
  constructor(difficulty = 4)
  {
    this.chain = new Map();
    this.previousHash = null;
    this.difficulty = difficulty;
    this.addBlock("Genesis Block");
  }

  addBlock(data)
  {
    var block =  new Block(data,this.previousHash);
    block.mine(this.difficulty);
    this.previousHash = block.hash;
    block.seal();
    this.chain.set(block.hash, block);
  }

  * getBlocks()
  {
    var lastBlock = this.chain.get(this.previousHash);
    for(var i = 0; i < this.chain.size; i++){
      if(lastBlock != undefined)
      {
        yield {block:lastBlock};
        lastBlock = this.chain.get(lastBlock.previousHash)
      }
    }
  }

}

module.exports = Blockchain;
