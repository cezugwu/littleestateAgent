import React from 'react';
import PropertyType from '../components/PropertyType';

const PropertyPost = () => {
  return(
    <div className='mt-20 px-5 mb-10'>
      <div className='space-y-2'>
        <div 
        className='font-jost font-medium text-xl md:text-2xl lg:text-3xl'>
          What Property type would you like to post
        </div>
        <div className='font-play'>Pick an option and we'll get you started. You can save your progress as you go.</div>
      </div>
      <div>
        <PropertyType />
      </div>
    </div>
  );
};

export default PropertyPost;
