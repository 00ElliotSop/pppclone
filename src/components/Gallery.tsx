import React, { useState } from 'react';
import Lightbox from './Lightbox';

export type MediaItem = {
  id: string | number;
  type: 'image' | 'video';
  src: string;
  thumb?: string;
  alt?: string;
  poster?: string;
};

type GalleryProps = {
  items: MediaItem[];
  columns?: number;
  title?: string;
};

const Gallery: React.FC<GalleryProps> = ({ items, columns = 3, title }) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<MediaItem | null>(null);

  const openItem = (item: MediaItem) => {
    setCurrent(item);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setCurrent(null);
  };

  const colClass =
    columns === 4
      ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      : columns === 2
      ? 'grid-cols-2'
      : 'grid-cols-2 md:grid-cols-3';

  return (
    <section className="w-full overflow-x-hidden">
      {title && <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{title}</h2>}
      <div className={`grid ${colClass} gap-4`}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => openItem(item)}
            className="group relative block focus:outline-none focus:ring-2 focus:ring-[#B5A99A] rounded-md"
          >
            {item.type === 'video' ? (
              <div className="relative">
                <img
                  src={item.thumb || item.poster || item.src + '#t=0.1'}
                  alt={item.alt || 'Video thumbnail'}
                  className="w-full h-auto rounded-lg object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="px-3 py-1 rounded-full bg-black/60 text-white text-sm">Play</span>
                </span>
              </div>
            ) : (
              <img
                src={item.thumb || item.src}
                alt={item.alt || 'Image'}
                className="w-full h-auto rounded-lg object-cover"
                loading="lazy"
                decoding="async"
              />
            )}
          </button>
        ))}
      </div>
      <Lightbox isOpen={open} onClose={close} src={current?.src || ''} alt={current?.alt} type={current?.type || 'image'} poster={current?.poster} />
    </section>
  );
};

export default Gallery;
