var cryptographer = require('crypto-js');

class Block
{
  constructor(data,previousHash)
  {
    this.timestamp = new Date().getTime();
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.getHash()
  }

  getHash()
  {
      return cryptographer.SHA1(cryptographer.SHA3(this.getData()).toString()).toString();
  }

  getData()
  {
      return this.previousHash + this.timestamp + this.data
  }
}

module.exports = Block;
