import React from 'react';
import { FaFacebook, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const TopNavbar = () => {
    return (
        <div className='border-b border-accent'>
            <div className='flex sm:flex-row-reverse max-w-7xl px-4 mx-auto items-center py-2.5 justify-between'>
                <div className='flex gap-2 text-info'>
                    <FaFacebook size={18} />
                    <FaXTwitter size={18} />
                    <FaYoutube size={18} />
                    <FaWhatsapp size={18} />
                </div>
                <h3 className='text-primary-content dmSans text-sm'>visa@euroasiatrips.com</h3>
            </div>
        </div>
    );
};

export default TopNavbar;