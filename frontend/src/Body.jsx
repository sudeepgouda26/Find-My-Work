import React from 'react'
import { Link } from 'react-router-dom'

import heroImage from '/images/home.jpg'

function body() {
  return (
          <div className="bg-[#f0ffff] h-auto flex flex-col items-center justify-center text-center  pt-24 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('/path-to-decorative-image.jpg')] bg-cover bg-center opacity-30 blur-sm"></div>
                  
                  <h1 className="text-7xl font-extrabold mb-6 drop-shadow-2xl text-[#5f9ea0]">
                    Unlock Your <span className="text-yellow-300">Future</span> Today!
                  </h1>
                  <p className="text-xl mb-8 max-w-3xl font-medium text-gray-400">
                    Unlock New Possibilities – Find or Offer Work!
                  </p>
                  
               
            <div class='flex'>
                <div class="flex-col items-center mt-10">
                    <div className="bg-slate-200 shadow-[4px_4px_10px_#b0c4de] text-blue-700 ml-28 px-2 py-2 rounded-3xl  max-w-xl transform hover:scale-110 transition duration-500">
                      <h2 className="text-4xl font-bold">Start Your Journey</h2>
                      <p className="mt-4 text-gray-600 text-lg">Find work opportunities in your area 
                        <br/><span class="text-orange-500">OR</span> <br/>upload work to hire professionals effortlessly.</p>
                       
                      <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold mt-6 shadow-lg transition duration-500 text-lg">
                      <Link to="jobs/create"> Upload Job</Link>
                      </button>
                    </div>
    
                  
                    <div className="mt-12 flex justify-center items-center space-x-10">
                      <div className="bg-slate-200 shadow-[4px_4px_10px_#b0c4de] p-2 rounded-2xl  flex flex-col items-center max-w-sm transform hover:scale-110 transition duration-500">
                        <span className="text-6xl">💼</span>
                        <p className="text-gray-700 mt-4 text-center text-lg">
                          Get connected with reputable companies and build a thriving career.
                        </p>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold mt-6 shadow-lg transition duration-500 text-lg">
                        <Link to="jobs/get"> Get Jobs</Link>
                        </button>
                        
                      </div>
                      <div className="bg-slate-200 shadow-[4px_4px_10px_#b0c4de] p-2 rounded-2xl  flex flex-col items-center max-w-sm transform hover:scale-110 transition duration-500">
                        <span className="text-6xl">⚡</span>
                        <p className="text-gray-700 mt-4 text-center text-lg">
                          Get your Stats here! Track your progress and see how you're performing.
                        </p>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold mt-6 shadow-lg transition duration-500 text-lg">
                        <Link to="stats"> Stats</Link>
                        </button>
                        
                      </div>
                    </div>
                  </div>
                <div className="mt-8 h-screen pl-24">
                    <img src={heroImage} alt="Job Search" className="ml-5 rounded-3xl w-11/12 max-w-lg h-96 shadow-[8px_8px_20px_#5f9ea0] " />
                    <br />
                    <p className='text-base text-slate-500 font-semibold'>Easily find jobs near you or upload your work to get discovered. </p>
                </div>
            </div>
          </div>
          
    
  )
}

export default body