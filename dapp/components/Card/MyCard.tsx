import Image from "next/image"

const Card = (props: any) => {
  return (
    <div>
      <div className="bg-white overflow-hidden rounded-md text-gray-900">
        <div className="bg-gray-300 h-60 overflow-hidden relative">
        <Image
            className="rounded-tr-md rounded-tl-md max-h-56"
            src={props.item.image}
            alt={props.item.name}
            title={props.item.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="my-2 p-2">
          <h3>{props.item.name} #{props.item.tokenId}</h3>
          <p className="text-smm text-gray-600">0.001 ETH</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
