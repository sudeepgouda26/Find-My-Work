import React from 'react'
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Briefcase, MapPin } from "lucide-react";

function Jobs() {
  const jobs = [
      {
        title: "Sr. UX Designer",
        company: "Netflix",
        type: "Part-time",
        level: "Expert",
        remote: true,
        salary: "$195/hr",
        location: "San Francisco, USA",
        description:
          "Netflix is one of the world's leading streaming entertainment services...",
        skills: ["Wireframing", "Figma", "Adobe XD", "UX/UI Design"],
      },
      {
        title: "Product Designer",
        company: "AAA Game Studio",
        type: "Full-time",
        level: "Intermediate",
        remote: false,
        salary: "$210/hr",
        location: "Remote",
        description:
          "Welcome to LightSpeed LA, the first US-based AAA game development studio...",
        skills: ["UI Design", "Prototyping", "Figma"],
      },
      {
        title: "Product Designer",
        company: "AAA Game Studio",
        type: "Full-time",
        level: "Intermediate",
        remote: false,
        salary: "$210/hr",
        location: "Remote",
        description:
          "Welcome to LightSpeed LA, the first US-based AAA game development studio...",
        skills: ["UI Design", "Prototyping", "Figma"],
      },
      {
        title: "Product Designer",
        company: "AAA Game Studio",
        type: "Full-time",
        level: "Intermediate",
        remote: false,
        salary: "$210/hr",
        location: "Remote",
        description:
          "Welcome to LightSpeed LA, the first US-based AAA game development studio...",
        skills: ["UI Design", "Prototyping", "Figma"],
      },
      {
        title: "Product Designer",
        company: "AAA Game Studio",
        type: "Full-time",
        level: "Intermediate",
        remote: false,
        salary: "$210/hr",
        location: "Remote",
        description:
          "Welcome to LightSpeed LA, the first US-based AAA game development studio...",
        skills: ["UI Design", "Prototyping", "Figma"],
      },
    ];
    
    const [selectedJob, setSelectedJob] = useState(null);
    
    function JobSearch() {
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
                />
                <Button variant="outline">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </header>
    
            <div className="mt-6 grid grid-cols-3 gap-4 ">
              {jobs.map((job, index) => (
                <Card key={index} className="cursor-pointer" onClick={() => setSelectedJob(job)}>
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold">{job.title}</h2>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm">
                      <Briefcase className="w-4 h-4" />
                      {job.type}
                      {job.remote && <span className="bg-yellow-200 text-xs p-1 rounded">Remote</span>}
                    </div>
                    <p className="mt-2 text-lg font-semibold">{job.salary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
    
            {selectedJob && (
              <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold">{selectedJob.title}</h2>
                <p className="text-sm text-gray-600">{selectedJob.company}</p>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4" />
                  {selectedJob.location}
                </div>
                <p className="mt-4">{selectedJob.description}</p>
                <div className="mt-4">
                  <h3 className="font-semibold">Required Skills:</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedJob.skills.map((skill, idx) => (
                      <span key={idx} className="bg-gray-200 px-3 py-1 rounded-full text-sm">{skill}</span>
                    ))}
                  </div>
                </div>
                <Button className="mt-4">Apply Now</Button>
              </div>
            )}
          </div>
        </div>
    );
}
}



export default Jobs;
