const print = require('./Print');
const Blockchain = require('./Blockchain');

var b = new Blockchain();

b.addBlock(1);
b.addBlock(2);
b.addBlock(3);
b.addBlock(4);

for(var block of b.getBlocks())
{
  print(block);
}
