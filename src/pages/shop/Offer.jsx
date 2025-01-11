import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';

const Offer = () => {
  const [menu, setMenu] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    // fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/menu`);
        const data = await response.json();

        // Filtering items with category "offered"
        const offeredItems = data.filter(item => item.category === "offered");
        setMenu(offeredItems);
      } catch (error) {
        console.log("error fetching data");
      }
    };

    // Calling the fetch function
    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastItem = currPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = menu.slice(indexOfFirstItem, indexOfLastItem);

  const pagination = (pageNumber) => {
    setCurrPage(pageNumber);
  };

  return (
    <div>
      {/* Menu banner */}
      <div className='section-container bg-gradient-to-r from-[#fafafa] from-0% to-[#fcfcfc] to-100%'>
        <div className='py-48 flex flex-col justify-center items-center gap-8'>
          {/* Text */}
          <div className='text-center space-y-7 px-4'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
             Offered <span className='text-cusblue'>Meals</span>
            </h2>
            <p className='text-xl text-[#4a4a4a] md:w-4/5 mx-auto'>
              Fast Food brings your favorite fast food from local restaurants to your doorstep quickly and effortlessly.
            </p>
            <button className='btn bg-cusblue px-8 py-3 font-semibold rounded-full'>Order now</button>
          </div>
        </div>
      </div>

      {/* Shopping section */}
      <div className='section-container'>
        {/* Menu items */}
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
          {currentItems.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className='flex justify-center my-8'>
        {Array.from({ length: Math.ceil(menu.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => pagination(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currPage === index + 1 ? 'bg-green-600 text-white' : 'bg-gray-400'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Offer;
