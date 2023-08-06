import {useRef, useState} from 'react';
import './Style.css';
import './Loading.css';

export const FeedMap = ({data,state})=>{
  const [loading, setLoading] = useState(state);
  
 return (
   <div feed={loading && 'loading'} className='feed-map'>
   </div>
    )
}