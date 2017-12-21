var Block = require('./Block');
var cryptographer = require('crypto-js');
var fs = require("fs");

class Blockchain
{
  constructor(difficulty = 4,uuid="")
  {
    if(uuid == "")
    {
      this.uuid =  cryptographer.SHA1(new Date().getTime() +  difficulty).toString();
    }
    this.chain = new Map();
    this.previousHash = null;
    this.difficulty = difficulty;
    this.addBlock("Genesis Block");
  }

  proofChain()
  {
    var chain = {};
    chain.uuid = this.uuid;
    chain.difficulty = this.difficulty;
    chain.previousHash = this.previousHash;
    chain.chain = {};
    var lastBlock = this.chain.get(this.previousHash);
    for(var i = 0; i < this.chain.size; i++){
      if(lastBlock != undefined)
      {
        chain.chain[lastBlock.hash] = lastBlock;
        lastBlock = this.chain.get(lastBlock.previousHash)
      }
    }
    return chain;
  }

  addBlock(data)
  {
    var block =  new Block(data,this.previousHash);
    block.mine(this.difficulty);
    this.previousHash = block.hash;
    block.seal();
    this.chain.set(block.hash, block);
    if(this.valid())
    {
      this.persist();
    }
    else
    {
      throw new Error("Blockchain Invalidated")
    }
  }

  valid()
  {
    var currentBlock = this.chain.get(this.previousHash);
    var lastBlock = this.chain.get(currentBlock.previousHash);
    for(var i = 0; i < this.chain.size; i++)
    {

      if(currentBlock !== undefined && lastBlock !== undefined)
      {
          if(currentBlock.hash != currentBlock.getHash())
          {
            return false;
          }

          if(currentBlock.previousHash != lastBlock.hash)
          {
            return false;
          }

          currentBlock = lastBlock;
          lastBlock = this.chain.get(currentBlock.previousHash);
      }
      else
      {
        break;
      }
    }
    return true;
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

  persist()
  {
    if (!fs.existsSync(`${__dirname}/data`)){
      fs.mkdirSync(`${__dirname}/data`);
    }
    fs.writeFileSync(`${__dirname}/data/${this.uuid}.chain`,JSON.stringify(this.proofChain(), null, 4))
  }

}

module.exports = Blockchain;