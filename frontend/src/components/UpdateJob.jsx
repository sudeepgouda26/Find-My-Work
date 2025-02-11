import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

function UpdateJob() {
    const { jobId } = useParams(); // Get jobId from URL
    let navigate = useNavigate();
    const { user } = useContext(UserContext);
    const userId = user?._id || "";

    const [jobData, setJobData] = useState({
        jobTitle: "",
        description: "",
        status: "pending", // Initialize status with default value
        location: { address: "", city: "", state: "", zipcode: "" },
        salary: "",
        details: { name: "", phoneNumber: "", email: "" }
    });
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!jobId) {
            setError("No jobId found in URL.");
            setLoading(false);
            return;
        }

        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/jobs/${jobId}`);

                if (response.data.success) {
                    setJobData(response.data.job);
                    setIsAuthorized(response.data.job?.contact?.postedBy === userId);
                   
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError("Failed to fetch job details.");
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [jobId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNestedChange = (e, field) => {
        const { name, value } = e.target;
        setJobData((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/api/v1/jobs/update-jobs/${jobId}`, jobData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            if (response.data.success) {
                alert("Job updated successfully!");
                navigate('/');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError("Failed to update job.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!isAuthorized) return <p>You are not authorized to update this job.</p>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Update Job</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="jobTitle"
                    value={jobData.jobTitle}
                    onChange={handleChange}
                    placeholder="Job Title"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <textarea
                    name="description"
                    value={jobData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <select
                    name="status"
                    value={jobData.status}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                    <option value="accepted">Accepted</option>
                </select>

                <input
                    type="number"
                    name="salary"
                    value={jobData.salary}
                    onChange={handleChange}
                    placeholder="Salary"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <h3 className="text-xl font-semibold mt-4">Location</h3>
                <input
                    type="text"
                    name="address"
                    value={jobData.location.address}
                    onChange={(e) => handleNestedChange(e, "location")}
                    placeholder="Address"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="city"
                    value={jobData.location.city}
                    onChange={(e) => handleNestedChange(e, "location")}
                    placeholder="City"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="state"
                    value={jobData.location.state}
                    onChange={(e) => handleNestedChange(e, "location")}
                    placeholder="State"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="zipcode"
                    value={jobData.location.zipcode}
                    onChange={(e) => handleNestedChange(e, "location")}
                    placeholder="Zipcode"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <h3 className="text-xl font-semibold mt-4">Details</h3>
                <input
                    type="text"
                    name="name"
                    value={jobData.details.name}
                    onChange={(e) => handleNestedChange(e, "details")}
                    placeholder="Contact Name"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="phoneNumber"
                    value={jobData.details.phoneNumber}
                    onChange={(e) => handleNestedChange(e, "details")}
                    placeholder="Phone Number"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="email"
                    name="email"
                    value={jobData.details.email}
                    onChange={(e) => handleNestedChange(e, "details")}
                    placeholder="Email"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Update Job
                </button>
            </form>
        </div>
    );
}

export default UpdateJob;
