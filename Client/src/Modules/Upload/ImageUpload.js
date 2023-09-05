import React, { useState, useEffect } from 'react';
import './Style.css';

function ImageUpload() {
  const [imgSrc, setImgSrc] = useState('https://uploader-assets.s3.ap-south-1.amazonaws.com/codepen-default-placeholder.png');
  const [imgList, setImgList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const newImgList = [...imgList, { src: event.target.result, text: '', showTextarea: false }];
        setImgList(newImgList);
        setActiveIndex(newImgList.length - 1);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (index) => {
    setImgSrc(imgList[index].src)
    setActiveIndex(index);
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
  };

  const handleTextChange = (index, newText) => {
    const newImgList = [...imgList];
    newImgList[index].text = newText;
    setImgList(newImgList);
  };

  const handleToggleTextarea = (index) => {
    const newImgList = [...imgList];
    newImgList[index].showTextarea = !newImgList[index].showTextarea;
    setImgList(newImgList);
  };

  useEffect(() => {
    const handleResize = () => {
      const initWidth = document.querySelector('.img-preview-big').offsetWidth;
      document.querySelector('.img-preview-big').style.height = initWidth + 'px';
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="main-wrapper">
      <div className="img-upload-plugin">
        <div className="img-upload-handler">
          <div className="img-preview-big">
            <img src={imgSrc} alt="Preview" />
            {activeIndex !== null && (
              <div className="img-delete" onClick={() => handleRemoveImage(activeIndex)}>
                <img src="https://uploader-assets.s3.ap-south-1.amazonaws.com/codepen-delete-icon.png" alt="Delete" />
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
          <button className="img-add-more" onClick={() => document.querySelector('input[type="file"]').click()}>
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
            <button className="toggle-textarea" onClick={() => handleToggleTextarea(activeIndex)}>
              {imgList[activeIndex].showTextarea ? 'Hide Textarea' : 'Show Textarea'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
