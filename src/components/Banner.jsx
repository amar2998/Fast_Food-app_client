import React from 'react'
import burger from '../assets/images/burger.png'
import noodle from '../assets/images/noodle.jpg'
const Banner = () => {
  return (
    <div className=' section-container bg-gradient-to-r from-[#fafafa] from-0% to-[#fcfcfc] to-100%'>
      <div className='py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8'>
      {/* image */}
        <div className='md:w-1/2'>
          <img src={burger} alt='burger' />
          <div className='flex flex-col md:flex-row items-center justify-around -mt-12 gap-4'>
            <div className='flex items-center px-2 py-2 rounded-2xl gap-3 bg-white shadow-md w-64'>
              <img className=' rounded-xl' src={noodle} height={100} width={100} alt='food1' />
              <div className='space-y-1'>
                <h5 className=' font-medium mb-1'>spicy Noodle</h5>
                <div className="rating rating-sm">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-500" />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-500"
                    defaultChecked />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-500" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-500" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-500" readOnly />
                </div>
                <p className='text-[red]'>150.00 Rs</p>
              </div>
            </div>
            <div className='md:flex  hidden items-center px-2 py-2 rounded-2xl gap-3 bg-white shadow-md w-64'>
              <img className=' rounded-xl' src={noodle} height={100} width={100} alt='food1' />
              <div className='space-y-1'>
                <h5 className=' font-medium mb-1'>spicy Noodle</h5>
                <div className="rating rating-sm">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-500" />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-500"
                    defaultChecked />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-500" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-500" readOnly/>
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-500" readOnly/>
                </div>
                <p className='text-[red]'>150.00 Rs</p>
              </div>
            </div>
          </div>
        </div>
        {/* text */}
        <div className='md:w-1/2 space-y-7 px-4'>
          <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>Enjoy your favorite Korean food with <span className=' text-cusblue'>Fast Food! </span></h2>
          <p className='text-xl text-[#4a4a4a] mt-9'>fast food brings your favorite fast food from local restaurants to your doorstep quickly and effortlessly.</p>
          <button className='btn bg-cusblue px-8 py-3 font-semibold rounded-full'>Order now</button>
        </div>
      </div>
    </div>
  )
}

export default Banner