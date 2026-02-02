export default function Chip({ children, color = "neutral", size = "md", className = "" }) {
  const colorClasses = {
    neutral: "bg-white/[0.07] text-white/50",
    success: "bg-emerald-500/15 text-emerald-400",
    warning: "bg-yellow-500/15 text-yellow-400",
    danger: "bg-red-500/15 text-red-400",
  };

  const sizeClasses = {
    sm: "px-1.5 py-px text-[10px]",
    md: "px-2 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm",
  };

  const baseClasses = "inline-flex tracking-wide items-center justify-center rounded font-medium uppercase";
  const colorClass = colorClasses[color] || colorClasses.neutral;
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <span className={`${baseClasses} ${colorClass} ${sizeClass} ${className}`}>
      {children}
    </span>
  );
}
