import React from 'react';
import './Style.css';
const MiniHeader = ({showMiniHeader}) => {
  return (
    <div className={`mini-header ${showMiniHeader ? 'slide-down' : ''}`}>
      <i class="fa fa-search" aria-hidden="true"></i>
      <div>
        <div className='mini-filter-search'>Destination</div>
        <div className='mini-filter-selection'>
          <span><b>Sort</b></span>
          <span><b>Filter</b></span>
        </div>
      </div>
    </div>
  );
};

export default MiniHeader;
;
