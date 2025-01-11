import React from 'react'
import mainDish from '../../assets/images/category/mainDish.png'
import breakFast from '../../assets/images/category/breakFast.png'
import dessert from '../../assets/images/category/dessert.png'
import pizza from '../../assets/images/category/pizza.png'
const categoryitem=[
    {
        id:1,
        title:"main dish",
        desc:"{86 dishes}",
        image:mainDish,
    },
    {
        id:2,
        title:"break fast",
        desc:"{46 dishes}",
        image:breakFast,
    },
    {
        id:3,
        title:"dessert ",
        desc:"{100 dishes}",
        image:dessert
    },
    {
        id:4,
        title:"Browse All",
        desc:"{113 dishes}",
        image:pizza ,
    },
    
]
const Categories = () => {
  return (
    <div className='section-container py-16'>
    <div className=' text-center'>

        <p className='subtitle'>favourite Dishes </p>
        <h2 className='title'>popular Categories</h2>
    </div>
    {/* category card */}
    <div className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around mt-12 '>
    {
        categoryitem.map((item,index)=>(
            <div key={index} className=" shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all">
                <div className='flex w-full mx-auto items-center justify-center'>
                    <img src={item.image}  alt="item image" className='bg-[#6ba790] p-5 rounded-full w-28 h-28'/>
                </div>
                <div className='mt-5 space-y-1'>
                    {item.title}
                    <p>{item.desc}</p>
                </div>

            </div>
        ))
    }

    </div>
    </div>
  )
}

export default Categories