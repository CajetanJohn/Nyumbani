import React, { useState, useEffect } from 'react';
import EXIF from 'exif-js'; // Import the exif-parser library
import './Style.css';

const imagePlaceholder='https://uploader-assets.s3.ap-south-1.amazonaws.com/codepen-default-placeholder.png';

function ImageUpload() {
  const [imgSrc, setImgSrc] = useState(imagePlaceholder);
  const [imgList, setImgList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageSrc = URL.createObjectURL(file);

      // Use exif-js to extract date information
      EXIF.getData(file, function () {
        const imageDate = EXIF.getTag(this, 'DateTimeOriginal') || '';

        // Create the uploaded image object
        const uploadedImage = {
          src: imageSrc,
          links: [],
          uploadDate: Date.now(),
          imageDate,
          user: 'admin',
        };

        // Add the uploaded image to the state
        setUploadedImages([...uploadedImages, uploadedImage]);

        const newImgList = [...imgList, { src: imageSrc, text: '', showTextarea: false }];
        setImgList(newImgList);
        setImgSrc(imageSrc);
        setActiveIndex(newImgList.length - 1);
      });
    }
  };
  
  const handleImageClick = (index) => {
    setImgSrc(imgList[index].src);
    setActiveIndex(index);
  };

  const handleToggleTextarea = (index) => {
    const newImgList = [...imgList];
    newImgList[index].showTextarea = !newImgList[index].showTextarea;
    setImgList(newImgList);
  };

  

  const handleRemoveImage = (index) => {
    const newImgList = [...imgList];
    newImgList.splice(index, 1);
    setImgList(newImgList);

    if (newImgList.length > 0) {
      setActiveIndex(0);
    } else {
      setActiveIndex(null);
    }

    const newUploadedImages = [...uploadedImages];
    newUploadedImages.splice(index, 1);
    setUploadedImages(newUploadedImages);
    if (index > 0) {
      handleImageClick(index - 1);
    } else{
      setImgSrc(imagePlaceholder)
    }
  };

  const handleTextChange = (index, newText) => {
    const newImgList = [...imgList];
    newImgList[index].text = newText;

    // Parse user input for links (assuming links are separated by newlines)
    const newLinks = newText.split('\n').map((line) => {
      return { url: line, description: '' };
    });

    // Update the links property of the uploaded image
    const updatedUploadedImage = { ...uploadedImages[index], links: newLinks };
    const newUploadedImages = [...uploadedImages];
    newUploadedImages[index] = updatedUploadedImage;

    setImgList(newImgList);
    setUploadedImages(newUploadedImages);
  };


  return (
    <div className="main-wrapper">
      <div className="img-upload-plugin">
        <div className="img-upload-handler">
          <div className="img-preview-big">
            <img src={imgSrc} alt="Preview" />
            {activeIndex !== null && (
              <div className="img-delete" onClick={() => handleRemoveImage(activeIndex)}>
              <i class="fa fa-trash" aria-hidden="true"></i>
              </div>
            )}
          </div>
        </div>
        <div className="img-preview-operate">
          <div className="img-holder">
            {imgList.map((img, index) => (
              <div key={index} className={`img-preview-small ${index === activeIndex ? 'img-small-selected' : ''}`} onClick={() => handleImageClick(index)}>
                <img src={img.src} alt="Preview" />
              </div>
            ))}
          </div>
          <button type="button" className="img-add-more" onClick={() => document.querySelector('input[type="file"]').click()}>
            <img src="https://uploader-assets.s3.ap-south-1.amazonaws.com/codepen-add-more-btn.png" alt="Add" />
          </button>
        </div>
        <input type="file" name="img-upload-input" style={{ display: 'none' }} onChange={handleFileChange} />
      </div>
      <div className="text-preview">
        {activeIndex !== null && (
          <div className="formatted-links">
            {imgList[activeIndex].showTextarea ? (
              <textarea
                value={imgList[activeIndex].text}
                onChange={(e) => handleTextChange(activeIndex, e.target.value)}
                placeholder="Enter text..."
              ></textarea>
            ) : (
              imgList[activeIndex].text.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))
            )}
            <button type='button' className="toggle-textarea" onClick={() => handleToggleTextarea(activeIndex)}>
              {imgList[activeIndex].showTextarea ? 'Hide' : 'Customize'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
