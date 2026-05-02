import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface WideImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function WideImage({ src, alt, caption }: WideImageProps) {
  return (
    <figure className="wide-image">
      <Zoom>
        <img src={src} alt={alt} />
      </Zoom>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
