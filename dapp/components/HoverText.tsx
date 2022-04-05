interface description {
    descriptiontext?: string;
    imagdescription?: string;
    
  }
  
  const Inputdescription = (props: description) => {
    return (
       <div className="p-3  m-5 ">
        <div className="w-full  max-w-xl h-full rounded-lg shadow-2xl overflow-hidden relative     ">
          <div className="flex group h-full items-center justify-center absolute z-50 w-full  inset-0 top-0 ">
            <div className="relative group flex justify-center w-1/2 h-0 bg-center bg-cover  shadow-lg pb-1-2 rounded-xl bg-image">
              <h1 className="absolute p-6 text-2xl tracking-widest text-white  transition-opacity transform -translate-y-1/2 bg-black bg-opacity-75 opacity-0 top-1/2 rounded-xl group-hover:opacity-100   ">
               {props.descriptiontext} .
              </h1>
            </div>
          </div>
          <img className="object-cover  " src={props.imagdescription} alt="" />
        </div>
      </div>
    );
 }
 export default Inputdescription;