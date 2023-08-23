import React, { useState } from 'react';

const Step2 = ({ onNext, onPrev }) => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState({ Image: '', links: {} });

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setCurrentImage({ ...currentImage, Image: image, Date: new Date().toISOString(), srcUser: `User ${images.length + 1}` });
  };

  const handleAddLink = () => {
    const { links } = currentImage;
    const linkCount = Object.keys(links).length;
    if (linkCount < 5) {
      setCurrentImage({ ...currentImage, links: { ...links, [`link${linkCount + 1}`]: '' } });
    }
  };

  const handleLinkChange = (key, value) => {
    setCurrentImage({ ...currentImage, links: { ...currentImage.links, [key]: value } });
  };

  const handleRemoveLink = (key) => {
    const { [key]: _, ...remainingLinks } = currentImage.links;
    setCurrentImage({ ...currentImage, links: remainingLinks });
  };

  const handleUploadImage = () => {
    if (currentImage.Image) {
      setImages([...images, currentImage]);
      setCurrentImage({ Image: '', links: {} });
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div className="form-step step2">
      <h2>Upload images of the rental</h2>
      <div className="image-upload">
        <input hidden id='image-upload' type="file" accept="image/*" onChange={handleImageChange} />
        <label className='input-label' htmlFor='image-upload'>Click to upload an image</label>
        <button className='upload-button' onClick={handleUploadImage}>Upload Image</button>
      </div>
      {currentImage.Image && (
        <div className="image-data">
          <img src={URL.createObjectURL(currentImage.Image)} alt="Uploaded" />
          <div className="link-inputs">
            {Object.entries(currentImage.links).map(([key, value], index) => (
              <div key={key}>
                <input type="text" placeholder={`Link ${index + 1}`} value={value} onChange={(e) => handleLinkChange(key, e.target.value)} />
                <button onClick={() => handleRemoveLink(key)}>Remove</button>
              </div>
            ))}
            <button className='image-link' onClick={handleAddLink}>Add Link</button>
          </div>
        </div>
      )}
      <div className="uploaded-images">
        {images.length > 0 && (
          <>
            <h3>Uploaded Images: {images.length}</h3>
            {images.map((image, index) => (
              <div key={index} className="uploaded-image">
                <img src={URL.createObjectURL(image.Image)} alt={`Image ${index + 1}`} />
                {Object.entries(image.links).map(([key, value], linkIndex) => (
                  <p key={key}>Link {linkIndex + 1}: {value}</p>
                ))}
                <p>Date: {image.Date}</p>
                <p>srcUser: {image.srcUser}</p>
                <button onClick={() => handleRemoveImage(index)}>Remove</button>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="step-buttons">
        <button onClick={onPrev}>Previous</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default Step2;
