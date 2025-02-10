import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Import, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../UserContext';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const userId = user?._id || ""; // Extracting userId safely

  console.log("Logged-in User ID:", userId);

  const handleDelete = async (job) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/jobs/delete-jobs/${job._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.data.success) {
        alert("Job deleted successfully");
        navigate("/"); // Redirect to home or job list
      }
    } catch (error) {
      console.error("Error deleting job:", error.response?.data || error.message);
      alert("Failed to delete the job.");
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/jobs/get-jobs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="bg-black text-white p-6 rounded-lg flex justify-between items-center">
          <h1 className="text-2xl font-bold">Find Your Dream Job Here ✨</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Job title or keyword"
              className="p-2 rounded-lg text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {jobs
            .filter((job) => job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((job, index) => (
              <Card key={index} className="cursor-pointer" onClick={() => setSelectedJob(job)}>
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

                  <div className="flex flex-col">
                    <p>
                      <strong>Contact Name:</strong> {job.details?.name || "N/A"}
                    </p>
                    <p>
                      <strong>Phone:</strong>
                      <a
                        href={`tel:${job.details?.phoneNumber}`}
                        className="text-blue-500 underline ml-1"
                      >
                        {job.details?.phoneNumber || "N/A"}
                      </a>
                    </p>
                    <p>
                      <strong>Email:</strong>
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${job.details?.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-500 underline ml-1"
                      >
                        Send via Gmail
                      </a>
                    </p>
                    <p>
                      <strong>WhatsApp:</strong>
                      <a
                        href={`https://wa.me/${job.details?.phoneNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 underline ml-1"
                      >
                        Chat on WhatsApp
                      </a>
                    </p>
                  </div>

                  <p className="mt-2 text-lg font-semibold">Salary: {job.salary}</p>

                  {job.contact?.postedBy?.toString() === userId && (
                    <div>
                      <button
                        onClick={() => navigate(`/update-job/${job._id}`)}
                        className="bg-blue-500 text-white p-2 rounded-md"
                      >
                        Update Job
                      </button>
                    </div>
                  )}

                  {job.contact?.postedBy === userId && (
                    <button
                      onClick={() => handleDelete(job)}
                      className="bg-red-500 text-white p-2 rounded-md"
                    >
                      Delete Job
                    </button>
                  )}
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
