import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TbBowlSpoonFilled } from "react-icons/tb";
import { useForm } from "react-hook-form";
import useAxios from '../../hooks/useAxios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import swal from 'sweetalert';

const AlterItems = () => {
  const { id } = useParams();  // Get the id from the URL
  const [item, setItem] = useState(null); // State for single item
 
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:6001/menu/${id}`);
        const data = await response.json();
        setItem(data);  // Set the single item in state
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching item:', error);
        // setLoading(false); // Stop loading even on error
      }
    };

    fetchData();
  }, [id]);

  const { register, handleSubmit, reset } = useForm();
  const AxiosPublic = useAxios();
  const Axiossecure = useAxiosSecure();

  const imagehost = "4f38c41e127e4e99c1479ffef382d243";
  const imagehost_Api = `https://api.imgbb.com/1/upload?key=${imagehost}`;

  const onSubmit = async (data) => {
    // Prepare FormData to upload image if an image is provided
    let imageUrl = item?.image; // Default to existing image URL
    if (data.image && data.image[0]) {
      const formData = new FormData();
      formData.append('image', data.image[0]);
  
      try {
        const hostingImage = await AxiosPublic.post(imagehost_Api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        if (hostingImage.data.success) {
          imageUrl = hostingImage.data.data.display_url; // Update image URL
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        swal("Error!", "There was an issue uploading the image. Please try again.", "error");
        return; // Exit early if image upload fails
      }
    }
  
    // Create the menuNew object and only add fields that were updated
    const menuNew = {};
    if (data.name) menuNew.name = data.name;
    if (data.category) menuNew.category = data.category;
    if (data.price) menuNew.price = parseFloat(data.price);
    if (data.recipe) menuNew.recipe = data.recipe;
    if (imageUrl) menuNew.image = imageUrl; // Add image only if updated
  
    try {
      // Update the item using PUT request
      const postMenu = await Axiossecure.put(`/menu/${item._id}`, menuNew);
  
      if (postMenu.status === 200) {
        reset(); // Reset form after successful submission
        swal("Good job!", "Your item is saved!", "success");
  
        // Optionally reload the page to reflect the changes
        // window.location.reload();
      }
    } catch (error) {
      console.error('Error saving item:', error);
      swal("Error!", "There was an issue saving the item. Please try again.", "error");
    }
  };
  


  return (
    <div className=' w-full md:w-[870px] px-4 mx-auto'>
      <h2 className=' text-2xl font-semibold my-4 '> Update <span className=' text-cusblue'>Menu</span></h2>

      {/* Form input */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-control w-full'>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Recipe name</span>
              </div>
              <input
                type="text"
                defaultValue={item?.name || ''}
                placeholder="Recipe name"
                className="input input-bordered w-full"
                {...register("name")}
              />
            </label>
          </div>

          <div className='flex items-center gap-4'>
            {/* Category selection */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className="select select-bordered"
                defaultValue={item?.category || ''}
                {...register("category")}
              >
                <option value={"salad"}>salad</option>
                <option value={"drinks"}>drinks</option>
                <option value={"popular"}>popular</option>
                <option value={"dessert"}>dessert</option>
                <option value={"pizza"}>pizza</option>
                <option value={"soup"}>soup</option>
                <option value={"offered"}>offered</option>
              </select>
            </div>

            {/* Price input */}
            <div className='form-control w-full'>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Price</span>
                </div>
                <input
                  type="number"
                  defaultValue={item?.price || ''}
                  placeholder="Recipe price"
                  className="input input-bordered w-full"
                  {...register("price")}
                />
              </label>
            </div>
          </div>

          {/* Recipe description */}
          <div>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                defaultValue={item?.recipe || ''}
                placeholder="Description"
                {...register("recipe")}
              ></textarea>
            </label>
          </div>

          {/* File input */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Pick a file</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              {...register("image")}
            />
          </div>

          {/* Submit button */}
          <div className="flex md:justify-center">
            <button className='btn bg-cusblue text-white px-6'>
              <TbBowlSpoonFilled /> update item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlterItems;
