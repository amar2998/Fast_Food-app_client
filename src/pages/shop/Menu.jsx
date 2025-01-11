import React, { useEffect, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import Card from '../../components/Card';
const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [filterItems, setFilterItems] = useState([]);
    const [selectcategory, setSelectcategory] = useState("all");
    const [sortOptions, setSortOption] = useState("default");
    const [currPage,setCurrpage]=useState(1);
    const [itemsPerPage]=useState(6);



    // loading
    useEffect(() => {
        // fetch data
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:6001/menu")
                const data = await response.json();
                setMenu(data);
                setFilterItems(data);

            } catch (error) {
                console.log("error fetching data");


            }
        };
        //calling
        fetchData();
    }, []);
    //filtering
    const filterItem = (category) => {
        const fltred = category === "all" ? menu : menu.filter((item) => item.category === category);
        setFilterItems(fltred);
        setSelectcategory(category);
        setCurrpage(1);

    }

    // show all data
    const showAll = () => {
        setFilterItems(menu);
        setSelectcategory("all");
        setCurrpage(1)

    }

    // sorting a-z z-a low to high price and vice vesa
    const handleSortChange = (option) => {
        setSortOption(option);
        let sorteditem = [...filterItems];
        switch (option) {
            case "A-Z":
                sorteditem.sort((a, b) => a.name.localeCompare(b.name));

                break;
            case "Z-A":
                sorteditem.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "low-high":
                sorteditem.sort((a, b) => a.price - b.price);
                break;
            case "high-low":
                sorteditem.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }
        setFilterItems(sorteditem);
        setCurrpage(1);
    }

    //pagination
    const indexLastItem=currPage*itemsPerPage;
    const indexofFirstItem=indexLastItem-itemsPerPage;
    const curritems=filterItems.slice(indexofFirstItem , indexLastItem)
    const pagination=(pagenumber)=>{
        setCurrpage(pagenumber);
    }




    return (
        <div>
            {/* menu banner */}
            <div className=' section-container bg-gradient-to-r from-[#fafafa] from-0% to-[#fcfcfc] to-100%'>
                <div className='py-48 flex flex-col justify-center items-center gap-8'>

                    {/* text */}
                    <div className=' text-center space-y-7 px-4'>
                        <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>Enjoy your favorite food with <span className=' text-cusblue'>Fast Food! </span></h2>
                        <p className='text-xl text-[#4a4a4a] md:w-4/5 mx-auto'>fast food brings your favorite fast food from local restaurants to your doorstep quickly and effortlessly.</p>
                        <button className='btn bg-cusblue px-8 py-3 font-semibold rounded-full'>Order now</button>
                    </div>
                </div>
            </div>
            {/* shopping section */}
            <div className='section-container'>
                {/* btns and filter */}
                <div className=' flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8'>
                    {/* btns */}
                    <div className=' flex flex-row justify-start md:items-center md:gap-8 gap4 flex-wrap '>
                        <button className={selectcategory === "all" ? "active":""} onClick={showAll}>all</button>
                        <button className={selectcategory ==="salad"?"active":""} onClick={()=>filterItem("salad")}>salad</button>
                        <button className={selectcategory ==="soup"?"active":""} onClick={()=>filterItem("soup")} >soup</button>
                        <button className={selectcategory ==="dessert"?"active":""} onClick={()=>filterItem("dessert")}>dessert</button>
                        <button className={selectcategory ==="drinks"?"active":""} onClick={()=>filterItem("drinks")}>drinks</button>
                    </div>
                    {/* scrool buttons */}
                    <div className=' flex justify-end mb-4 rounded-sm'>
                        <div className=' bg-black p-2'>
                            <FaFilter className=' h-4 w-4 text-white'/>
                        </div>
                        {/* sorting */}
                        <select name='sort' id="sort" onChange={(e)=>handleSortChange(e.target.value)} value={sortOptions} className=' bg-black text-white px-2 py-1 rounded-sm'>
                            <option value="default">default</option>
                            <option value="A-Z">A - Z</option>
                            <option value="Z-A">Z - A</option>
                            <option value="low-high">low - high</option>
                            <option value="high-low">high - low</option>
                            
                        </select>
                    </div>
                </div>
                <div className=' grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 '>
                    {
                        curritems.map((item) => (
                            <Card key={item._id} item={item}/>
                        

                        ))
                    }
                </div>
            </div>
            {/* pagination */}
            <div className=' flex justify-center my-8'>
                {
                    Array.from({length:Math.ceil(filterItems.length / itemsPerPage)}).map((_,index)=>(
                        <button key={index+1}
                        onClick={()=>pagination(index+1)}
                        className={`mx-1 px-3 py-1 rounded-full ${currPage === index +1 ?"bg-green-600 text-white" : " bg-gray-400"}`}>
                                {
                                    index  + 1  
                                }
                        </button>
                    ))
                }
            </div>

        </div>
    )
}

export default Menu