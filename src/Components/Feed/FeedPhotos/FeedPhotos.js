import {useRef, useState, useEffect} from 'react';
import './Style.css';
import './Loading.css';

const images =[]

export const FeedPhotos =()=>{
  const galleryRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollAmount, setScrollAmount] = useState(0);
  const [loading, setLoading]=useState(true);

  
  
  const scrollGallery = (direction) => {
    const galleryWidth = galleryRef.current.offsetWidth;
    const numImages = images.length;
    let newIndex;

    if (direction === 'left') {
      newIndex = (currentIndex - 1 + numImages) % numImages;
    } else if (direction === 'right') {
      newIndex = (currentIndex + 1) % numImages;
    }

    setCurrentIndex(newIndex);
    setScrollAmount(-galleryWidth * newIndex);
  };

  return(
    <div feed={loading && 'loading'} className='gallery-container'>
      <div className='images-gallery' style={{ transform: `translateX(${scrollAmount}px)` }}>
        {images.map((imageUrl, index) => (
          <img key={index} data-src={imageUrl} alt={`Image ${index + 1}`} style={{ width: galleryRef.current ? galleryRef.current.offsetWidth : '100%' }}/>))}
      </div>
      <div className='gallery-control'>
        <i className="fa fa-chevron-left" aria-hidden="true" onClick={() => scrollGallery('left')}></i>
        <i className="fa fa-chevron-right" aria-hidden="true" onClick={() => scrollGallery('right')}></i>
      </div>
      <span className='image-information'>blloody hell</span>
    </div>
    )
}