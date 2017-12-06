var Block = require('./Block');

class Blockchain
{
  constructor()
  {
    this.chain = new Map();
    this.previousHash = null;
    this.addBlock("Genesis Block");
  }

  addBlock(data)
  {
    var block =  new Block(data,this.previousHash);
    var Hash = block.hash;
    this.previousHash = Hash;
    this.chain.set(Hash, block);
  }

  * getBlocks()
  {
    var lastBlock = this.chain.get(this.previousHash);
    for(let i = 0; i < this.chain.size ; i++){
      yield {block:lastBlock};
      lastBlock = this.chain.get(lastBlock.previousHash)
    }
  }

  get()
  {
    return this.chain;
  }

}

module.exports = Blockchain;
