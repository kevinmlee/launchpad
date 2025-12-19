export default function Chip({ children, color = "neutral", size = "md", className = "" }) {
  const colorClasses = {
    neutral: "bg-[#6f737c] text-white",
    success: "bg-green-600 text-white",
    warning: "bg-yellow-500 text-black",
    danger: "bg-red-600 text-white",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  const baseClasses = "inline-flex items-center justify-center rounded-full font-medium";
  const colorClass = colorClasses[color] || colorClasses.neutral;
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <span className={`${baseClasses} ${colorClass} ${sizeClass} ${className}`}>
      {children}
    </span>
  );
}
