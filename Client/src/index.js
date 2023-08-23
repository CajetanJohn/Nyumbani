import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Feed } from './Components/Feed/Feed';
import { Header } from './Components/Header/Header';
import { Modal } from './Components/Modal/Modal';
import { Map } from './Components/Map/Map';
import './style.css';
import {Menu} from './Components/Header/Menu/Menu';
import {Icons} from './Assets/Icons/Icons';

const getScreenSize = () => {
  const width = window.innerWidth;
  if (width <= 768) return 'mobile';
  if (width <= 1024) return 'laptop';
  return 'larger';
};

const App = () => {
  const [modal, setModal] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mapped, setMap] = useState(false);
  const [screenSize, setScreenSize] = useState(getScreenSize());
  const [modalData, setModalData] = useState(null);
  const feedContainerRef = useRef(null);
  const [feedItemsCount, setFeedItemsCount] = useState(50);
  const maxFeeds = 150;
  const stepSize = 50;

  const toggleModal = useCallback(() => {
    setModal((prevModal) => !prevModal);
  }, []);

  const toggleModalWithData = useCallback((data) => {
    setModalData(data);
    toggleModal();
  }, [toggleModal]);

  const toggleMap = useCallback(() => {
    setMap((prevMap) => !prevMap);
  }, []);
  
  const toggleMenu = useCallback(() => {
    setMenu((prevMenu) => !prevMenu); 
  }, []); 


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
      <div data-container='scroll' className='feeds-container'>
        
        <div data-container='map' className={`map-${screenSize}`} data-shown={`${screenSize === 'mobile' && !mapped ? 'hidden' : 'shown'}`} >
          <Map toggleModal={toggleModal} />
        </div>
        
        <div className={`feed-${screenSize}`} ref={feedContainerRef} data-container='feed' data-shown={`${screenSize !== 'mobile' || !mapped ? 'shown' : 'hidden'}`}>
        {<Header modal={modal} toggleMenu={toggleMenu} screenSize={screenSize} />}
          {[...Array(feedItemsCount)].map((_, index) => (
            <Feed key={index} count={index + 1} toggleModal={toggleModal} toggleModalWithData={toggleModalWithData} />
          ))}
        </div>
      </div>

      {screenSize === 'mobile' && (
          <button className='map-toggle-button' onClick={toggleMap}>
            {!mapped ? ( <div> <img src={Icons.map} alt="Map Icon" /> Map</div> ) : (<div><img src={Icons.card_list} alt="Card List Icon" /> List</div>)}
          </button>
        )}
      
      {menu && <Menu screen={screenSize} toggleMenu={toggleMenu}/>}
      
      {modal && <Modal screen={screenSize} toggleModal={toggleModal} modalData={modalData} />}
      
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
