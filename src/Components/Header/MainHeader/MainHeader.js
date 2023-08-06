import React from 'react';
import './Style.css';

const MainHeader = React.forwardRef((props, ref) => {
  const handleMenuClick = () => {
    // Add logic to show/hide the menu
  };

  return (
    <div className='main-header' ref={ref}>
      <div className='logo-header'>
        <div className='logo'>Nyumbani</div>
        <div className='menu'>
          <i onClick={handleMenuClick} className="fa fa-user-o" aria-hidden="true"></i>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
      </div>
      <div className='filter-header'>
        <div className='filter-search'>Destination</div>
        <div className='filter-selection'>
          <div><b>Sort</b></div>
          <div><b>Filter</b></div>
        </div>
      </div>
    </div>
  );
});

export default MainHeader;
;
