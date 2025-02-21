import React from "react";
import { Users, Briefcase, Heart, Globe, Shield, Lightbulb } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-10 flex flex-col items-center justify-center">
      <div className="max-w-4xl text-center">
        {/* Header Section */}
        <h1 className="text-5xl font-extrabold mb-6">About</h1>
        <p className="text-lg opacity-90 mb-8">
          "Find My Work" is an innovative platform that connects job seekers with the right opportunities. Built using the MERN stack, we aim to streamline the hiring process and empower users to find meaningful work easily.
        </p>

        {/* Feature Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-xl flex flex-col items-center">
            <Users className="w-14 h-14 text-blue-500 mb-3" />
            <h3 className="text-xl font-semibold">Community</h3>
            <p className="text-sm text-gray-600 mt-2">A network of professionals growing together.</p>
          </div>

          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-xl flex flex-col items-center">
            <Briefcase className="w-14 h-14 text-green-500 mb-3" />
            <h3 className="text-xl font-semibold">Opportunities</h3>
            <p className="text-sm text-gray-600 mt-2">Find jobs that align with your skills and goals.</p>
          </div>

          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-xl flex flex-col items-center">
            <Heart className="w-14 h-14 text-red-500 mb-3" />
            <h3 className="text-xl font-semibold">Passion</h3>
            <p className="text-sm text-gray-600 mt-2">Empowering individuals to pursue their careers.</p>
          </div>

          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-xl flex flex-col items-center">
            <Globe className="w-14 h-14 text-yellow-500 mb-3" />
            <h3 className="text-xl font-semibold">Global Reach</h3>
            <p className="text-sm text-gray-600 mt-2">Connecting talents with opportunities worldwide.</p>
          </div>

          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-xl flex flex-col items-center">
            <Shield className="w-14 h-14 text-purple-500 mb-3" />
            <h3 className="text-xl font-semibold">Security</h3>
            <p className="text-sm text-gray-600 mt-2">Ensuring data privacy and secure job applications.</p>
          </div>

          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-xl flex flex-col items-center">
            <Lightbulb className="w-14 h-14 text-orange-500 mb-3" />
            <h3 className="text-xl font-semibold">Innovation</h3>
            <p className="text-sm text-gray-600 mt-2">Leveraging technology to simplify job searching.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
