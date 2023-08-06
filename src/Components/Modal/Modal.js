import {useRef, useState, useEffect} from 'react';
import './Style.css';
export const Modal = ({title,content,options, onClose})=>{
  const targetDivRef = useRef(null);

  
  return(
      <div ref={targetDivRef} className='modal'>
        <div className='modal-header'>
          <span onClick={onClose} className='modal-close-button dashed'>
          <i class="fa fa-times" aria-hidden="true"></i></span>
          <h5 className='modal-header-heading'>{title}</h5>
        </div>
        <div className='modal-body'></div>
        <div className='modal-footer'>
          <div className='modal-option1'><h1>yo</h1></div>
          <div className='modal-option2'><span><b>view</b></span></div>
        </div>
      </div>
    )
}