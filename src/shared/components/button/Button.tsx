interface ButtonProps {
  caption: string;
  type?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  caption,
  type = 'submit',
  ...rest
}: ButtonProps) {
  return (
    <button
      className="bg-gradient-to-r from-purple-600 to-blue-500 
hover:from-purple-700 hover:to-blue-600
text-white font-semibold
py-2 px-5
rounded-xl
shadow-md hover:shadow-lg
transition-all duration-200
focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1
disabled:opacity-40 disabled:cursor-not-allowed"
      type={type}
      onClick={rest.onClick}
      disabled={rest.disabled}
    >
      {caption}
    </button>
  );
}