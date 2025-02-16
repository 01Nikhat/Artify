import React from 'react';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  // Hide footer on /result page
  if (location.pathname === "/result") {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-4 py-3 mt-20 px-4 sm:px-10 lg:px-20">
      {/* Logo */}
      <img src={assets.artify} alt="Logo" width={150} className="shrink-0" />

      {/* Copyright (Hidden on Small Screens) */}
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 hidden sm:block">
        Copyright © Nikhat Parvin
      </p>

      {/* Social Media Icons */}
      <div className="flex gap-3">
        <img src={assets.facebook_icon} alt="Facebook" width={35} />
        <img src={assets.twitter_icon} alt="Twitter" width={35} />
        <img src={assets.instagram_icon} alt="Instagram" width={35} />
      </div>
    </div>
  );
};

export default Footer;
