const Card = (props: any) => {
  return (
    <div>
      <div className="bg-white overflow-hidden rounded-md text-gray-900">
        <img src={props.item.image} alt="" />
        <div className="my-2 p-2">
          <h3>{props.item.name} #123</h3>
          <p className="text-smm text-gray-600">0.001 ETH</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
