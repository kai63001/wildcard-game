interface InputerInterface {
  placeholder?: string;
  name: string;
  type?: string;
  required?: boolean;
}

const Input = (props: InputerInterface) => {
  return (
    <div className="mb-3">
      <input
        type={props.type ? props.type : "text"}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        className="w-full px-3 py-2 text-gray-900 outline-none border-2"
        required={props.required ? true: false}
      />
    </div>
  );
};

export default Input;
