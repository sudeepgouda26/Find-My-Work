import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { toast } from "react-toastify";

function MyJobs() {
  const [jobs, setJobs] = useState([]); // Ensure jobs is an array
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const userId = user?._id || ""; // Get logged-in user's ID

  console.log("Logged-in User ID:", userId);

  // Function to fetch all jobs posted by the logged-in user
  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/jobs/getmy-jobs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setJobs(response.data.jobs || []); // Ensure jobs is always an array
        } else {
          setError(response.data.message || "Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error.response?.data?.message || error.message);
        setError(error.response?.data?.message || "Failed to load jobs");
      }
    };

    fetchMyJobs();
  }, []);

  // Function to delete a job
  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/jobs/delete-jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        toast.success("Job deleted successfully");
        setJobs(jobs.filter((job) => job._id !== jobId)); // Remove deleted job from state
      } else {
        toast.error("Failed to delete the job.");
      }
    } catch (error) {
      console.error("Error deleting job:", error.response?.data || error.message);
      toast.error("Failed to delete the job.");
    }
  };

  return (
    <div className=" pt-36 min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="bg-black text-white p-6 rounded-lg text-center">
          <h1 className="text-2xl font-bold">Your Posted Jobs</h1>
        </header>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <div className="mt-6 grid grid-cols-3 gap-4">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <Card key={index} className="cursor-pointer">
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold">Title: {job.jobTitle}</h2>
                  <p>{job.description}</p>

                  <div>
                    <h3>Location:</h3>
                    <p>Address: {job.location?.address || "N/A"}</p>
                    <p>City: {job.location?.city || "N/A"}</p>
                    <p>State: {job.location?.state || "N/A"}</p>
                    <p>Zipcode: {job.location?.zipcode || "N/A"}</p>
                  </div>
                  <p>{job.status}</p>

                  <p className="mt-2 text-lg font-semibold">Salary: {job.salary}</p>

                  <div className="mt-3 flex gap-2">
                    <Button
                      className="bg-blue-500 text-white p-2 rounded-md"
                      onClick={() => navigate(`/update-job/${job._id}`)}
                    >
                      Update Job
                    </Button>

                    <Button
                      className="bg-red-500 text-white p-2 rounded-md"
                      onClick={() => handleDelete(job._id)}
                    >
                      Delete Job
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">No jobs posted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}


export default MyJobs;
