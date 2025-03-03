import React from 'react';
import { IconProps } from '../utils/interface';

export const CaretBtn = (props: IconProps) => {
      
  return (
    <svg fill="#B1B1B1" className={props.styles} viewBox="-96 0 512 512" onClick={props.triggerClick} xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
      </g>
    </svg>
  )
}

