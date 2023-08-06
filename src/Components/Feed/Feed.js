import React, { Component,useRef,useEffect } from 'react';
import './Style.css';
import './Loading.css';
import { FeedInfo } from './FeedInfo/FeedInfo';
import { FeedPhotos } from './FeedPhotos/FeedPhotos';
import { FeedReviews } from './FeedReviews/FeedReviews';
import { FeedMap } from './FeedMap/FeedMap';

export class FeedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showExtendedDiv: false,
      selectedOption: null,
      displayedComponent:null,
      Primary: this.createOption(),
      options: {
        Reviews: this.createOption(),
        Map: this.createOption(),
        Info: this.createOption(),
        Photos: this.createOption(),
      },
    };

    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.toggleExtendedDiv = this.toggleExtendedDiv.bind(this);
  }
  
  createOption() {
    return { loading: false,data: null, message: {type: '',text: '',}, 
    }; }
  
  Start(){this.fetchPrimaryContent();
  }
  async fetchPrimaryContent() {
    try {
      const response = await fetch('your_primary_api_endpoint');
      const data = await response.json();
      this.setState((prevState) => ({
        options: {
          ...prevState.options,
          Primary: {loading: false, data: data,message: {type: '',text: '',},},
        },
      }));
    } catch (error) {
      console.log('Error loading primary content:', error);
    }
  }

  async handleOptionClick(option) {
    this.setState({
      selectedOption: option,
      displayedComponent: option,
    });

    if (!this.state.options[option].data) {
      this.updateOption(option, {
        loading: true,
      });

      try {
        const response = await fetch(`your_api_endpoint_for_${option}`);
        const data = await response.json();

        this.updateOption(option, {
          loading: false,data: data,message: {type: '',text: '',}, });
      } catch (error) {
        this.updateOption(option, {
          loading: false, data: null, message: {type: 'error',text: 'Error loading data.',},});
      }
    }
  }

  updateOption(option, newData) {
    this.setState((prevState) => ({
      options: {
        ...prevState.options,
        [option]: {
          ...prevState.options[option],
          ...newData,
        },
      },
    }));
  }

  toggleExtendedDiv() {
    this.setState((prevState) => ({
      showExtendedDiv: !prevState.showExtendedDiv,
      selectedOption: null,
    }));
  }

  render() {
    const { showExtendedDiv, selectedOption, displayedComponent, options } = this.state;
    const primaryLoading = this.state.Primary.loading;


    return (
      <div feed={primaryLoading ? 'loading' : ''} className='feed-container'>
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
            <span>1</span>
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
              <span>view deal</span>
            </button>
            </div>
          </div>
        </div>
        
        <div onClick={this.toggleExtendedDiv} className='feed-info-more'>
          <span>here <b>hello</b></span>
          {showExtendedDiv ? (
          <span><b><i class="fa fa-chevron-up" aria-hidden="true"></i></b></span>):(
          <span><b><i class="fa fa-chevron-down" aria-hidden="true"></i></b></span>)}
        </div>
        
      </div>
      {showExtendedDiv && (
        <div className={`feed-information-container ${showExtendedDiv && 'slide-down'}`}>
          <div className='feed-information-header'>
            {Object.keys(options).map((option, index) => (
              <>
                <span key={option} onClick={() => this.handleOptionClick(option)} className={selectedOption === option ? 'active' : ''}>
                  {option}
                </span>
              </>
            ))}
          </div>
          <div className='feed-information-body'>
            {(selectedOption && options[selectedOption] && selectedOption === displayedComponent) && (
              <OptionContent
                selectedOption={selectedOption}
                content={options[selectedOption].data}
                state={options[selectedOption].loading}
              />
            )}
          </div>
          <div className='feed-information-footer'>
            <button onClick={this.toggleExtendedDiv}>close</button>
          </div>
        </div>
      )}
      </div>
    );
  }
}


const OptionContent = React.memo(({ selectedOption, content, state }) =>{
  switch (selectedOption) {
    case 'Reviews' :
      return <FeedReviews data={content} state={state}/>;
    case 'Map':
      return <FeedMap data={content} state={state}/>;
    case 'Info':
      return <FeedInfo data={content} state={state}/>;
    case 'Photos':
      return <FeedPhotos data={content} state={state}/>;
    default:
      return null;
  }
});

export const FeedLoop = () => {
  const feedContainerRef = useRef(null);
  const feedItemsCount = useRef(49);
  const maxFeedItems = 1000;
  const stepSize = 49;

  const options = {
    root: null,
    rootMargin: `0px 0px ${10 * (feedContainerRef.current ? feedContainerRef.current.clientHeight : 0)}px 0px`,
    threshold: 1,
  };

  const loadMoreFeeds = () => {
    if (feedItemsCount.current < maxFeedItems) {
      feedItemsCount.current = Math.min(
        feedItemsCount.current + stepSize,
        maxFeedItems
      );
    }
  };

  useEffect(() => {
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
      }
    };
  }, [options]);

  return (
    <div>
      <div ref={feedContainerRef} className='feeds-container'>
        {Array.from({ length: feedItemsCount.current }).map((_, index) => (
          <FeedContainer key={index} count={index + 1} />
        ))}
      </div>
    </div>
  );
};

