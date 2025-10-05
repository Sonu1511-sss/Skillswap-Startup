import React from "react";
import ShubhamImg from "../assids/shubham-uprade.png";
import ChandrabhanImg from "../assids/chandrabhan.jpg";

const teamMembers = [
  {
    name: "Shubham Uprade",
    role: "Full Stack Developer",
    expertise: "React, Node.js, UI/UX Design",
    img: ShubhamImg,
  },
  {
    name: "Chandrabhan Gadeshwar",
    role: "Backend Developer",
    expertise: "Python, Node.js, REST APIs",
    img: ChandrabhanImg,
  },
];



export default function AboutUs() {
  return (
    <section className=" py-16 pt-[8rem] px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* SkillSwap Info */}
        <h2 className="text-4xl font-extrabold text-blue-500 mb-4">
          About SkillSwap
        </h2>
        <p className="text-blue-600 mb-8 text-lg">
          SkillSwap is a platform designed to connect learners and teachers. 
          We developed this platform to make learning and sharing skills easier, 
          bringing together like-minded individuals who want to grow together.
        </p>

        {/* Team Members */}
        <h3 className="text-3xl font-bold text-blue-500 mb-6">Meet Our Team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <img
                src={member.img}
                alt={member.name}
                className="w-60 h-60 object-cover rounded-lg shadow-md mb-4"
              />
              <h4 className="text-2xl font-bold text-blue-500">{member.name}</h4>
              <p className="text-gray-700 font-medium">{member.role}</p>
              <p className="text-gray-800 text-sm mt-2">{member.expertise}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
