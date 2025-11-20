import { useState, useEffect } from "react";

export default function ImageWithFallback({ src, alt, className }) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  if (!src || error) {
    return (
      <div className={`${className} bg-white flex items-center justify-center p-6 text-center border-b border-neutral-300`}>
        <span className="text-neutral-400 font-bold text-xl tracking-wide w-full break-words font-serif">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
