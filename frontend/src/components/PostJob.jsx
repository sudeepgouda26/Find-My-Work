import { useState, useContext,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserContext } from "../UserContext";

const PostJob = () => {
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect if user is not logged in
    }
  }, [token, navigate]);

  const [jobData, setJobData] = useState({
    jobTitle: "",
    description: "",
    location: { address: "", city: "", state: "", zipcode: "" },
    details: { name: "", phoneNumber: "", email: "" },
    salary: "",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in jobData.location) {
      setJobData((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value },
      }));
    } else if (name in jobData.details) {
      setJobData((prev) => ({
        ...prev,
        details: { ...prev.details, [name]: value },
      }));
    } else {
      setJobData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


  if (!token) {
    setError("You must be logged in to post a job.");
    return;
  }
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/jobs/create",
        jobData,
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201) {
        setSuccess("Job posted successfully!");
        setError("");
        navigate("/jobs/get");
      } else {
        setError(response.data.message || "Something went wrong.");
        setSuccess("");
      }
    } catch (error) {
      setError("Unable to post job. Please try again.");
      setSuccess("");
    }
  };

  return (
    
    <div className=" pt-36 min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-200 to-gray-700 p-6">
      <motion.div 
        className="w-full max-w-4xl bg-gray-900 shadow-xl rounded-xl p-8"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-red-400 mb-6">Post a New Job</h2>
        {error && <div className="text-green-500 text-center mb-4">{error}</div>}
        {success && <div className="text-red-500 text-center mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <motion.div whileHover={{ scale: 1.02 }} className="mb-4">
                <label className="block text-stone-100 font-medium">Job Title</label>
                <input 
                  type="text" name="jobTitle" required
                  placeholder="Enter job title"
                  className="w-full border border-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white"
                  value={jobData.jobTitle} onChange={handleChange}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-stone-100 font-medium">Description</label>
                <textarea 
                  name="description" required
                  placeholder="Enter job description"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white"
                  value={jobData.description} onChange={handleChange}
                ></textarea>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="mt-4">
                <label className="block text-stone-100 font-medium">Contact Name</label>
                <input 
                  type="text" name="name" required
                  placeholder="Enter contact name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white"
                  value={jobData.details.name} onChange={handleChange}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="mt-4">
                <label className="block text-stone-100 font-medium">Contact Email</label>
                <input 
                  type="email" name="email" required
                  placeholder="Enter contact email"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white"
                  value={jobData.details.email} onChange={handleChange}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="mt-4">
                <label className="block text-stone-100 font-medium">Contact Phone Number</label>
                <input 
                  type="tel" name="phoneNumber" required
                  placeholder="Enter phone number"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white"
                  value={jobData.details.phoneNumber} onChange={handleChange}
                />
              </motion.div>
            </div>

            <div>
              <motion.div whileHover={{ scale: 1.02 }} className="mb-4">
                <label className="block text-stone-100 font-medium">Address</label>
                <input 
                  type="text" name="address" required
                  placeholder="Enter address"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white"
                  value={jobData.location.address} onChange={handleChange}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="mt-4">
                <label className="block text-stone-100 font-medium">City</label>
                <input 
                  type="text" name="city" required
                  placeholder="Enter city name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white"
                  value={jobData.location.city} onChange={handleChange}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="mt-4">
                <label className="block text-stone-100 font-medium">State</label>
                <input 
                  type="text" name="state" required
                  placeholder="Enter state"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white"
                  value={jobData.location.state} onChange={handleChange}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="mt-4">
                <label className="block text-stone-100 font-medium">Zipcode</label>
                <input 
                  type="text" name="zipcode" required
                  placeholder="Enter zipcode"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white"
                  value={jobData.location.zipcode} onChange={handleChange}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="mt-4">
                <label className="block text-stone-100 font-medium">Salary</label>
                <input 
                  type="number" name="salary" required
                  placeholder="Enter salary"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white"
                  value={jobData.salary} onChange={handleChange}
                />
              </motion.div>
            </div>
          </div>

          <motion.button 
            type="submit"
            className="w-full bg-gradient-to-r from-rose-400 to-rose-600 text-white font-bold py-3 rounded-lg hover:scale-105 transition transform duration-300"
          >
            Post Job
          </motion.button>
        </form>
      </motion.div>
    </div>
    
  );
};

export default PostJob;
