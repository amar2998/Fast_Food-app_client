import React from 'react'
import chef from '../../assets/images/chef.png'
import { FaStar } from 'react-icons/fa'
const Testimonial = () => {
    return (
        <div className='section-container'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
                <div className='md:w-1/2'>
                    <img src={chef} alt="chf" />
                </div>
                <div className='md:w-1/2'>
                    <div className=' text-left md:w-4/5'>

                        <p className='subtitle'> Testimonial </p>
                        <h2 className='title'>Customer Experience</h2>
                        <blockquote className='text-secondary'>
                            This food delivery app is a game changer! Easy to use, fast deliveries, and the customer service is outstanding!
                        </blockquote>
                        <div className=' flex items-center gap-4 flex-wrap'>
                            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src="https://images.pexels.com/photos/26100579/pexels-photo-26100579/free-photo-of-modern-elegance-with-sleek-glasses.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src="https://images.pexels.com/photos/16948489/pexels-photo-16948489/free-photo-of-young-girl.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src="https://images.pexels.com/photos/18394309/pexels-photo-18394309/free-photo-of-portrait-of-a-young-boy-with-a-shadowy-silhouette-against-the-wall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                                    </div>
                                </div>
                                <div className="avatar placeholder">
                                    <div className="bg-neutral text-neutral-content w-12">
                                        <span>+99</span>
                                    </div>
                                </div>
                            </div>
                            <div className=' space-y-1'>
                                <h5 className=' font-semibold'> customer feedback</h5>
                                <div className=' flex items-center gap-2'>
                                    <FaStar className='text-yellow-400'></FaStar>
                                    <span className=" font-medium">4.9</span><span className='text-[orange]'>(18.8k reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonial