import React, { useEffect } from 'react';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import './Gallery.scss';

import img1 from '../../images/gallery/gallery (1).jpeg';
import img2 from '../../images/gallery/gallery (1).jpg';
import img3 from '../../images/gallery/gallery (1).png';
import img4 from '../../images/gallery/gallery (2).jpg';
import img5 from '../../images/gallery/gallery (3).jpeg';
import img6 from '../../images/gallery/gallery (4).jpeg';
import img7 from '../../images/gallery/gallery (4).jpg';
import img8 from '../../images/gallery/gallery (5).jpg';
import img9 from '../../images/gallery/gallery (6).jpg';
import img10 from '../../images/gallery/gallery (7).jpg';
import img11 from '../../images/gallery/gallery (8).jpg';
import img12 from '../../images/gallery/gallery (9).jpg';
import img13 from '../../images/gallery/gallery (10).jpg';
import img14 from '../../images/gallery/gallery (12).jpg';

const images = [
  img1, img2, img3, img4, img5, img6, img7,
  img8, img9, img10, img11, img12, img13, img14
];

function Gallery() {
  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {});
    return () => Fancybox.unbind("[data-fancybox='gallery']");
  }, []);

  return (
    <section className="gallery">
      <h2>Галерея работ</h2>
      <div className="gallery__grid">
        {images.map((src, index) => (
          <a href={src} data-fancybox="gallery" key={index} className="gallery__item">
            <img src={src} alt={`gallery-${index}`} />
          </a>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
