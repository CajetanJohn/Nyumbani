import React, {useEffect, useRef, useState} from 'react';
import './Style.css';
import './Loading.css';
import {FeedInfo} from './FeedInfo/FeedInfo';
import {FeedPhotos} from './FeedPhotos/FeedPhotos';
import {FeedReviews} from './FeedReviews/FeedReviews';
import {FeedMap} from './FeedMap/FeedMap';

export class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      extendedDetailing: false,
      shownInfo: false,
      activeSpan: 0,
    };
    this.spanRefs = Array(4).fill(null).map(() => React.createRef());
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  handleSpanClick = (index) => {
    this.setState({ activeSpan: index });
  };

  toggleShowInfo = () => {
    this.setState((prevState) => ({ shownInfo: !prevState.shownInfo }));
  };

  render() {
    const { loading, shownInfo, activeSpan } = this.state;
    const { toggleModal, toggleModalWithData } = this.props;

    return (
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
            <span>{this.props.count}</span>
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
        
          <div onClick={this.toggleShowInfo} className='feed-info-more'>
            <span>here <b>hello</b></span>
            {shownInfo ? (
              <span><b><i className="fa fa-chevron-up" aria-hidden="true"></i></b></span>
            ) : (
              <span><b><i className="fa fa-chevron-down" aria-hidden="true"></i></b></span>
            )}
          </div>
        </div>

        {shownInfo && (
          <div className={`feed-information-container ${shownInfo && 'slide-down'}`}>
            <div className='feed-information-header'>
              {['Info', 'Photos', 'Map', 'Review'].map((text, index) => (
                <span key={index} ref={this.spanRefs[index]} className={activeSpan === index ? 'active' : ''} onClick={() => this.handleSpanClick(index)} > {text} </span> ))}
            </div>
            <div className='feed-information-body'>
              {activeSpan === 0 && <FeedInfo />}
              {activeSpan === 1 && <FeedPhotos />}
              {activeSpan === 2 && <FeedMap />}
               {activeSpan === 3 && <FeedReviews toggleModal={toggleModal} toggleModalWithData={this.props.toggleModalWithData}/>}
            </div>
            <div className='feed-information-footer'>
              <button onClick={this.toggleShowInfo}>close</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export const Feeds = () => {
  const feedContainerRef = useRef(null);
  const [feedItemsCount, setFeedItemsCount] = useState(50);
  const maxFeeds = 150;
  const stepSize = 50;

  const loadMoreFeeds = () => {
    if (feedItemsCount <= maxFeeds) {
      setFeedItemsCount((prevCount) =>
        Math.min(prevCount + stepSize, maxFeeds)
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
          <Feed key={index} count={index + 1} />
        ))}
      </div>
    </div>
  );
};
