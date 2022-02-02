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
  }
  
  main().then(()=>process.exit(0)).catch(error => {
      console.error(error);
      process.exit(1);
  });