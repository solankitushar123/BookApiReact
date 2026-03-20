interface ButtonProps {
  label: string;
  caption:string;
}

export default function Button({ label,caption}: ButtonProps) {
  return (
    <button className=" ">
      {label}
    {caption}
    </button>
  );
}