import "./List.css"
import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import { toast } from "react-toastify"

const List = ({url}) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
    }
  }

  const removeFood = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/food/remove`, { data: { id } });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error removing food item");
    }
  }
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List