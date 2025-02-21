import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import Dropdown from './components/Dropdown';
// import logo from '/images/logo1.png';
// import Body from './Body';
// import About from './components/About';
// import Contact from './components/Contact';
// import Login from './components/LoginPage';
// import PostJob from './components/PostJob'




const Header = () => {
    const {user} =useContext(UserContext);
    const[open,setOpen]=useState(false)
    const [activeSection, setActiveSection] = useState("body");


    

    return (
        <div>
        <header className="pb-3 w-screen h-18 bg-gray-600 fixed z-10">
        <nav className="flex justify-between items-center bg-gray-600 w-full h-full">
    
            <div className="flex items-center gap-5 pl-4">
                {/* <img src={logo} alt="Logo" className="w-16 h-14 ml-3 mt-2 rounded-full shadow-[0_4px_3px_#000000]" /> */}
                <span className="text-2xl font-extrabold text-[#f0ffff] pl-5">Find my Work</span>
            </div>

            <div className="relative"></div>
            <div className="flex justify-between items-center gap-10 pr-7"> 
                        <div class="flex justify-around items-center gap-8">
                        <Link to="/">
                            <button onClick={() => setActiveSection("body")} className="bg-gray-800 hover:bg-orange-400 text-white hover:text-black py-1 px-5 rounded-lg font-bold shadow-[0_4px_3px_#000000] hover:shadow-[0_4px_6px_#ffffff] transform active:translate-y-1 transition-all duration-200 ring-1 ring-zinc-900">Home</button></Link> 
                             <Link to="/about">
                            <button onClick={() => setActiveSection("about")} className="bg-gray-800 hover:bg-orange-400 text-white hover:text-black py-1 px-5 rounded-lg font-bold shadow-[0_4px_3px_#000000] hover:shadow-[0_4px_6px_#ffffff] transform active:translate-y-1 transition-all duration-200 ring-1 ring-zinc-900">About</button>
                            </Link>  
                            <Link to="/contact">
                            <button onClick={() => setActiveSection("contact")} className="bg-gray-800 hover:bg-orange-400 text-white hover:text-black py-1 px-5 rounded-lg font-bold shadow-[0_4px_3px_#000000] hover:shadow-[0_4px_6px_#ffffff] transform active:translate-y-1 transition-all duration-200 ring-1 ring-zinc-900">Contact</button></Link>  
                        </div>
                <div className="flex items-center gap-6 border rounded-lg p-2 shadow-[0_4px_3px_#000000]">
                <Link to={user ? "" : "/login"} >
                    <div className='flex' 
                    onClick={() =>{user? "" :setActiveSection("other")}}
                    >
                        <div className="border-r pr-2">
                            <span className="text-black">{user ? user.firstName : 'Guest'}</span>
                        </div>
                        <div className="flex items-center shadow-[0_4px_6px_#ffffff]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>
                    </div>
                </Link>
                    <div onClick={() => { setOpen((prev) => !prev); }} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5" />
                        </svg>
                    </div>
                
                
                </div>
            </div>
                {open && user && <Dropdown/>}
            </nav>
            

        </header>
        
        {/* {activeSection === "body" && <Body />} */}
        {/* {activeSection === "about" && <About />}
        {activeSection === "contact" && <Contact />}
        {activeSection === "other" && "" } */}
        
       
        </div> 
    );
};



export default Header;
