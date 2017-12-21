const print = require('./Print');
const Blockchain = require('./Blockchain');

var b = new Blockchain(2);

b.addBlock(1);
b.addBlock(2);
b.addBlock(3);
b.addBlock(4);
b.addBlock(5);
b.addBlock(6);
b.addBlock(7);
b.addBlock(8);

for(var block of b.getBlocks())
{
  print(block);
}