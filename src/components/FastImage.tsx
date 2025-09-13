import React from 'react';

type FastImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
};

const FastImage: React.FC<FastImageProps> = ({
  src,
  alt,
  className,
  loading = 'lazy',
}) => {
  return (
    <a href={src}>
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        fetchpriority={loading === 'eager' ? 'high' : 'auto'}
      />
    </a>
  );
};

export default FastImage;
