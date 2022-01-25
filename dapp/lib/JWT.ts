import jwt from "jsonwebtoken";
const privateKey = "justfortest";

export const sign = (adress: string) => {
  console.log(adress);
  jwt.sign(
    { adress: adress },
    privateKey,
    { algorithm: "HS256" },
    function (err, token) {
      console.log(token);
    }
  );
};
