import React from "react";

const steps = [
  {
    number: 1,
    title: "Book Via App Or Web",
    description:
      "Enter your pickup & dropoff locations or the number of hours you wish to book a car and driver for.",
  },
  {
    number: 2,
    title: "Choose Your Ride",
    description:
      "On the day of your ride, you will receive two email and SMS updates – one informing you that.",
  },
  {
    number: 3,
    title: "Enjoy Your Ride",
    description:
      "After your ride has taken place, we would appreciate it if you could rate your car and driver.",
  },
];

const Process = () => {
  return (
    <div className="w-full py-20 bg-white">
      {/* Title */}
      <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center relative">

            {/* Step Circle */}
            <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center text-xl font-semibold text-gray-700">
              {step.number}
            </div>

            {/* Line connector - only show for step 1 & 2 */}
            {index !== steps.length - 1 && (
              <div className="hidden md:block absolute top-10 left-[198px] w-[292px] h-[2px] bg-gray-300"></div>
            )}

            {/* Title */}
            <h3 className="text-xl font-semibold mt-6">{step.title}</h3>

            {/* Description */}
            <p className="mt-3 max-w-xs text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Process;
