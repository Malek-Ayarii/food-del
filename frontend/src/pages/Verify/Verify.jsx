import { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StroreContext';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("order_id")
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await fetch(url + "/api/order/verify", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ success, orderId })
        });
        const responseData = await response.json();
        console.log("Verification Response:", responseData);
        if (responseData.success) {
            navigate("/myorders");
        } else {
            navigate("/")
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [])

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    )
}

export default Verify