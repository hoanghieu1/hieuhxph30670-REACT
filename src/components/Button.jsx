export default function Button({ label, onClick, variant = "primary" }) {
  const baseStyles = "px-4 py-2 rounded-md font-semibold transition-all text-sm";
  
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg",
    secondary: "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick}>
      {label}
    </button>
  );
}
