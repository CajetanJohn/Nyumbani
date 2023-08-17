import React from 'react';
import './Style.css';

export class Modal extends React.Component {
  render() {
    const { modalData } = this.props;

    return (
      <div className="modal">
        <div className='modal-header'>
          <span onClick={this.props.toggleModal} className='modal-close-button dashed'>
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
          <h5 className='modal-header-heading'>{modalData.title}</h5>
        </div>
        {modalData && (
          <>
            <p>Rating: {modalData.rating}</p>
            <p>Text: {modalData.text}</p>
            <p>Travelers: {modalData.travelers}</p>
            <p>Date: {modalData.date}</p>
          </>
        )}
        <div className='modal-footer'>
          <div className='modal-option1'><h1>yo</h1></div>
          <div className='modal-option2'><span><b>view</b></span></div>
        </div>
      </div>
    );
  }
}