import axios from "axios";
import { useState, useEffect } from "react";

const ClientReservations = () =>{
    const [reservations, setReservations] = useState([]);
    const [clientId, setClientId] = useState(null);

    const fetchClientId = () => {
        axios.get(`http://localhost:8000/api/client/id}`)
            .then(response => {
                setClientId(response.data.id);
            })
            .catch(error => {
                console.error('Error fetching client ID:', error);
            });
    };
    const get_reservation_id = (clientId) =>{
        console.log("Client ID:", clientId);

        if (!clientId) {
            console.error('Error: Client ID is missing');
            return;
        }
        axios.get(`http://localhost:8000/api/client/${clientId}/reservations`)
        
        .then(response =>{
            setReservations(response.data);
        console.log("Client ID:", clientId);

        })
        .catch(error =>{
            console.error('Error fetching reservations:', error);
        })
    };
    useEffect(()=>{
        get_reservation_id(clientId);
        fetchClientId();
    }, [clientId]);

    const handleDelete = (clientId) => {
        axios.delete(`http://localhost:8000/api/reservations/${clientId}`)
        .then(response => {
            setReservations(reservations.filter(reservation => reservation.client_id !== clientId));
        })
        .catch(error => {
            console.error('Error deleting reservation:', error);
        });
    };

    const renderReservationInfo = (reservation) => {
        if (reservation.car_id) {
            return `start date: ${reservation.start_date}, end date: ${reservation.end_date}`;
        } else if (reservation.restaurant_id) {
            return `Date: ${reservation.reservation_date_restaurant}`;
        } else if (reservation.hotel_id) {
            return `Check-in Date: ${reservation.start_date}, Check-out Date: ${reservation.end_date}`;
        } else if (reservation.tour_id) {
            return `start date: ${reservation.start_date}, end date: ${reservation.end_date}`;
        } else {
            return '';
        }
    };

    return(
        <div className="container">
            <h2>Your Reservations</h2>
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation.id}>
                        {renderReservationInfo(reservations)}
                        <button onClick={() => handleDelete(reservation.id)}>Delete</button>
                        {/* <button onClick={() => handleEdit(reservation.id)}>Edit</button> */}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ClientReservations;