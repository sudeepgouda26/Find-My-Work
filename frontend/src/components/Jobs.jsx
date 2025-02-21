import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Import, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../UserContext';
import { Phone, Mail, MessageCircle } from "lucide-react";
import { toast } from "react-toastify";

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
        toast.success("Job deleted successfully");
        navigate("/"); // Redirect to home or job list
      }
    } catch (error) {
      console.error("Error deleting job:", error.response?.data || error.message);
      toast.error("Failed to delete the job.");
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
    <div className="pt-36 min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="bg-lime-300 text-slate-950 p-6 rounded-lg flex justify-between items-center shadow-lg">
          <h1 className="text-2xl font-bold">Find Your Job Here ✨</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Job title or keyword"
              className="p-2 rounded-lg text-black shadow-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs
            .filter((job) => job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((job, index) => (
              <Card key={index} className="cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300" onClick={() => setSelectedJob(job)}>
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold">{job.jobTitle}</h2>
                  <p>{job.description}</p>
                  <div>
                    <h3 className="font-bold mt-2">Location:</h3>
                    <p>Address: {job.location?.address || "N/A"}</p>
                    <p>City: {job.location?.city || "N/A"}</p>
                    <p>State: {job.location?.state || "N/A"}</p>
                    <p>Zipcode: {job.location?.zipcode || "N/A"}</p>
                  </div>
                  <div className="flex flex-col mt-4">
                    <p>
                      <strong>Contact Name: </strong> {job.details?.name || "N/A"}
                    </p>
                    <div className="flex justify-around mt-2">
                      <p className="flex items-center">
                        <Phone className="w-5 h-5 text-blue-500 mr-1" />
                        <a
                          href={`tel:${job.details?.phoneNumber}`}
                          className="text-blue-500 underline"
                        >
                          {job.details?.phoneNumber || "N/A"}
                        </a>
                      </p>
                      <p className="flex items-center">
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${job.details?.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-500 underline"
                        >
                          <Mail className="w-5 h-5 text-red-500 mr-1" />
                        </a>
                      </p>
                      <p className="flex items-center">
                        <a
                          href={`https://wa.me/${job.details?.phoneNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 underline"
                        >
                          <MessageCircle className="w-5 h-5 text-green-500 mr-1" />
                        </a>
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-lg font-bold">Salary: {job.salary}</p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
