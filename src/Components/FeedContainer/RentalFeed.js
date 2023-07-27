import {useRef, useState} from 'react'
import './Style.css';
import './Loading.css';
import {Info} from '../Info/Info'

export function Feed(){
  const [loading, setLoading] = useState(false);
  const [shownInfo, setShowInfo] = useState(false);
  const [activeSpan, setActiveSpan] = useState(0);
  const spanRefs = useRef([]);
  
  const handleSpanClick = (index) => {
    setActiveSpan(index);
  };
  
  return(
    <div feed={loading && 'loading'} className='feed-container'>
      <div className='displayed-feed-container'>
      
        <div className='displayed-feed-header'>
          <div className='feed-image-container'>
            <img srcset="" src="" alt=""/>
          </div>
          <div className='feed-images-control'>
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
            <i class="fa fa-chevron-right"aria-hidden="true"></i>
          </div>
          <div className='feed-like-button'>
            <i class="fa fa-heart-o" aria-hidden="true"></i>
          </div>
        </div>
        
        <div className='displayed-feed-body'>
          <div className='feed-info category'>
            <span>8 8 8</span>
            <span>hotel</span>
          </div>
          <div className='feed-info name'>
            <h1>Casablanca</h1>
          </div>
          <div className='feed-info rating'>
            <span><b>8/10 - divigotore</b> (1799)</span>
            <span> <i class="fa fa-map-marker" aria-hidden="true"></i><b></b></span>
          </div>
        </div>
        
        <div className='displayed-feed-footer'>
          <div className='feed-selection'>
            <div><span><b>boy</b></span></div>
            <div><span>hello</span></div>
            <div className='field-select price'><h1>yo</h1></div>
            <div onClick={()=>{setShowInfo(!shownInfo)}} className='field-select view'><button>
            {shownInfo ? <span>Close <i class="fa fa-chevron-up" aria-hidden="true"></i>
           </span>:(<span>view deal  <i class="fa fa-chevron-down" aria-hidden="true"></i>
           </span>)}
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
        {['Info', 'Photos', 'Map', 'Review'].map((text, index) => (<span key={index} ref={(el) => (spanRefs.current[index] = el)} className={activeSpan === index ? 'active' : ''} onClick={() => handleSpanClick(index)}>{text}</span> ))}
        </div>
        <div className='feed-information-body'>
          {activeSpan === 0 && <Info/>}
          {activeSpan === 1 && 'span 2'}
          {activeSpan === 2 && 'span 3'}
          {activeSpan === 3 && 'span 4'}
        </div>
        <div className='feed-information-footer'>
        <button onClick={()=>{setShowInfo(false)}}>close</button>
        </div>
      </div>)}
    </div>
    )
}