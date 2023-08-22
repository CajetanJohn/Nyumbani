import React, { useState, useEffect } from 'react';
import './Style.css';
import './Loading.css';
import { Modal } from '../../Modal/Modal';

const Review = ({ userRating, reviewMessage, date }) => {
  return (
    <div>
      <h3>{userRating}</h3>
      <p>{reviewMessage}</p>
      <p>{date}</p>
    </div>
  );
};

export const FeedReviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const API_URL = "http://localhost:5000"; 
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/api/reviews/`);
        const data = await response.json();
        setReviews(data[0].userReviews.reviews);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }
    fetchData();
  }, [id]);

  const toggleReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  return (
    <div  className={`reviews-container ${showAllReviews ? 'expanded' : ''}`}>
      {loading ? (
        <div feed={loading && 'loading'} className='reviews-container'></div>
      ) : showAllReviews ? (
        // Show all reviews when expanded
        reviews.map((review, index) => (
          <div key={index}>
            <Review
              userRating={review.userRating}
              reviewMessage={review.reviewMessage}
              date={review.date}
            />
          </div>
        ))
      ) : (
        // Show only the first review initially
        <div>
          <Review
            userRating={reviews[0].userRating}
            reviewMessage={reviews[0].reviewMessage}
            date={reviews[0].date}
          />
        </div>
      )}
      {!loading && (
      <div className="display-more-button">
        <span onClick={toggleReviews}>
          <b>{showAllReviews ? 'Show less reviews' : 'Show more reviews'}</b>
        </span>
      </div>
      )}
    </div>
  );
};
