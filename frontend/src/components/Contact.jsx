import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
    return (
        <div className='container h-screen w-screen bg-[#f0ffff]  flex justify-center items-center'>
            <div className='bg-[#dcfafa] shadow-[0px_0px_10px_#111111] p-8 rounded-lg  w-full max-w-4xl flex mt-10'>
                <div className='w-1/2 pr-4'>
                    <h1 className='text-2xl font-bold mb-6 text-center'>Contact Us</h1>
                    <form className='space-y-4'>
                        <div>
                            <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Name:</label>
                            <input type="text" id="name" name="name" required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                        </div>
                        <div>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email:</label>
                            <input type="email" id="email" name="email" required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                        </div>
                        <div>
                            <label htmlFor="phone" className='block text-sm font-medium text-gray-700'>Phone:</label>
                            <input type="tel" id="phone" name="phone" required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                        </div>
                        <div>
                            <label htmlFor="subject" className='block text-sm font-medium text-gray-700'>Subject:</label>
                            <input type="text" id="subject" name="subject" required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                        </div>
                        <div>
                            <label htmlFor="message" className='block text-sm font-medium text-gray-700'>Message:</label>
                            <textarea id="message" name="message" required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'></textarea>
                        </div>
                        <button type="submit" className='w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>Submit</button>
                    </form>
                </div>
                <div className='w-1/2 pl-4 pt-36'>
                    <h2 className='text-xl font-bold mb-4 text-center'>Our Contact Details</h2>
                    <div className='flex items-center mb-2 ml-20'>
                        <FaPhone className='text-indigo-600 mr-2' />
                        <span>(+91) 8105280460</span>
                    </div>
                    <div className='flex items-center mb-2 ml-20'>
                        <FaEnvelope className='text-indigo-600 mr-2' />
                        <span>ChitriJvnBalu@gamil.com</span>
                    </div>
                    <div className='flex items-center ml-20'>
                        <FaMapMarkerAlt className='text-indigo-600 mr-2' />
                        <span>Airport ,Mangalore ,574142</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
