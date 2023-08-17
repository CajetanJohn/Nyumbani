import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      screenSize: this.getScreenSize(),
    };
  }

  componentDidMount() {
    // Update screenSize state when window is resized
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ screenSize: this.getScreenSize() });
  }

  getScreenSize() {
    const width = window.innerWidth;
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'laptop';
    return 'larger';
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    const { modal, screenSize } = this.state;

    return (
      <div>
        <Header modal={modal} screenSize={screenSize} />
        <Feed toggleModal={this.toggleModal} />
        {modal && <Modal toggleModal={this.toggleModal} />}
        <Map toggleModal={this.toggleModal} />
      </div>
    );
  }
}

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    // Simulate API fetch request
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  render() {
    const { loading } = this.state;
    const { toggleModal } = this.props;

    return (
      <div>
        <button onClick={toggleModal}>Open Modal</button>
        <div className={`content ${loading ? 'loading' : ''}`}>
          <span className="info">Info</span>
          <span className="map">Map</span>
          <span className="review">Review</span>
          <span className="photos">Photos</span>
        </div>
      </div>
    );
  }
}

class Modal extends Component {
  render() {
    return (
      <div className="modal">
        <p>Modal content</p>
        <button onClick={this.props.toggleModal}>Close Modal</button>
      </div>
    );
  }
}


class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMap: false,
    };
  }

  toggleMap = () => {
    this.setState({ showMap: !this.state.showMap });
  }

  render() {
    const { showMap } = this.state;
    const { toggleModal } = this.props;

    return (
      <div>
        {showMap && <Feed toggleModal={toggleModal} />}
        <button onClick={this.toggleMap}>Toggle Map</button>
      </div>
    );
  }
}

class Header extends Component {
  render() {
    const { modal, screenSize } = this.props;

    if (modal && screenSize === 'mobile') {
      return null;
    }

    return (
      <div className="header">
        {/* Header content */}
      </div>
    );
  }
}

export default App;
