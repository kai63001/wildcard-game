var fs = require('fs');

async function main() {
    const MyContact = await ethers.getContractFactory("WileCard");
    const myContact = await MyContact.deploy();
  
    var obj = {
        "address": myContact.address
    }
    await fs.writeFileSync('deploy.json', JSON.stringify(obj), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    console.log("My Contract deployed to : ", myContact.address);
    await myContact.mintNFT(["https://bafybeibhhfvs4fz47l6piman2ek4uywriswdl5c2llm7c7s6hlzk5rfh3y.ipfs.infura-ipfs.io/"])
    // console.log(await myContact.mint(["https://bafybeibhhfvs4fz47l6piman2ek4uywriswdl5c2llm7c7s6hlzk5rfh3y.ipfs.infura-ipfs.io/"]));
  }
  
  main().then(()=>process.exit(0)).catch(error => {
      console.error(error);
      process.exit(1);
  });