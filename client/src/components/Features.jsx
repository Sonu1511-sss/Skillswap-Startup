import React from "react";

const GettingStarted = () => {
  const steps = [
    {
      id: 1,
      title: "Create Your Profile",
      description:
        "Tell us what skills you have and what you want to learn. Add your availability and preferences.",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      title: "Find Your Match",
      description:
        "Browse skills or let our smart algorithm suggest perfect learning partners based on your interests.",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: 3,
      title: "Start Learning",
      description:
        "Connect with your match, schedule sessions, and begin your skill exchange journey!",
      color: "from-blue-300 to-blue-500",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500  pt-[6rem] text-center py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-white drop-shadow-md">
          Getting Started is Simple
        </h2>
        <p className="mt-2 text-blue-50 text-lg">
          Join thousands of learners already exchanging skills
        </p>

        {/* Steps */}
        <div className="mt-16 grid gap-12 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col items-center p-8 rounded-2xl shadow-xl bg-gradient-to-br ${step.color} text-white transform transition-all hover:-translate-y-3 hover:scale-105 hover:shadow-2xl`}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold bg-white text-blue-600 mb-4 shadow-md">
                {step.id}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-blue-50">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-white">
            Ready to Start Your Skill Journey?
          </h3>
          <p className="mt-2 text-blue-50 text-lg">
            Join our community and discover the power of collaborative learning
          </p>
          <button className="mt-6 px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-105">
            Join SkillSwap Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default GettingStarted;
