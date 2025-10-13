export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="loader flex gap-2.5 justify-center items-center h-[60px]">
        <div className="relative w-[22px] h-[22px] rounded-md bg-cyan-400 shadow-[0_0_12px_rgba(4,136,252,0.8)] animate-scaleBounce [animation-delay:-0.4s]">
          <span className="absolute inset-0 rounded-full bg-cyan-400/50 opacity-0 animate-splash"></span>
        </div>
        <div className="relative w-[22px] h-[22px] rounded-md bg-cyan-400 shadow-[0_0_12px_rgba(4,136,252,0.8)] animate-scaleBounce [animation-delay:-0.2s]">
          <span className="absolute inset-0 rounded-full bg-cyan-400/50 opacity-0 animate-splash"></span>
        </div>
        <div className="relative w-[22px] h-[22px] rounded-md bg-cyan-400 shadow-[0_0_12px_rgba(4,136,252,0.8)] animate-scaleBounce [animation-delay:0s]">
          <span className="absolute inset-0 rounded-full bg-cyan-400/50 opacity-0 animate-splash"></span>
        </div>
      </div>
    </div>
  );
}
