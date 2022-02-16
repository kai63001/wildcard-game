var fs = require("fs");

async function main() {
  const MyContact = await ethers.getContractFactory("WileCard");
  const myContact = await MyContact.deploy();

  console.log("My Contract deployed to : ", myContact.address);
  await myContact.mintNFT([
    "https://ipfs.infura.io/ipfs/QmbQySU8yJ6eQTKWWPEQkKGxyZnsCBNkn4o7mMfPUGSSqN",
    "https://ipfs.infura.io/ipfs/QmdWzoMzRfq1UA3gfBy8kGo3KYAnwZE3b3d3ikeCyyPpdK",
    "https://ipfs.infura.io/ipfs/QmdUKNnv8VKdJHe5v1FNu6f4R18zAXF9NJFDyYm8wrqJ4u",
    "https://ipfs.infura.io/ipfs/QmbQySU8yJ6eQTKWWPEQkKGxyZnsCBNkn4o7mMfPUGSSqN",
    "https://ipfs.infura.io/ipfs/QmdWzoMzRfq1UA3gfBy8kGo3KYAnwZE3b3d3ikeCyyPpdK",
    "https://ipfs.infura.io/ipfs/QmdUKNnv8VKdJHe5v1FNu6f4R18zAXF9NJFDyYm8wrqJ4u",
    "https://ipfs.infura.io/ipfs/QmbQySU8yJ6eQTKWWPEQkKGxyZnsCBNkn4o7mMfPUGSSqN",
    "https://ipfs.infura.io/ipfs/QmdWzoMzRfq1UA3gfBy8kGo3KYAnwZE3b3d3ikeCyyPpdK",
    "https://ipfs.infura.io/ipfs/QmdUKNnv8VKdJHe5v1FNu6f4R18zAXF9NJFDyYm8wrqJ4u",
  ]);
  const owner = await myContact.Owner();
  var obj = {
    address: myContact.address,
    owner: owner
  };
  await fs.writeFileSync("deploy.json", JSON.stringify(obj), function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
