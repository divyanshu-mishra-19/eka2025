import React from 'react';

const Map = () => {
  return (
    <div className="w-full h-full">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.4784588484954!2d93.77168327606773!3d25.787784807525636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374607c5cdfdde91%3A0xf69a2518890fea22!2sNational%20Institute%20of%20Technology%20Nagaland!5e0!3m2!1sen!2sin!4v1766584944211!5m2!1sen!2sin" 
        width="100%" 
        height="100%" 
        style={{ minHeight: '400px', border: 0 }} 
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="NIT Nagaland Location"
        className="rounded-lg shadow-xl"
      />
    </div>
  );
};

export default Map;
