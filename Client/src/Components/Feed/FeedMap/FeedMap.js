import {useRef, useState} from 'react';
import './Style.css';
import './Loading.css';

export const FeedMap = ()=>{
  const [loading, setLoading] = useState(true);
  
 return (
   <div feed={loading && 'loading'} className='feed-map'>
   </div>
    )
}