import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Cars() {
    const [cars,setCars] = useState([])
    // const get_cars = () => {
    //     fetch('http://localhost:8000/api/cars')
    //     .then(response => response.json())
    //     .then(res=>setCars(res))
    //     .catch(error => {
    //         console.error('Une erreur s\'est produite:', error);
    //     });
    // }
    const get_cars = () => {
        axios.get('http://localhost:8000/api/cars')
        .then(response => {
            setCars(response.data.data);
            console.log(response.data)
        })
        .catch(error => {
            console.error('Une erreur s\'est produite:', error);
        });
    }
    
    useEffect(()=>{
        get_cars();
    },[])
    return (
        <div>
            {cars.map((elem, index) => (
                <div key={index}>
                {elem.description}
                </div>
            ))}
        </div>
    )
}
