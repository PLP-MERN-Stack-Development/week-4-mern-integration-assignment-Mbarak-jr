const LoadingSpinner = ({ variant = 'pulse' }) => {
  // Option 1: Pulse dots (default)
  if (variant === 'pulse') {
    return (
      <div className="flex justify-center items-center py-8 space-x-2">
        <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
      </div>
    )
  }

  // Option 2: Modern ring spinner
  if (variant === 'ring') {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="relative w-12 h-12">
          <div className="absolute w-full h-full border-4 border-amber-100 rounded-full"></div>
          <div className="absolute w-full h-full border-4 border-t-transparent border-amber-500 rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  // Option 3: Bouncing loader
  if (variant === 'bounce') {
    return (
      <div className="flex justify-center items-center py-8 space-x-2">
        <div className="w-4 h-4 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-4 h-4 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-4 h-4 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    )
  }

  // Option 4: Flower spinner
  if (variant === 'flower') {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="relative w-10 h-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-amber-500 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 45}deg) translate(0, -150%)`,
                animation: 'pulse 1.5s ease-in-out infinite',
                animationDelay: `${i * 0.1}s`,
                opacity: 0.7
              }}
            ></div>
          ))}
        </div>
      </div>
    )
  }

  // Option 5: Classic spinner with gradient
  if (variant === 'gradient') {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
          style={{
            background: 'conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0) 0deg, #F59E0B 360deg)',
            borderImage: 'linear-gradient(to right, #F59E0B, #FCD34D) 1'
          }}>
        </div>
      </div>
    )
  }

  // Default fallback
  return (
    <div className="flex justify-center items-center py-8">
      <div className="w-8 h-8 border-4 border-t-transparent border-amber-500 rounded-full animate-spin"></div>
    </div>
  )
}

export default LoadingSpinner