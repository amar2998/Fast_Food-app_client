import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from '../../components/Card';
import { FaAngleLeft } from "react-icons/fa6"
import { FaAngleRight } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';


const Simplenextarrow=(props)=>{
  const publicaxios=useAxios();
  const {className,style,onClick}=props;
  return (
    <div className={className} style={{...style ,display:"block" ,backgroundColor:"red"} } onClick={onClick} >
      next
    </div>
    
  );
};

const SimpleprevArrow=(props)=>{
  const {className,style,onClick}=props;
  return (
    <div className={className} style={{...style ,display:"block" ,backgroundColor:"green"} } onClick={onClick} >
      previous
    </div>
    
  );
}
const SpecialDishes = () => {
  const [recipes,setRecipes]=useState([])
  const slider=React.useRef(null)
  useEffect(()=>{
   fetch('http://localhost:6001/menu')
   .then(res=> res.json())
   .then(data =>{
    const specials= data.filter((item)=>item.category === 'popular')
    setRecipes(specials);
   })
  },[]);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],


    nextArrow:<Simplenextarrow/>,
    prevArrow:<SimpleprevArrow/>
  };
  return (
    <div className='section-container my-20 relative'>
      <div className='text-left '>
      <p className='subtitle'>special Dishes </p>
      <h2 className='title md:w-[520px]' >popular dishes</h2>
      </div>
      {/* arrow btn */}
      <div className='md:absolute right-3 top-8 mb-10 md:mr-24'>
      <button onClick={()=>slider?.current?.slickPrev()}
      className='btn p-2 rounded-full ml-5'>
        <FaAngleLeft className='w-8 h-8 p-1 '/>
      </button>
        <button onClick={()=>slider?.current?.slickNext()} 
        className='btn p-2 rounded-full ml-5'>
          <FaAngleRight className='w-8 h-8 p-1'/>
        </button>

      </div>
      <Slider ref={slider} {...settings} className='overflow-hidden mt-10 space-x-5'>
      {
        recipes.map((item)=>(
          <Card key={item._id} item={item}/>
        ))
      }

      </Slider>
    </div>
  );
};

export default SpecialDishes