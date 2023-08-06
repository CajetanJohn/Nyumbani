import {useRef, useState, useEffect, forwardRef} from 'react';
import './Style.css';
import './Loading.css';
import {Modal} from '../../Modal/Modal';

export const FeedReviews =({data,state})=>{
  const [loading, setLoading]=useState(state);
  const [showMore, setShowMore] = useState(false);
  const targetDivRef = useRef(null);
  
  const showModal = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <div feed={loading && 'loading'} className='guest-reviews-container'>
      <div className='guest-review-header'>
        <div>
          <h5>Rating</h5>
          <h1>8/10</h1>
          <span className='random'>very good</span>
        </div>
         <div>
          <span className='random'>sbsbdbdbdbbd </span>
          <span className='random'>hshsb bsbsbbs </span>
          <span className='random'>heheba shdg shs</span>
          <span className='random'>hwhwhwh</span>
        </div>
      </div>
      <div className='guest-review-body'>
        <div><h5>Guest reviews</h5></div>
        <div className="guest-review-text">
          <Review index={1}/>
        </div>
        <div><span onClick={()=>setShowMore(true)}><b>Show more reviews</b></span></div>
      </div>
      {showMore && <Modal title={'Guest Reviews'} onClose={showModal} content={'user reviews'} options={{ option1: { text: 'Option 1', function:''}, option2: { text: 'Option 2', function:'' }}} />}
    </div>
    </>
    )
}


const Review=({index})=>{
  const [isExpanded, setIsExpanded] = useState(false);
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum, dui nec semper facilisis, elit ligula rutrum nulla, in maximus magna elit nec ipsum. Nulla facilisi. Fusce euismod, ipsum eget posuere malesuada, felis nisi varius mi, eget rhoncus risus nunc vel quam. Sed suscipit lacus eget mauris facilisis, quis porttitor libero pharetra. Etiam malesuada vel elit in tristique. Vivamus nec dui eu nibh interdum luctus. Maecenas vulputate est odio, eget dignissim eros volutpat eu. Pellentesque sed velit fermentum, pulvinar ex in, suscipit eros. Aenean fringilla elit eget justo luctus facilisis. Quisque iaculis est ut felis vestibulum, ut faucibus elit posuere. Integer consectetur venenatis nisl, eu varius elit eleifend id.'

  const wordsLimit = 76;
  const handleDisplayMore = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded ? text : text.split(' ').slice(0, wordsLimit).join(' ');
  return (
    <>
      <h5>6/10</h5>
      <p className={isExpanded ? 'show-more' : ''}>{displayText} {text.split(' ').length > wordsLimit && (
        <><span className="display-more-button" onClick={handleDisplayMore}> <b>{isExpanded ? 'Show Less.' : ' ...See more.'}</b></span></>)}
      </p>
      <span><b>Travelers</b></span>
      <span>Date of stay: 16 July 2023</span>
    </>
  )}