
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const PostJob = () => {
  const { token } = useContext(UserContext); // Get token from AuthContext
  const navigate = useNavigate();

  // Job Form State
  const [jobData, setJobData] = useState({
    jobTitle: "",
    description: "",
    location: {
      address: "",
      city: "",
      state: "",
      zipcode: ""
    },
    details: {
      name: "",
      phoneNumber: "",
      email: ""
    },
    salary: "",
  });

  const [error, setError] = useState("");

  // Handle form input changes
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(token)
      const response = await axios.post(
        "http://localhost:4000/api/v1/jobs/create",
        jobData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        navigate("/jobs/get"); // Redirect after successful job post
      } else {
        setError(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      setError("Unable to post job. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Post a New Job</h2>
      {error && <div className="text-red-500">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            className="border p-2 w-full"
            value={jobData.jobTitle}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Description</label>
          <textarea
            name="description"
            className="border p-2 w-full"
            value={jobData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm">Address</label>
          <input
            type="text"
            name="address"
            className="border p-2 w-full"
            value={jobData.location.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">City</label>
          <input
            type="text"
            name="city"
            className="border p-2 w-full"
            value={jobData.location.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">State</label>
          <input
            type="text"
            name="state"
            className="border p-2 w-full"
            value={jobData.location.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Zipcode</label>
          <input
            type="text"
            name="zipcode"
            className="border p-2 w-full"
            value={jobData.location.zipcode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Salary</label>
          <input
            type="number"
            name="salary"
            className="border p-2 w-full"
            value={jobData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Contact Name</label>
          <input
            type="text"
            name="name"
            className="border p-2 w-full"
            value={jobData.details.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Contact Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            className="border p-2 w-full"
            value={jobData.details.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Contact Email</label>
          <input
            type="email"
            name="email"
            className="border p-2 w-full"
            value={jobData.details.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
