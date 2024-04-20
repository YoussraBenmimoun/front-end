import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageSlider from '../ImageSlider';
import axios from 'axios';
import Layout from '../voitures/Layout';

const Hotel = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [data, setData] = useState([]);
    const [slides, setSlides] = useState([]);
    const [r_startDate, setR_startDate] = useState('');
    const [r_endDate, setR_endDate] = useState('');
    const [selectedRoomId, setSelectedRoomId] = useState('');
    // const [roomTypes, setRoomTypes] = useState([]);
    const [rooms, setRooms] = useState([]);

    const get_hotel = () => {
        axios.get(`http://localhost:8000/api/hotels/${id}`)
            .then(response => {
                console.log(response.data);
                setHotel(response.data.hotel);
                setData(response.data);
                setSlides(response.data.offer[0].images);
            })
            .catch(error => {
                console.error("Une erreur s'est produite !", error);
            });
    };

    const get_rooms = () => {
        axios.get(`http://localhost:8000/api/rooms`)
            .then(response => {
                setRooms(response.data);
            })
            .catch(error => {
                console.error("Failed to fetch the rooms", error);
            });
    };

    // const get_roomTypes = () => {
    //     axios.get(`http://localhost:8000/api/roomtypes`)
    //         .then(response => {
    //             setRoomTypes(response.data);
    //         })
    //         .catch(error => {
    //             console.error("Failed to fetch room options", error);
    //         });
    // };

    useEffect(() => {
        get_hotel();
        get_rooms();
        // get_roomTypes();
    }, [id]);




    const book_room = () =>{
        axios.post('http://localhost:8000/api/reservation/storeTableHotel', {
            id: id,
            room_id: selectedRoomId,
            start_date: r_startDate,
            end_date: r_endDate
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error("Une erreur s'est produite !", error);
        });
    }

    return (
        <div>
            <Layout>
                <div className="container mx-auto px-4 py-16">
                    {hotel && slides.length > 0 && (
                        <div className='max-w-3xl mx-auto'>
                            <div className='bg-white shadow-md rounded-lg overflow-hidden'>
                                <div className='p-4'>
                                    <h1 className='text-3xl font-semibold mb-2'>
                                        {data.hotel.name} {data.nbr_star}
                                    </h1>
                                    <div className='py-2 border-t border-gray-200 mt-10'>
                                        <div className="mb-2">
                                            <span className="font-semibold"> Description :  </span>
                                            <span> {data.hotel.description} </span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="font-semibold">Address: </span>
                                            <span> {data.hotel.address}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-between m-10 gap-4'>
                                    <div className='flex flex-col gap-4'>
                                        <p className='font-semibold text-lg'>Reservation start-date :</p>
                                        <input
                                            value={r_startDate}
                                            onChange={(e) => { setR_startDate(e.target.value) }}
                                            className='bg-light text-gray shadow border border-none outline-none h-14 w-40 text-left text-base'
                                            type='date'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <p className='font-semibold text-lg'>Reservation end-date :</p>
                                        <input
                                            value={r_endDate}
                                            onChange={(e) => { setR_endDate(e.target.value) }}
                                            className='bg-light text-gray shadow border border-none outline-none h-14 w-40 text-left text-base'
                                            type='date'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <p className='font-semibold text-lg'>Choose a room :</p>
                                        <select
                                            value={selectedRoomId}
                                            onChange={(e) => { setSelectedRoomId(e.target.value) }}
                                            className='bg-light text-gray shadow border border-none outline-none h-14 w-40 text-left text-base'
                                        >
                                            <option value="">Select a room :</option>
                                            {rooms.map((room, index) => (
                                                <option key={index} value={room.id}>{room.room_type} - {room.nbr_beds} Beds</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-end">
                                        <button onClick={book_room()}
                                            className="bg-primary rounded transition-bg shadow h-14 px-10 outline-none text-white hover:bg-white hover:text-primary cursor-pointer">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        </div>
    );
}

export default Hotel;
