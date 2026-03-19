interface ButtonProps {
  label: string;
  caption:string;
}

export default function Button({ label,caption}: ButtonProps) {
  return (
    <button>
      {label}
    {caption}
    </button>
  );
}