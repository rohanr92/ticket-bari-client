import React, { useState } from 'react';
import Container from '../../../Container/Container';
import { useQuery } from '@tanstack/react-query';
import luxeLogo from '../../../../assets/LUXRIDE.png';
import carImage from '../../../../assets/car-1-min2.png';

const Banner = () => {
  const { data: districts = [], isLoading, error } = useQuery({
    queryKey: ['districts'],
    queryFn: () => fetch('/district.json').then(res => res.json()),
  });

  const [fromDistrict, setFromDistrict] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const from = e.target.departureStart.value;
    const to = e.target.departureEnd.value;
    const date = e.target.date.value;
    const time = e.target.time.value;
    console.log('From:', from, 'To:', to, 'Date:', date, 'Time:', time);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading districts</div>;

  return (
    <div className='bg-[#fdeeec82] bg-no-repeat bg-bottom bg-contain text-center relative md:h-[680px] pt-20 pb-10 md:p-20 md:flex justify-center px-10 mb-60'
      style={{ backgroundImage: `url(${luxeLogo})` }}>
      <Container>
        <div className='space-y-8'>
          <div>
            <h1 className='md:text-[65px] text-[#181a1f] font-semibold text-[35px] leading-11 md:leading-normal mb-3 md:mb-0'>
              The Global <span className='text-[#e95440]'>Chauffeur</span> Service
            </h1>
            <p>From business trips to leisure, we craft every journey with care.</p>
          </div>

          <div className='bg-white rounded-[8px]  md:rounded-full p-2 md:inline-block ' >
            <form action="" onSubmit={handleSubmit} className='md:flex gap-2 space-y-4 md:space-y-0 p-4 justify-center items-center'>
              <div>
                <input
                  type="date"
                  name="date"
                  className='py-2.5 px-6 ring-1 ring-gray-300 rounded-4xl w-full md:w-auto'
                />
              </div>

              <div>
                <input
                  type="time"
                  name="time"
                  className='py-2.5 px-6 ring-1 ring-gray-300 rounded-4xl  w-full md:w-auto'
                />
              </div>

              {/* Departure From */}
              <div>
                <select
                  className='py-2.5 px-6 ring-1 ring-gray-300 rounded-4xl  w-full md:w-auto'
                  name='departureStart'
                  onChange={(e) => setFromDistrict(e.target.value)}
                >
                  <option value="">From district</option>
                  {districts.map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              {/* Departure To */}
              <div>
                <select
                  className='py-2.5 px-6 ring-1 ring-gray-300 rounded-4xl  w-full md:w-auto'
                  name='departureEnd'
                >
                  <option value="">To district</option>
                  {districts
                    .filter(d => d.name !== fromDistrict)
                    .map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-[#d65a43] text-white px-12 py-2 rounded-full font-medium hover:opacity-90 transition cursor-pointer  w-full md:w-auto"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className=' md:inline-block gap-4'>
            <ul className="list-disc pl-6 gap-20 text-left md:flex justify-center">
              <li>20,000+ Destinations Domestics</li>
              <li>Million Trusted Clients</li>
              <li>7M+ Happy Customers</li>
              <li>24/7 Support</li>
            </ul>
          </div>
          <div className='text-center place-items-center mt-[50px]'><img src={carImage} alt="Car" className='absolute' /></div>


        </div>


      </Container>
    </div>
  );
};

export default Banner;
