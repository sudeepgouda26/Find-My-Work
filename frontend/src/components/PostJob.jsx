// import React, { useState,useContext } from "react";
// import { motion } from "framer-motion";
// import CustomCurser from '../components/CustomCursor'
// import { UserContext } from '../UserContext';
// import axios from "axios";

// export default function JobUploadForm() {
//     const { token } = useContext(UserContext);
//   const [formData, setFormData] = useState({
//     jobTitle: "",
//     description: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     zipCode: "",
//     salary: "",
//     contactName: "",
//     contactEmail: "",
//     contactPhone: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     // API call to submit job
//     axios.post("http://localhost:4000/api/v1/jobs",formData,{
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//         },
//         withCredentials: true,
//   }).then(response => {
//       if (response.status === 200) {
//           alert('Job Uploaded successful');
//           setSuccess(true);
//           navigate('/jobs');
//       } else {
//           alert('Jobupload failed');
//       }
//   }).catch(error => {
//       alert('There was an error registering: ' + (error.response ? error.response.data.message : error.message));
//   });
// };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-sky-950 to-indigo-950  p-6">
//      <CustomCurser/>
//       <motion.div 
//         initial={{ opacity: 0, y: 50 }} 
//         animate={{ opacity: 1, y: 0 }} 
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-2xl bg-gray-900 p-8 rounded-3xl shadow-2xl text-white hover:shadow-xl transition-shadow">
//         <h2 className="text-4xl font-extrabold text-center mb-6 text-pink-400">Upload Job</h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" required />
//           <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" required></textarea>
//           <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" required />
//           <div className="grid grid-cols-2 gap-6">
//             <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
//             <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
//           </div>
//           <div className="grid grid-cols-2 gap-6">
//             <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
//             <input type="text" name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
//           </div>
//           <input type="number" name="salary" placeholder="Salary ($)" value={formData.salary} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" required />
//           <input type="text" name="contactName" placeholder="Contact Name" value={formData.contactName} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" required />
//           <input type="email" name="contactEmail" placeholder="Contact Email" value={formData.contactEmail} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" required />
//           <input type="tel" name="contactPhone" placeholder="Contact Phone" value={formData.contactPhone} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" required />
//           <motion.button 
//             whileHover={{ scale: 1.05 }} 
//             whileTap={{ scale: 0.95 }}
//             type="submit" 
//             className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-indigo-500 hover:to-fuchsia-500 text-white p-4 rounded-xl font-bold text-lg transition-all">
//             Submit
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>

  //);
 

  import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';



const PostJob = () => {
    const {token}=useContext(UserContext);
    const [jobTitle, setJobTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [salary, setSalary] = useState("");
    const [status, setStatus] = useState("pending");
    const [shiftTimings, setShiftTimings] = useState([{ startTime: "", endTime: "" }]);
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");

    const handleShiftChange = (index, e) => {
        const { name, value } = e.target;
        const newShifts = [...shiftTimings];
        newShifts[index][name] = value;
        setShiftTimings(newShifts);
    };

    const addShift = () => {
        setShiftTimings([...shiftTimings, { startTime: "", endTime: "" }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const formData = {
            jobTitle,
            description,
            location: { address, city, state, country, zipCode },
            salary,
            status,
            shiftTimings,
            contact: { name: contactName, email: contactEmail, phone: contactPhone },
        };
        try {
            const response = await axios.post("http://localhost:4000/api/v1/jobs/create-jobs", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Job posted successfully!");
        } catch (error) {
            alert("Error submitting job post");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Post a Part-Time Job</h2>
            <input type="text" name="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Job Title" required />
            <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Job Description" required />
            
            <h3>Location</h3>
            <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
            <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
            <input type="text" name="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
            <input type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
            <input type="text" name="zipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="Zip Code" />

            <h3>Salary</h3>
            <input type="number" name="salary" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Salary" required />

            <h3>Contact Details</h3>
            <input type="text" name="contactName" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Contact Name" required />
            <input type="email" name="contactEmail" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="Email" required />
            <input type="text" name="contactPhone" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="Phone" required />
            
            <h3>Shift Timings</h3>
            {shiftTimings.map((shift, index) => (
                <div key={index}>
                    <input type="datetime-local" name="startTime" value={shift.startTime} onChange={(e) => handleShiftChange(index, e)} required />
                    <input type="datetime-local" name="endTime" value={shift.endTime} onChange={(e) => handleShiftChange(index, e)} required />
                </div>
            ))}
            <button type="button" onClick={addShift}>Add Shift</button>
            
            <button type="submit">Post Job</button>
        </form>
    );
};

export default PostJob;