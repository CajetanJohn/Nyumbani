import {useRef, useState} from 'react';
import './Style.css';
import './Loading.css';

export const FeedInfo = ({data,state})=>{
  const [loading, setLoading] = useState(state);
  return(
    <div feed={loading && 'loading'} className='feed-information'>
      <div className='feed-info-details'>
        <span className='random'>hello there</span>
        <span className='random'>vsbbd</span>
        <span className='random'>bdbbdvdv</span>
        <span className='random'>hzgsg</span>
        <span className='random'>gsgeg</span>
        <span className='random'>gsgeg</span>
        <span className='random'>gsgeg</span>
      </div>
      <div className='feed-info-map'></div>
    </div>
    )
}