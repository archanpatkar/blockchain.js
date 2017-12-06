const print = require('./Print');
const Blockchain = require('./Blockchain');

var b = new Blockchain();

b.addBlock(1);
b.addBlock(2);
b.addBlock(3);

print(b.get())

for(var block of b.getBlocks())
{
  print(block)
}
