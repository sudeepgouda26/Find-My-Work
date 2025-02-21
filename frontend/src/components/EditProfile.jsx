

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { toast } from "react-toastify";

const UpdateProfile = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [redirect,setRedirect] =useState(false);


    useEffect(() => {
        // Fetch current user data
        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/v1/user/get-user", {
                    method: "GET",
                    headers: {
                        Authorization:` Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = await response.json();
                if (data.success) {
                    setUser(data.user);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError("Failed to fetch user data");
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await fetch("http://localhost:4000/api/v1/user/update-user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:` Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();
            if (data.success) {
                toast.success("profile updated Successfully");
                setMessage("Profile updated successfully");
                localStorage.setItem("token", data.token); 
                navigate("/");
       
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Failed to update profile");
        }
        
    };

    return (
          <div className="pt-36">
            <div className=" max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-4">Update Profile</h2>

                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-500">{message}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={user.phoneNumber}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
            </div>
    );
};

export default UpdateProfile;
