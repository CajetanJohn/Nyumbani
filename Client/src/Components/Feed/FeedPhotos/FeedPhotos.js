import { useRef, useState, useEffect } from 'react';
import './Style.css';
import './Loading.css';

export const FeedPhotos = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`/api/photos/${id}`);
        const photosData = await response.json();
        setPhotos(photosData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photos:', error);
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [id]);

  const handleLikeClick = async (photoId) => {
    try {
      const response = await fetch(`/api/photos/${photoId}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        setPhotos((prevPhotos) =>
          prevPhotos.map((photo) =>
            photo._id === photoId ? { ...photo, likes: photo.likes + 1 } : photo
          )
        );
      }
    } catch (error) {
      console.error('Error liking photo:', error);
    }
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div feed={loading && 'loading'} className='feed-information'>
      <div className='feed-info-details'>
        {loading ? (
          <div className='loading-spinner'>Loading...</div>
        ) : (
          photos.map((photo, index) => (
            <div key={index} className={`photo-container ${index === currentPhotoIndex ? 'active' : ''}`}>
              <a href={photo.imageUrl} target='_blank' rel='noopener noreferrer'>
                <img src={photo.imageUrl} alt={`Photo ${index}`} />
              </a>
              <div className='photo-details'>
                <span>Likes: {photo.likes}</span>
                <span>Date Posted: {photo.datePosted}</span>
                {photo.links && (
                  <ul>
                    {photo.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href={link} target='_blank' rel='noopener noreferrer'>
                          Link {linkIndex + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button onClick={() => handleLikeClick(photo._id)}>Like</button>
            </div>
          ))
        )}
        <button className='prev-button' onClick={handlePrevPhoto}>
          Previous
        </button>
        <button className='next-button' onClick={handleNextPhoto}>
          Next
        </button>
      </div>
      <div className='feed-info-map'></div>
    </div>
  );
};
