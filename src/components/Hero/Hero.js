"use client";

function Stars() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            animationDelay: Math.random() * 3 + "s",
            animationDuration: Math.random() * 3 + 2 + "s",
            opacity: Math.random() * 0.7 + 0.3,
          }}
        />
      ))}
    </div>
  );
}

function Rocket() {
  return (
    <div className="relative animate-rocket">
      <svg
        width="120"
        height="120"
        viewBox="0 0 64 64"
        className="drop-shadow-2xl"
      >
        {/* Rocket body */}
        <defs>
          <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="rocketNose" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          <linearGradient id="flame" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <linearGradient id="flameInner" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>

        {/* Main body with rounded top */}
        <path d="M22 32 Q22 12 32 8 Q42 12 42 32 L42 44 L22 44 Z" fill="url(#rocketBody)" />


        {/* Window */}
        <circle cx="32" cy="24" r="5" fill="#0ea5e9" />
        <circle cx="32" cy="24" r="3.5" fill="#38bdf8" />
        <circle cx="30" cy="22" r="1.5" fill="#bae6fd" opacity="0.8" />

        {/* Fins */}
        <path d="M22 40 L18 52 L26 44 Z" fill="url(#rocketNose)" />
        <path d="M42 40 L46 52 L38 44 Z" fill="url(#rocketNose)" />
        <path d="M32 44 L28 54 L36 54 Z" fill="url(#rocketNose)" />

        {/* Flames */}
        <ellipse
          cx="32"
          cy="56"
          rx="6"
          ry="8"
          fill="url(#flame)"
          className="animate-flicker"
        />
        <ellipse
          cx="32"
          cy="55"
          rx="3"
          ry="5"
          fill="url(#flameInner)"
          className="animate-flicker"
        />
      </svg>

      {/* Smoke particles */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gray-400/30 animate-smoke"
            style={{
              width: 8 + i * 4 + "px",
              height: 8 + i * 4 + "px",
              animationDelay: i * 0.2 + "s",
              left: (i % 2 === 0 ? -1 : 1) * (i * 3) + "px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function OrbitRing({ size, duration, delay, children }) {
  return (
    <div
      className="absolute rounded-full border border-white/10"
      style={{
        width: size,
        height: size,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="absolute w-full h-full animate-spin"
        style={{ animationDuration: duration, animationDelay: delay }}
      >
        {children}
      </div>
    </div>
  );
}

function Planet({ color, size, glow }) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, ${color}, ${glow})`,
        boxShadow: `0 0 20px ${glow}40, inset -4px -4px 10px rgba(0,0,0,0.3)`,
        top: -size / 2,
        left: "50%",
        transform: "translateX(-50%)",
      }}
    />
  );
}

export default function Hero() {
  return (
    <div className="relative min-h-[500px] sm:min-h-[550px] overflow-hidden">

      {/* Stars */}
      <Stars />

      {/* Content */}
      <div className="relative z-10 pt-16 sm:pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Text content */}
          <div className="text-center sm:text-left flex-1">
            <h1 className="font-merriweather text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Launchpad
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-md leading-relaxed">
              Track upcoming launches, space station dockings, and deep space
              expeditions in real-time
            </p>

            {/* Stats badges */}
            <div className="flex flex-wrap gap-3 mt-8 justify-center sm:justify-start">
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="text-blue-400 font-semibold">Live</span>
                <span className="text-gray-400 ml-2">Tracking</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="text-purple-400 font-semibold">Global</span>
                <span className="text-gray-400 ml-2">Coverage</span>
              </div>
            </div>
          </div>

          {/* Rocket & Orbital illustration */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex-shrink-0">
            {/* Orbit rings */}
            <OrbitRing size={280} duration="20s" delay="0s">
              <Planet color="#818cf8" size={12} glow="#6366f1" />
            </OrbitRing>
            <OrbitRing size={200} duration="15s" delay="-5s">
              <Planet color="#f472b6" size={8} glow="#ec4899" />
            </OrbitRing>
            <OrbitRing size={160} duration="10s" delay="-2s">
              <Planet color="#34d399" size={6} glow="#10b981" />
            </OrbitRing>

            {/* Central rocket */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <Rocket />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
