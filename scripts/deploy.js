var fs = require("fs");

async function main() {
  const MyContact = await ethers.getContractFactory("WileCard");
  const myContact = await MyContact.deploy();

  console.log("My Contract deployed to : ", myContact.address);
  await myContact.mintNFT([
    "https://ipfs.infura.io/ipfs/QmPfaA5bQn6uUwU5pDtBS44pFxZb5ECcRehG858hnRo1i8",
    "https://ipfs.infura.io/ipfs/QmNushQVe6o6vBLscoFnfrRd5ek4vt8XvyZJKmumZ5MsVc",
    "https://ipfs.infura.io/ipfs/QmQs2o1wtbG35i1z2sCdV1QPAmBk34PwEKccJXSoS5QNpy",
    "https://ipfs.infura.io/ipfs/QmQEKbmAu9JB5LMjs7MdfyrmVH7bwCcZDDdVWmoNGY7RhX",
    "https://ipfs.infura.io/ipfs/QmTkcz4AAWCNQYvwm7qgtAr5BBgiykE9fmyCRL7ErGcHv3",
    "https://ipfs.infura.io/ipfs/QmPfaA5bQn6uUwU5pDtBS44pFxZb5ECcRehG858hnRo1i8",
    "https://ipfs.infura.io/ipfs/QmNushQVe6o6vBLscoFnfrRd5ek4vt8XvyZJKmumZ5MsVc",
    "https://ipfs.infura.io/ipfs/QmQs2o1wtbG35i1z2sCdV1QPAmBk34PwEKccJXSoS5QNpy",
    "https://ipfs.infura.io/ipfs/QmQEKbmAu9JB5LMjs7MdfyrmVH7bwCcZDDdVWmoNGY7RhX",
    "https://ipfs.infura.io/ipfs/QmTkcz4AAWCNQYvwm7qgtAr5BBgiykE9fmyCRL7ErGcHv3",
    "https://ipfs.infura.io/ipfs/QmPfaA5bQn6uUwU5pDtBS44pFxZb5ECcRehG858hnRo1i8",
    "https://ipfs.infura.io/ipfs/QmNushQVe6o6vBLscoFnfrRd5ek4vt8XvyZJKmumZ5MsVc",
    "https://ipfs.infura.io/ipfs/QmQs2o1wtbG35i1z2sCdV1QPAmBk34PwEKccJXSoS5QNpy",
    "https://ipfs.infura.io/ipfs/QmQEKbmAu9JB5LMjs7MdfyrmVH7bwCcZDDdVWmoNGY7RhX",
    "https://ipfs.infura.io/ipfs/QmTkcz4AAWCNQYvwm7qgtAr5BBgiykE9fmyCRL7ErGcHv3",
    "https://ipfs.infura.io/ipfs/QmPfaA5bQn6uUwU5pDtBS44pFxZb5ECcRehG858hnRo1i8",
    "https://ipfs.infura.io/ipfs/QmNushQVe6o6vBLscoFnfrRd5ek4vt8XvyZJKmumZ5MsVc",
    "https://ipfs.infura.io/ipfs/QmQs2o1wtbG35i1z2sCdV1QPAmBk34PwEKccJXSoS5QNpy",
    "https://ipfs.infura.io/ipfs/QmQEKbmAu9JB5LMjs7MdfyrmVH7bwCcZDDdVWmoNGY7RhX",
    "https://ipfs.infura.io/ipfs/QmTkcz4AAWCNQYvwm7qgtAr5BBgiykE9fmyCRL7ErGcHv3",
    "https://ipfs.infura.io/ipfs/QmPfaA5bQn6uUwU5pDtBS44pFxZb5ECcRehG858hnRo1i8",
    "https://ipfs.infura.io/ipfs/QmNushQVe6o6vBLscoFnfrRd5ek4vt8XvyZJKmumZ5MsVc",
    "https://ipfs.infura.io/ipfs/QmQs2o1wtbG35i1z2sCdV1QPAmBk34PwEKccJXSoS5QNpy",
    "https://ipfs.infura.io/ipfs/QmQEKbmAu9JB5LMjs7MdfyrmVH7bwCcZDDdVWmoNGY7RhX",
    "https://ipfs.infura.io/ipfs/QmTkcz4AAWCNQYvwm7qgtAr5BBgiykE9fmyCRL7ErGcHv3",
    "https://ipfs.infura.io/ipfs/QmPfaA5bQn6uUwU5pDtBS44pFxZb5ECcRehG858hnRo1i8",
    "https://ipfs.infura.io/ipfs/QmNushQVe6o6vBLscoFnfrRd5ek4vt8XvyZJKmumZ5MsVc",
    "https://ipfs.infura.io/ipfs/QmQs2o1wtbG35i1z2sCdV1QPAmBk34PwEKccJXSoS5QNpy",
    "https://ipfs.infura.io/ipfs/QmQEKbmAu9JB5LMjs7MdfyrmVH7bwCcZDDdVWmoNGY7RhX",
    "https://ipfs.infura.io/ipfs/QmTkcz4AAWCNQYvwm7qgtAr5BBgiykE9fmyCRL7ErGcHv3",
    "https://ipfs.infura.io/ipfs/QmPfaA5bQn6uUwU5pDtBS44pFxZb5ECcRehG858hnRo1i8",
    "https://ipfs.infura.io/ipfs/QmNushQVe6o6vBLscoFnfrRd5ek4vt8XvyZJKmumZ5MsVc",
    "https://ipfs.infura.io/ipfs/QmQs2o1wtbG35i1z2sCdV1QPAmBk34PwEKccJXSoS5QNpy",
    "https://ipfs.infura.io/ipfs/QmQEKbmAu9JB5LMjs7MdfyrmVH7bwCcZDDdVWmoNGY7RhX",
    "https://ipfs.infura.io/ipfs/QmTkcz4AAWCNQYvwm7qgtAr5BBgiykE9fmyCRL7ErGcHv3",
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
