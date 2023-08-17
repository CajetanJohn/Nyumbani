import React from 'react';
import ReactDOM from 'react-dom/client';
import {Feeds} from  './Components/Feed/Feed';
import {Header} from './Components/Header/Header';
import {Modal} from './Components/Modal/Modal';
import {Map} from './Components/Map/Map';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      screenSize: this.getScreenSize(),
      modalData: null,
    };
  }

  componentDidMount() {
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

  toggleModalWithData = (modalData) => {
    this.setState({ modal: !this.state.modal, modalData });
  }

  render() {
    const { modal, screenSize, modalData } = this.state;

    return (
      <div>
        <Header modal={modal} screenSize={screenSize} />
        {modal && <Modal toggleModal={this.toggleModal} modalData={modalData} />}
        <Feeds toggleModal={this.toggleModal} toggleModalWithData={this.toggleModalWithData} />
        <Map toggleModal={this.toggleModal} />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <App/>
  </React.StrictMode>
);
