import React from 'react';
import { FaFacebook, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <div className=' max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-primary-content'>
            {/* Part 1 */}
            <div className='lg:col-span-2'>
                <h1 className='Marcellus text-[26px] font-medium pb-10'>Office Address</h1>
                <div className='space-y-2 dmSans pb-10'>
                    <p className='text-lg'>Ka-8 (1st Floor), Bashundhara R/A (Main Gate), Ainuddin Munshi Road, Vatara Dhaka, Dhaka, Bangladesh, 1229</p>
                    <h3 className='text-lg font-bold'>Hotline : (+88) 01940-181860</h3>
                    <h3 className='text-lg font-bold'>Email: visa@euroasiatrips.com</h3>
                </div>
                <div className='flex gap-2 text-info'>
                    <FaFacebook size={18} />
                    <FaXTwitter size={18} />
                    <FaYoutube size={18} />
                    <FaWhatsapp size={18} />
                </div>
            </div>
            {/* Part 2 */}
            <div>
                <h1 className='Marcellus text-[26px] font-medium pb-4'>About</h1>
                <div className='flex flex-col gap-4 dmSans text-lg '>
                    <Link to="about-us">About Us</Link>
                    <Link to="contact-us">Contact Us</Link>
                    <Link to="terms-and-conditions">Terms and Conditions</Link>
                    <Link to="privacy-policy">Privacy Policy</Link>
                </div>
            </div>
            {/* Part 3 */}
            <div>
                <h1 className='Marcellus text-[26px] font-medium pb-4'>Visa Assistance</h1>
                {/* <p className='dmSans text-lg '>DUBAI (UAE)</p> */}
            </div>
            {/* Part 4 */}
            <div>
                <h1 className='Marcellus text-[26px] font-medium pb-4'>Tour Type</h1>
            </div>
        </div>
    );
};

export default Footer;