import React, { Component } from 'react';
import './Style.css';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.mainHeaderRef = React.createRef();
    this.state = {
      showMiniHeader: false,
    };
  }

  componentDidMount() {
    const feedContainer = document.querySelector('[data-container="scroll"]');
    feedContainer.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    const feedContainer = document.querySelector('[data-container="scroll"]');
    feedContainer.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
  const mainHeaderHeight = this.mainHeaderRef.current?.clientHeight || 0;
  const scrollThreshold = 50;
  const currentScrollY = document.querySelector('[data-container="scroll"]').scrollTop;

  if (currentScrollY > mainHeaderHeight) {
    this.setState({ showMiniHeader: true });
  } else if (currentScrollY < mainHeaderHeight + scrollThreshold) {
    this.setState({ showMiniHeader: false });
  }
};


  render() {
    const { modal, screenSize } = this.props;
    const { showMiniHeader } = this.state;

    if (modal && screenSize === 'mobile') {
      return null;
    }

    return (
      <div className="header">
        <MainHeader ref={this.mainHeaderRef} />
        <MiniHeader showMiniHeader={showMiniHeader} />
      </div>
    );
  }
}

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

const MiniHeader = ({ showMiniHeader }) => {
  return (
    <div className={`mini-header ${showMiniHeader ? 'slide-down' : ''}`}>
      <i className="fa fa-search" aria-hidden="true"></i>
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
