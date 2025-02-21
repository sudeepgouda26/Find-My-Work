import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

function Stats() {
    useContext(UserContext);
    const [stats, setStats] = useState([]);
    const [monthlyStats, setMonthlyStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/jobs/jobs-stats", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });

                if (response.data.success) {
                    setStats(response.data.stats);
                    setMonthlyStats(response.data.monthlyStats);
                } else {
                    setError("Failed to load stats");
                }
            } catch (err) {
                setError("Error fetching job stats");
                console.error("Error:", err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg shadow-lg">{error}</p>;
    }

    // Function to format month number into readable format
    const formatMonth = (month, year) => {
        if (!month || !year) return "Unknown";
        const date = new Date(year, month - 1);
        return date.toLocaleString("default", { month: "long", year: "numeric" });
    };

    return (
        <div className="pt-32">
            <div className="p-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-2xl max-w-4xl mx-auto mt-10 backdrop-blur-lg bg-opacity-80">
                <h2 className="text-4xl font-extrabold mb-6 text-center">
                    📊 Job Statistics
                </h2>

                {/* Job Status Stats */}
                <div className="mb-8 bg-white p-6 rounded-lg shadow-md text-gray-900">
                    <h3 className="text-2xl font-bold mb-4">🛠️ Job Status Counts</h3>
                    <ul className="space-y-3">
                        {stats.length > 0 ? (
                            stats.map((stat, index) => (
                                <li 
                                    key={index} 
                                    className={`flex items-center text-lg font-medium px-4 py-2 rounded-md shadow ${
                                        stat._id === "pending" ? "bg-yellow-200 text-yellow-800" :
                                        stat._id === "completed" ? "bg-green-200 text-green-800" :
                                        stat._id === "failed" ? "bg-red-200 text-red-800" :
                                        "bg-gray-200 text-gray-800"
                                    }`}
                                >
                                    <span className="w-4 h-4 rounded-full mr-3" 
                                          style={{ backgroundColor: 
                                              stat._id === "pending" ? "#FBBF24" :
                                              stat._id === "completed" ? "#10B981" :
                                              stat._id === "failed" ? "#EF4444" :
                                              "#6B7280" }}></span>
                                    <strong>{stat._id.charAt(0).toUpperCase() + stat._id.slice(1)}</strong>: {stat.count} jobs
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-600">No job status data available.</p>
                        )}
                    </ul>
                </div>

                {/* Monthly Job Postings */}
                <div className="bg-white text-gray-900 shadow-lg rounded-lg overflow-hidden"></div>
                    <h3 className="bg-indigo-700 text-white text-lg font-semibold p-4">📅 Monthly Job Postings</h3>
                    {monthlyStats.length > 0 ? (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-indigo-300 text-indigo-900">
                                    <th className="p-4 text-left">Month</th>
                                    <th className="p-4 text-left">Number of Jobs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {monthlyStats.map((stat, index) => (
                                    <tr 
                                        key={index} 
                                        className="border-t transition duration-300 hover:bg-indigo-100"
                                    >
                                        <td className="p-4">{formatMonth(stat._id.month, stat._id.year)}</td>
                                        <td className="p-4">{stat.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="p-4 text-gray-600">No job posting data available.</p>
                    )}
                </div>
            </div>
        
    );
}

export default Stats;
