var cryptographer = require('crypto-js');

class Block
{
  constructor(data,previousHash)
  {
    this.timestamp = new Date().getTime();
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.getHash();
  }

  seal()
  {
    Object.seal(this);
    Object.freeze(this);
  }

  mine(difficulty)
  {
      console.log("Mining");
      while(!this.hash.startsWith("0".repeat(difficulty)))
      {
          this.nonce++;
          this.hash = this.getHash();
      }
  }

  getHash()
  {
      return cryptographer.SHA1(cryptographer.SHA3(this.getData()).toString()).toString();
  }

  getData()
  {
      return this.previousHash + this.timestamp + this.data + this.nonce
  }
}

module.exports = Block;
