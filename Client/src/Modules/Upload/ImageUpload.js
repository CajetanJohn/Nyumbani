import React, { useState } from 'react';
import './Style.css';

function ImageUpload() {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const selectedImages = Array.from(event.target.files);

    const newImages = selectedImages.map((image) => {
      return {
        file: URL.createObjectURL(image),
        properties: {
          text: '',
        },
        detected: false,
      };
    });

    setImages([...images, ...newImages]);
  };

  const handleTextChange = (index, text) => {
    const updatedImages = [...images];
    updatedImages[index].properties.text = text;
    setImages(updatedImages);
  };

  const handleDetectProperties = (index) => {
    const updatedImages = [...images];
    const text = updatedImages[index].properties.text;

    const hashtags = [];
    const links = [];

    const words = text.split(' ');
    words.forEach((word) => {
      if (word.startsWith('#')) {
        hashtags.push(word.substring(1));
      } else if (word.startsWith('@')) {
        links.push(word.substring(1));
      }
    });

    updatedImages[index].properties.hashtags = hashtags;
    updatedImages[index].properties.links = links;
    updatedImages[index].detected = true;

    setImages(updatedImages);
  };

  const handleLogData = () => {
    console.log(images);
  };

  return (
    <div>
      <div className="image-input">
        <input type="file" accept="image/*" multiple onChange={handleImageUpload}/>
      </div>
      <div className="image-preview">
        {images.map((image, index) => (
          <div key={index}>
            <img className="uploaded-image" src={image.file} alt={`Image ${index}`} />
            <textarea
              placeholder="Enter text (e.g., #hashtag @link)"
              value={image.properties.text}
              onChange={(e) => handleTextChange(index, e.target.value)}
            />
            {image.detected ? (
              <div>
                <button onClick={() => handleDetectProperties(index)}>
                  Confirm Detection
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <button onClick={handleLogData}>Log Data</button>
    </div>
  );
}

export default ImageUpload;
