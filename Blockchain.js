var Block = require('./Block');

class Blockchain
{
  constructor()
  {
    this.chain = {};
    this.previousHash = null;
    this.addBlock("Genesis Block");
  }

  addBlock(data)
  {
    var block = new Block(data,this.previousHash);
    var Hash = block.hash;
    this.previousHash = Hash;
    this.chain[Hash] = block;
  }

  get()
  {
    return this.chain;
  }

}

module.exports = Blockchain;
