import React from 'react';
import Marquee from "react-fast-marquee";
import { MdArrowOutward } from "react-icons/md";
import Container from '../../../Container/Container';



const blogData = [
  {
    date: "18.",
    month: "April, 2024",
    title: "Escaping London for a relaxing long weekend",
    category: "Car Rent",
    description:
      "Explore the picturesque countryside of England, such as the Cotswolds, Lake District, or Peak District.",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
  },
  {
    date: "18.",
    month: "April, 2024",
    title: "Plan the perfect NYC Memorial Day weekend",
    category: "Limousine",
    description:
      "Pack only what you need and avoid overpacking to streamline the check-in and security screening...",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    date: "18.",
    month: "April, 2024",
    title: "3 reasons to swap your short-haul flight for a road trip",
    category: "Car Rent",
    description:
      "Road trips offer unparalleled flexibility and the opportunity for spontaneous exploration.",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
  },
  {
    date: "18.",
    month: "April, 2024",
    title: "The most efficient airlines and airports globally",
    category: "Limousine",
    description:
      "Carry a reusable water bottle and snacks to stay hydrated and energized throughout your journey.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
];


const Blog = () => {
    return (
        <div>
            <Container>
            <section className="py-16 w-full bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-semibold">Latest From News</h2>
          <a href="#" className="text-sm font-medium flex items-center gap-1">
            More News <MdArrowOutward />
          </a>
        </div>

        <Marquee gradient={false} speed={40} pauseOnHover={true}>
          <div className="flex">
            {blogData.map((item, index) => (
              <div
                key={index}
                className="w-[360px] bg-white rounded-xl border border-gray-200 overflow-hidden md:mx-3 mx-6"
              >
                <div className="relative w-full h-56">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 text-white text-3xl font-bold">
                    {item.date}
                    <div className="text-sm font-normal">{item.month}</div>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm text-gray-600 mb-1">{item.category}</p>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>

                  <button className="mt-6 w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition">
                    <MdArrowOutward />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
    </Container>
        </div>
    );
};

export default Blog;