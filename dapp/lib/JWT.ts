import jwt from "jsonwebtoken";
const privateKey = "justfortest";
import Cookies from 'js-cookie'

export const sign = (adress: string) => {
  console.log(adress);
  jwt.sign(
    { adress: adress },
    privateKey,
    { algorithm: "HS256" },
    function (err, token:any) {
      console.log(token);
      Cookies.set('token', token)
    }
  );
};


export const isAuth =  (token:string) => {
    if(token) {
        try {
            return jwt.verify(token, privateKey);
        } catch (error) {
            return null
        }
    }
    return null
};