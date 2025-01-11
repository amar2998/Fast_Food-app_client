import React from 'react'
import salad from '../../assets/images/salad.png'
import shopping from '../../assets/images/shopping.png'
import clock from '../../assets/images/clock.png'
import gift from '../../assets/images/gift-card.png'
const serviceList=[
    {
        id:1,
        title:"Catering",
        desc:"offers customized meals and setup for events, ensuring top-quality service",
        image:salad,
    },
    {
        id:1,
        title:"Catering",
        desc:"offers customized meals and setup for events, ensuring top-quality service",
        image:shopping,
    },
    {
        id:1,
        title:"Catering",
        desc:"offers customized meals and setup for events, ensuring top-quality service",
        image:clock,
    },
    {
        id:1,
        title:"Catering",
        desc:"offers customized meals and setup for events, ensuring top-quality service",
        image:gift,
    },
]
const Service = () => {
    return (
        <div className="section-container my-16">
            <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
                <div className='md:w-1/2'>

                    <div className=' text-left md:w-4/5'>

                        <p className='subtitle'> Our services </p>
                        <h2 className='title'>Exquisite, delicious, and fast service</h2>
                        <p className='text-secondary'>
                            Multiple payment options including cards, wallets, and cash on delivery.
                            Scheduled delivery for later, letting you order ahead of time.
                            Exclusive discounts and offers for frequent users.
                            Seamless reorder option for your favorite meals.
                        </p>
                        <button className='btn bg-cusblue text-white px-8 py-3 rounded-full'>explore</button>

                    </div>
                    </div>
                    <div className='md:w-1/2'>
                        <div className='grid sm:grid-cols-2 grid-cols-1 gap-8 items-center'>
                            {
                                serviceList.map((service)=>
                                <div key={service.id} className=' shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green-500 cursor-pointer hover:border-indigo-600 transition-all duration-200 hover:border' >
                                <img src={service.image} alt='serviImg' className=' mx-auto h-12 w-12' />
                                <h5 className=' pt-3 font-semibold'>{service.title}</h5>
                                <h5 className='text-cusblue'>{service.desc}</h5>

                                </div>
                                )
                            }
                        </div>
                    </div>
                
            </div>

        </div>
    )
}

export default Service