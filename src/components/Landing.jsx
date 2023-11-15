import React from 'react';
import Hero from './Hero';
import Features from './Features';

const Landing = () => {
  return (
    <div id='landing-page' className='landing'>
      <div className="hero"><Hero /></div>
      <div className="features-and-benefits"><Features /></div>
      <div className="faq">Frequency Asked Question</div>
      <div className="last-action">Lets GO</div>
      <div className="footer">Contact ME for More</div>
      
    </div>
    
  );
};

export default Landing;