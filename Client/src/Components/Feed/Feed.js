import React, { Component } from 'react';
import './Style.css';
import './Loading.css';
import { FeedInfo } from './FeedInfo/FeedInfo';
import { FeedPhotos } from './FeedPhotos/FeedPhotos';
import { FeedReviews } from './FeedReviews/FeedReviews';
import { FeedMap } from './FeedMap/FeedMap';
import { Icons } from '../../Assets/Icons/Icons';

export class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      extendedDetailing: false,
      shownInfo: false,
      activeSpan: 0,
      rentalData: null,
    };
    this.spanRefs = Array(4).fill(null).map(() => React.createRef());
  }
  
  API_URL = "http://localhost:5000";

  async componentDidMount() {
    try {
      const response = await fetch(`${this.API_URL}/api/rental/`);
      const data = await response.json();
      const firstRental = data[0]; 
      this.setState({ rentalData: firstRental, loading: false });
    } catch (error) {
      console.error('Error fetching rental data:', error);
      this.setState({ loading: false });
    }
  }

  handleSpanClick = (index) => {
    this.setState({ activeSpan: index });
  };

  toggleShowInfo = () => {
    this.setState((prevState) => ({ shownInfo: !prevState.shownInfo }));
  };

  render() {
    const { loading, shownInfo, activeSpan, rentalData } = this.state;

    if (loading || !rentalData) {
      return null
    }

    const {_id, name, location, thumbnailImage, information, userReviews } = rentalData;
    const { toggleModal, toggleModalWithData } = this.props;

    return (
      <div feed={loading && 'loading'} className='feed-container'>
        <div className='displayed-feed-container'>
          <div className='displayed-feed-header'>
            <div className='feed-image-container'>
              <img srcset="" src={thumbnailImage} alt="rental thumbnail"/>
            </div>
            <div className='feed-like-button'>
              <i className="fa fa-heart-o" aria-hidden="true"></i>
            </div>
          </div>
        
          <div className='displayed-feed-body'>
            <div className='feed-info category dashed'>
              <span>{this.props.count}</span>
              <span></span>
            </div>
            <div className='feed-info name dashed'>
              <h1>{name}</h1>
            </div>
            <div className='feed-info rating dashed'>
              <span><b>{userReviews.rating}</b> - {userReviews.grading} ({userReviews.usersRated})</span>
              <span> <i className="fa fa-map-marker" aria-hidden="true"></i> <b>{location.residence}</b></span>
            </div>
          </div>
        
          <div className='displayed-feed-footer'>
            <div className='feed-selection'>
              <b>{information.houseCategory}</b>
              <div>
                {information.vacant
                  ? information.numberOfHousesVacant + ' vacant' : 'No vacancy!'}
              </div>
              <div className='feed-select price'><h1>{information.pricing.price}</h1></div>
              <div className='feed-select view'>
                <button onClick={this.toggleShowInfo}>
                  {!shownInfo ? ( <span><b>View Rental</b></span>
                  ) : (<span><b> Show less </b></span>)}
                </button>
              </div>
            </div>
          </div>
        
          <div className='feed-info-more'>
            <span>here <b>hello</b></span>
          </div>
        </div>

        {shownInfo && (
          <div className={`feed-information-container ${shownInfo && 'slide-down'}`}>
            <div className='feed-information-header'>
              {['Info', 'Photos', 'Map', 'Review'].map((text, index) => (
                <span key={index} ref={this.spanRefs[index]} className={activeSpan === index ? 'active' : ''} onClick={() => this.handleSpanClick(index)} > {text} </span> ))}
            </div>
            <div className='feed-information-body'>
              {activeSpan === 0 && <FeedInfo  id={_id}/>}
              {activeSpan === 1 && <FeedPhotos id={_id}/>}
              {activeSpan === 3 && <FeedReviews id={_id} toggleModal={toggleModal} toggleModalWithData={toggleModalWithData}/>}
              {activeSpan === 2 && <FeedMap id={_id}/>}
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
