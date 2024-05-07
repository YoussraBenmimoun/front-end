import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BillDetails() {
    const { id, bill_id } = useParams();
    const [bill, setBill] = useState(null);
    const [host, setHost] = useState(null);
    const mark_notification_as_read = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/mark_notification_as_read/${id}`);
            console.log(response.data)
        } catch (error) {
            console.error('Error marking notification as read', error);
        }
    }
    const get_bill = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/bills/${bill_id}`);
            console.log(response.data);
            setBill(response.data.bill);
            setHost(response.data.bill.host);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    const handlePayBill = () => {
        console.log("Payment logic goes here");
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    }

    useEffect(() => {
        mark_notification_as_read();
        get_bill();
    }, [])
    return (
        <div>
            <div style={styles.container}>
            {bill && host && (
                <div style={styles.billContainer}>
                    <p style={styles.billText}>Bill of the : {formatDate(bill.created_at)}</p>
                    <p style={styles.billText}>Host: {host.first_name} {host.last_name}</p>
                    <p style={styles.billText}>Total: {bill.total} DH</p>
                    <button onClick={handlePayBill} style={styles.payButton}>Pay Bill</button>
                </div>
            )}

            </div>
        </div>
    )
}
const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
    },
    billContainer: {
        backgroundColor: '#f4f4f4',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    },
    billText: {
        margin: '10px 0',
        fontSize: '16px'
    },
    payButton: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '20px',
        transition: 'background-color 0.3s',
    }
};
styles.payButtonHover = {
    backgroundColor: '#555',
};