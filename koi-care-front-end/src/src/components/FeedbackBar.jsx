import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment } from '@fortawesome/free-solid-svg-icons';
import '../styles/FeedbackBar.css'; // Import the CSS file for styling

const FeedbackBar = () => {
  return (
    <div className="feedback-bar">
      <button className="feedback-button like-button">
        <FontAwesomeIcon icon={faThumbsUp} /> Like
      </button>
      <button className="feedback-button dislike-button">
        <FontAwesomeIcon icon={faThumbsDown} /> Dislike
      </button>
      <button className="feedback-button comment-button">
        <FontAwesomeIcon icon={faComment} /> Comment
      </button>
    </div>
  );
};

export default FeedbackBar;