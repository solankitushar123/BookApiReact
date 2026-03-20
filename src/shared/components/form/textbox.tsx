interface TextBoxProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
}

export default function TextBox(props: TextBoxProps) {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="name"
      >
        {props.label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        placeholder={props.placeholder}
        value={props.value ?? ''}
        onChange={e => props.onChange?.(e.target.value)}
      />
    </div>
  );
}