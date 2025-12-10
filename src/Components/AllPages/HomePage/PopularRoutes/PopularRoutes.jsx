import React from 'react';
import Container from '../../../Container/Container';
import { Link } from 'react-router';

// You must have Tailwind CSS installed and configured for these classes to work.

const PopularRoutes = () => {
  const routesData = [
    { name: "Dinajpur", details: "21 routes to/from this city" },
    { name: "Dhaka", details: "21 routes to/from this city" },
    { name: "Rajshahi", details: "21 routes to/from this city" },
    { name: "Khulna", details: "21 routes to/from this city" },
    { name: "Dhaka > Cox's Bazar", details: "1h 50m - 59 mi", highlight: true },
    { name: "Barishal", details: "21 routes to/from this city" },
    { name: "Rangpur", details: "21 routes to/from this city" },
    { name: "Kutubpur", details: "21 routes to/from this city" },
  ];

  const RouteCard = ({ name, details, highlight }) => (
    <div 
      className={`p-5 rounded-xl border transition duration-300 
        ${highlight 
          ? 'border-gray-400 bg-white hover:shadow-sm'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
        }`
      }
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {name}
      </h3>
      <p className="text-sm text-gray-500">
        {details}
      </p>
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-white">
        <Container
>    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
     
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[30px] md:text-[40px] font-bold">
            Most Popular Chauffeur Routes
          </h2>
          <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
            Experience seamless transfers on our most requested city-to-city journeys.
          </p>
        </div>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {routesData.map((route, index) => (
            <RouteCard
              key={index}
              name={route.name}
              details={route.details}
              highlight={route.highlight}
            />
          ))}
        </div>

     
        <div className="mt-12 text-center">
          <Link
            className="inline-flex items-center text-lg font-medium text-black hover:text-gray-700 transition duration-150"
          >
            See All 
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>
        </div>

      </div>
      </Container> 
    </section>
  );
};

export default PopularRoutes;