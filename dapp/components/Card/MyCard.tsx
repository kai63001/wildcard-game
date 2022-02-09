import Image from "next/image";
import Link from "next/link";

const Card = (props: any) => {
  return (
    <Link href={`/marketplace/my/${props.item.tokenId}`}>
      <a>
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
            <h3>
              {props.item.name} #{props.item.tokenId}
            </h3>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
