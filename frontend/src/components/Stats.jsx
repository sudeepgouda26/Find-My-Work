import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

function Stats() {
    const { user } = useContext(UserContext);
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

    if (loading) return <p>Loading job statistics...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    // Function to format month number into readable format
    const formatMonth = (month, year) => {
        if (!month || !year) return "Unknown";
        const date = new Date(year, month - 1); // Month is 0-based in JS Date
        return date.toLocaleString("default", { month: "long", year: "numeric" });
    };

    return (
        <div className="p-5 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center">Job Statistics</h2>

            {/* Job Status Stats */}
            <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Job Status Counts</h3>
                <ul className="list-disc pl-5 space-y-2">
                    {stats.length > 0 ? (
                        stats.map((stat, index) => (
                            <li key={index} className="text-gray-700">
                                <strong>{stat._id}</strong>: {stat.count} jobs
                            </li>
                        ))
                    ) : (
                        <p>No job status data available.</p>
                    )}
                </ul>
            </div>

            {/* Monthly Job Postings */}
            <div>
                <h3 className="text-2xl font-semibold mb-4">Monthly Job Postings</h3>
                {monthlyStats.length > 0 ? (
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-4 text-left">Month</th>
                                <th className="border p-4 text-left">Number of Jobs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyStats.map((stat, index) => (
                                <tr key={index} className="border-t">
                                    <td className="border p-4">{formatMonth(stat._id.month, stat._id.year)}</td>
                                    <td className="border p-4">{stat.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No job posting data available.</p>
                )}
            </div>
        </div>
    );
}

export default Stats;
