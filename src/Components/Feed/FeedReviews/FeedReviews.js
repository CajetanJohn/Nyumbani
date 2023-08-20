import React, { useState } from 'react';
import './Style.css';
import './Loading.css';
import { Modal } from '../../Modal/Modal';

const Review = ({ index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum, dui nec semper facilisis, elit ligula rutrum nulla, in maximus magna elit nec ipsum. Nulla facilisi. Fusce euismod, ipsum eget posuere malesuada, felis nisi varius mi, eget rhoncus risus nunc vel quam. Sed suscipit lacus eget mauris facilisis, quis porttitor libero pharetra. Etiam malesuada vel elit in tristique. Vivamus nec dui eu nibh interdum luctus. Maecenas vulputate est odio, eget dignissim eros volutpat eu. Pellentesque sed velit fermentum, pulvinar ex in, suscipit eros. Aenean fringilla elit eget justo luctus facilisis. Quisque iaculis est ut felis vestibulum, ut faucibus elit posuere. Integer consectetur venenatis nisl, eu varius elit eleifend id.';

  const wordsLimit = 76;
  const handleDisplayMore = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded ? text : text.split(' ').slice(0, wordsLimit).join(' ');

  return (
    <>
      <h5>6/10</h5>
      <p className={isExpanded ? 'show-more' : ''}>
        {displayText} {text.split(' ').length > wordsLimit && (
          <>
            <span className="display-more-button" onClick={handleDisplayMore}>
              <b>{isExpanded ? 'Show Less.' : ' ...See more.'}</b>
            </span>
          </>
        )}
      </p>
      <span> <b>Travelers</b> Date of stay: 16 July 2023</span>
    </>
  );
};

export const FeedReviews = ({ toggleModal, toggleModalWithData }) => {
  const modalData = {
      title:'Guest review',
      rating: '10/10',
      text: 'Lorem ipsum dolor...',
      travelers: 'Travelers',
      date: 'Date of stay: 16 July 2023',
    };
  const handleToggle = () => {
    toggleModalWithData(modalData);
  };

  return (
    <div>
      <Review index={0} />
      <br/>
      <br/>
      <div className="display-more-button"><span onClick={handleToggle}><b>Show more reviews</b></span></div>
    </div>
  );
};
