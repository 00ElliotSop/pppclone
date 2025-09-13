import React, { useEffect, useRef } from 'react';

type LightboxProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt?: string;
  type?: 'image' | 'video';
  poster?: string;
  className?: string;
};

const Lightbox: React.FC<LightboxProps> = ({ isOpen, onClose, src, alt = '', type = 'image', poster, className }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) handleClose();
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      try {
        videoRef.current.currentTime = 0;
      } catch {}
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div ref={overlayRef} onMouseDown={handleOverlayClick} className={`fixed inset-0 z-[1000] bg-black/80 flex items-center justify-center p-4 ${className || ''}`} aria-modal="true" role="dialog">
      <button onClick={handleClose} aria-label="Close" className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/60 rounded-full px-3 py-1">✕</button>
      <div className="max-w-6xl w-full">
        {type === 'video' ? (
          <video ref={videoRef} src={src} poster={poster} controls preload="metadata" className="w-full h-auto rounded-lg shadow-lg" />
        ) : (
          <img src={src} alt={alt} loading="lazy" decoding="async" className="w-full h-auto rounded-lg shadow-lg" />
        )}
      </div>
    </div>
  );
};

export default Lightbox;
