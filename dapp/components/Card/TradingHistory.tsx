import { useEffect, useState } from "react";
import dayjs from "@/lib/dayjs";
import React from "react";
import deploy from "../../../deploy.json";

const TradingHistory = (props: any) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    const data = await fetch(
      `https://api.covalenthq.com/v1/97/tokens/${deploy.address}/nft_transactions/${props.tokenId}/?&key=ckey_08290dd811f54239a7d5ac20831`
    );
    const res = await data.json();
    setHistory(res.data.items[0].nft_transactions);
    console.log(res.data.items[0].nft_transactions);
  };

  const getEventCalue = (event: any) => {
    if (
      event.log_events[0].decoded.params[0].value ==
      "0x0000000000000000000000000000000000000000"
    ) {
      return "Mint";
    }
    if (
      event.log_events[0].decoded.params[1].value.toUpperCase() ==
      deploy.address.toUpperCase()
    ) {
      return "List";
    }
    if (
      event.log_events[0].decoded.params[0].value.toUpperCase() ==
        deploy.address.toUpperCase() &&
      event.value != 0
    ) {
      return "Sell";
    }
    if (
      event.log_events[0].decoded.params[0].value.toUpperCase() ==
      //@ts-ignore
      deploy.owner.toUpperCase()
    ) {
      return "Random";
    }
    return "Tranfer";
  };

  const toAddressReturn = (address: any) => {
    if (address.toUpperCase() == deploy.address.toUpperCase()) {
      return "Market";
    }
    //@ts-ignore
    if (address.toUpperCase() == deploy.owner.toUpperCase()) {
      return "Box";
    }
    return address;
  };

  const fromAddressReturn = (address: any) => {
    if (
      address.toUpperCase() ==
      "0x0000000000000000000000000000000000000000".toUpperCase()
    ) {
      return "Some Where";
    }
    if (address.toUpperCase() == deploy.address.toUpperCase()) {
      return "Market";
    }
    //@ts-ignore
    if (address.toUpperCase() == deploy.owner.toUpperCase()) {
      return "Box";
    }
    return address;
  };

  return (
    <div className="mt-2">
      <h2 className="text-xl">Trading History</h2>
      <div className="grid grid-cols-5 gap-4 mt-2 p-3 bg-gray-900 rounded-md">
        <div className="">Event</div>
        <div className="">Price</div>
        <div className="">From</div>
        <div className="">To</div>
        <div className="">Date</div>
        {history.length <= 0 ? (
          <>
            <div className="bg-gray-300 h-3 rounded-md w-2/3 animate-pulse"></div>
            <div className="bg-gray-300 h-3 rounded-md w-2/3 animate-pulse"></div>
            <div className="bg-gray-300 h-3 rounded-md w-2/3 animate-pulse"></div>
            <div className="bg-gray-300 h-3 rounded-md w-2/3 animate-pulse"></div>
            <div className="bg-gray-300 h-3 rounded-md w-2/3 animate-pulse"></div>
          </>
        ) : (
          history.map((item: any, index: any) => {
            return (
              <React.Fragment key={index}>
                <div className="">{getEventCalue(item)}</div>
                <div className="">{item.value / 10 ** 18} BNB</div>
                <div className="text-ellipsis overflow-hidden">
                  {fromAddressReturn(
                    item.log_events[0].decoded.params[0].value
                  )}
                </div>
                <div className="text-ellipsis overflow-hidden">
                  {toAddressReturn(item.log_events[0].decoded.params[1].value)}
                </div>
                <div className="">
                  {
                    //@ts-ignore
                    dayjs().to(Date.parse(item.block_signed_at))
                  }
                </div>
              </React.Fragment>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TradingHistory;
