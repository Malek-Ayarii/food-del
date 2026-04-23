import './Add.css'
import { assets } from '../../assets/admin_assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'


const Add = ({ url }) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", Number(data.price));
            formData.append("category", data.category);
            formData.append("image", image);
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                })
                setImage(false);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error adding product");
        }
    }


    return (
        <div className='add'>
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} type="text" name="name" placeholder='Type here' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={(e) => setData({ ...data, description: e.target.value })} value={data.description} name="description" rows="6" placeholder='Write content'></textarea>
                </div>
                <div className="add-category">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={(e) => setData({ ...data, category: e.target.value })} value={data.category} name="category" id="">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Pizza">Pizza</option>
                            <option value="Noodles">Noodles</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Sweet">Sweet</option>
                            <option value="Rice">Rice</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input onChange={(e) => setData({ ...data, price: e.target.value })} value={data.price} type="number" name="price" placeholder='20$' />
                </div>
                <button type="submit" className='add-btn'>ADD PRODUCT</button>

            </form>

        </div>
    )
}

export default Add
