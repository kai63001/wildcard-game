import Image from "next/image";
import Link from "next/link";

const Card = (props: any) => {
  return (
    <Link href={`/marketplace/my?tokenId=${props.item.tokenId}`} as={`/marketplace/my/${props.item.tokenId}`}>
      <a>
        <div className="bg-white overflow-hidden rounded-md text-gray-900">
          <div className="bg-gray-300 h-72 overflow-hidden relative">
            <Image
              className="rounded-tr-md rounded-tl-md max-h-56"
              src={props.item.image}
              alt={props.item.name}
              title={props.item.name}
              layout="fill"
              blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              placeholder="blur"
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
