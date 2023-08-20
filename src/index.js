import React, { useState, useEffect, useRef, createRef } from 'react';
import ReactDOM from 'react-dom/client';
import {Feed} from  './Components/Feed/Feed';
import {Header} from './Components/Header/Header';
import {Modal} from './Components/Modal/Modal';
import {Map} from './Components/Map/Map';
import './style.css';

export const getScreenSize = () => {
    const width = window.innerWidth;
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'laptop';
    return 'larger';
  };
  
const App = () => {
  const [modal, setModal] = useState(false);
  const [screenSize, setScreenSize] = useState(getScreenSize());
  const [modalData, setModalData] = useState(null);
  const feedContainerRef = useRef(null);
  const [feedItemsCount, setFeedItemsCount] = useState(50);
  const maxFeeds = 150;
  const stepSize = 50;
  

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleModalWithData = (data) => {
    setModalData(data);
    toggleModal();
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: `0px 0px ${10 * feedContainerRef.current?.clientHeight}px 0px`,
      threshold: 1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === feedContainerRef.current?.lastElementChild) {
            loadMoreFeeds();
          }
        }
      });
    }, options);

    if (feedContainerRef.current) {
      observer.observe(feedContainerRef.current.lastElementChild);
    }

    return () => {
      if (feedContainerRef.current) {
        observer.unobserve(feedContainerRef.current.lastElementChild);
      }
    };
  }, [feedItemsCount]);

  const handleResize = () => {
    setScreenSize(getScreenSize());
  };

  const loadMoreFeeds = () => {
    if (feedItemsCount <= maxFeeds) {
      setFeedItemsCount((prevCount) => Math.min(prevCount + stepSize, maxFeeds));
    }
  };

  return (
    <div className='ui'>
       <div data-container='scroll'  className='feeds-container'>
        <Map toggleModal={toggleModal} />
        <div ref={feedContainerRef} data-container='feed'>
        <Header modal={modal} screenSize={screenSize} />
          {[...Array(feedItemsCount)].map((_, index) => (
            <Feed key={index} count={index + 1} toggleModal={toggleModal} toggleModalWithData={toggleModalWithData} />
        ))}
        </div>
      </div>
      {modal && <Modal toggleModal={toggleModal} modalData={modalData} />}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
