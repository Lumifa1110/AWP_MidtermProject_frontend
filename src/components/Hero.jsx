import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Link } from 'react-router-dom';
import { hero } from '../assets';

const Hero = () => {

  return (
    <div className='hero-section'>
      <div className='text-left flex-1 w-5'>
        <h2 className='text-3xl yelow-brown-dark line-height-1'>GOoglEDU</h2>
        <p className='mb-2 mt-2 text-haft6xl font-semibold green-subtext'>Where teaching and learning come together</p>
        <p className='line-height-2 text-lg text-lightGray'>
          Providing you a teaching and learning platform that help educators create engaging learning experiences they can personalize, manage, and measure.
        </p>

        <div className='hero-buttons'>
          <div className="goto-btn">
            <div className='outer goto-class'>
              <Link to="/login" className=''>Go to Class</Link>
              <span></span>
            </div>
          </div>

          <div className="contact-btn">
            <div className='outer'>
              <Link to="/about" className='contact'>Contact Me</Link>
              <span></span>
            </div>
          </div>
          
        </div>
      </div>
      <div className='flex-1 w-5'>
        <Image src={ hero } alt="Image" width='100%'/>
      </div>
    </div>
  )
};

export default Hero