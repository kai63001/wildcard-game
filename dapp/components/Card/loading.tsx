const CardLoding = () => {
    return (
        <div className="bg-white overflow-hidden rounded-md text-gray-900">
          <div className="bg-gray-300 h-52 animate-pulse"></div>
          <div className="my-2 p-2">
            <h3 className="bg-gray-300 px-3 py-2 rounded-lg mb-2 w-3/4 animate-pulse"></h3>
            <h3 className="bg-gray-300 px-3 py-2 rounded-lg mb-2 w-1/4 animate-pulse"></h3>
          </div>
        </div>
    )
}

export default CardLoding;