import { useEffect, useState } from "react";
import dayjs from "@/lib/dayjs"

const TradingHistory = (props: any) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    const data = await fetch(
      `https://api.covalenthq.com/v1/97/tokens/0x50B5BdBeaCeDe6AEB22d1C2b4A8A37a1A1FD71E9/nft_transactions/${props.tokenId}/?&key=ckey_08290dd811f54239a7d5ac20831`
    );
    const res = await data.json();
    setHistory(res.data.items[0].nft_transactions);
    console.log(res.data.items[0].nft_transactions);
  };

  return (
    <div className="mt-2">
      <h2 className="text-xl">Trading History</h2>
      <div className="grid grid-cols-5 gap-4 mt-2 p-2 bg-gray-900 rounded-md">
        <div className="">Event</div>
        <div className="">Price</div>
        <div className="">From</div>
        <div className="">To</div>
        <div className="">Date</div>
        {history.map((item: any, index: any) => {
          return (
            <>
              <div className="">Event</div>
              <div className="">{item.value / (10 ** 18)} BNB</div>
              <div className="text-ellipsis overflow-hidden">{item.log_events[0].decoded.params[0].value}</div>
              <div className="text-ellipsis overflow-hidden">{item.log_events[0].decoded.params[1].value}</div>
              <div className="">{dayjs().to(Date.parse(item.block_signed_at))}</div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default TradingHistory;
