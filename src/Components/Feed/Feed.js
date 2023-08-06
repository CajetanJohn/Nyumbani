import {useRef, useState, useEffect} from 'react'
import './Style.css';
import './Loading.css';
//import './Style.scss'
import {FeedInfo} from './FeedInfo/FeedInfo';
import {FeedPhotos} from './FeedPhotos/FeedPhotos';
import {FeedReviews} from './FeedReviews/FeedReviews';
import {FeedMap} from './FeedMap/FeedMap';


export function FeedContainer({count}){
  const [loading, setLoading] = useState(false);
  const [shownInfo, setShowInfo] = useState(false);
  const [activeSpan, setActiveSpan] = useState(0);
  const spanRefs = useRef([]);
  
  const handleSpanClick = (index) => {
    setActiveSpan(index);
  };
  
  return(
    <div feed={loading && 'loading'} className='feed-container'>
      <div className='displayed-feed-container'>
      
        <div className='displayed-feed-header'>
          <div className='feed-image-container'>
            <img srcset="" src="" alt=""/>
          </div>
          <div className='feed-images-control'>
            <i class="fa fa-chevron-left dashed" aria-hidden="true"></i>
            <i class="fa fa-chevron-right dashed"aria-hidden="true"></i>
          </div>
          <div className='feed-like-button'>
            <i class="fa fa-heart-o" aria-hidden="true"></i>
          </div>
        </div>
        
        <div className='displayed-feed-body'>
          <div className='feed-info category dashed'>
            <span>{count}</span>
            <span>hotel</span>
          </div>
          <div className='feed-info name dashed'>
            <h1>Casablanca</h1>
          </div>
          <div className='feed-info rating dashed'>
            <span><b>8/10 - divigotore</b> (1799)</span>
            <span> <i class="fa fa-map-marker" aria-hidden="true"></i><b></b></span>
          </div>
        </div>
        
        <div className='displayed-feed-footer'>
          <div className='feed-selection'>
            <div><span><b>boy</b></span></div>
            <div><span>hello</span></div>
            <div className='feed-select price'><h1>yo</h1></div>
            <div className='feed-select view'><button>
              <span>view deal  <i class="fa fa-chevron-down" aria-hidden="true"></i></span>
            </button>
            </div>
          </div>
        </div>
        
        <div onClick={()=>{setShowInfo(!shownInfo)}} className='feed-info-more'>
          <span>here <b>hello</b></span>
          {shownInfo ? (
          <span><b><i class="fa fa-chevron-up" aria-hidden="true"></i></b></span>):(
          <span><b><i class="fa fa-chevron-down" aria-hidden="true"></i></b></span>)}
        </div>
        
      </div>
      
      {shownInfo && (
      
      <div className={`feed-information-container ${shownInfo && 'slide-down'}`}>
        <div className='feed-information-header'>
        
        {['Info', 'Photos', 'Map', 'Review'].map((text, index) => (<span key={index} ref={(el) => (spanRefs.current[index] = el)} className={activeSpan === index ? 'active' : ''} onClick={() => handleSpanClick(index)}>{text}</span> ))}
        </div>
        <div className='feed-information-body'>
          {activeSpan === 0 && <FeedInfo/>}
          {activeSpan === 1 && <FeedPhotos/>}
          {activeSpan === 2 && <FeedMap/>}
          {activeSpan === 3 && <FeedReviews/>}
        </div>
        <div className='feed-information-footer'>
        <button onClick={()=>{setShowInfo(false)}}>close</button>
        </div>
      </div>)}
      
    </div>
    )
  }
  
  
export const FeedLoop = () => {
  const feedContainerRef = useRef(null);
  const [feedItemsCount, setFeedItemsCount] = useState(49);
  const maxFeedItems = 1000;
  const stepSize = 49;

  const loadMoreFeeds = () => {
    if (feedItemsCount < maxFeedItems) {
      setFeedItemsCount((prevCount) =>
        Math.min(prevCount + stepSize, maxFeedItems)
      );
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: `0px 0px ${10 * feedContainerRef.current.clientHeight}px 0px`,
      threshold: 1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === feedContainerRef.current.lastElementChild) {
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
      } };
  }, [feedItemsCount]);

  return (
    <div>
      <div ref={feedContainerRef} className='feeds-container'>
        {[...Array(feedItemsCount)].map((_, index) => (
          <FeedContainer key={index} count={index + 1} />
        ))}
      </div>
    </div>
  );
};





