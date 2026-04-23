import './PlaceOrder.css'
import { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StroreContext'
import { useNavigate } from 'react-router-dom'
const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prev => ({ ...prev, [name]: value }));
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach(item => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 7,
    }
    let response = await fetch(url + "/api/order/place", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token
      },
      body: JSON.stringify(orderData)
    });

    let responseData = await response.json();

    if (responseData.success) {
      window.location.href = responseData.session_url;
    } else {
      alert(responseData.message);
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [token])


  return (
    <form action="" className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input name="zipCode" onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip code' />
          <input name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="place-order-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() > 0 ? 7 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount() > 0 ? getTotalCartAmount() + 7 : 0}</p>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder