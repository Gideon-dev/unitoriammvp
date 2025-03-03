"use client";
import React, { MouseEvent, useState } from 'react';
import Image from 'next/image';
import EyeIcon from '../../public/eye.svg';
import EyeOffIcon from '../../public/eye-slash.svg'; 
import { EyeToggleProps } from '../utils/interface';


const EyeIcons: React.FC<EyeToggleProps> = ({ onToggle, className, isVisible }) => {

  return (
    <div onClick={onToggle} className={`flex justify-center items-center cursor-pointer ${className}`}>
      {isVisible ? (
        <Image  src={EyeIcon} alt="Visible icon" />
      ) : (
        <Image src={EyeOffIcon} alt="Not visible icon" />
      )}
    </div>
  );
};

export default EyeIcons;
