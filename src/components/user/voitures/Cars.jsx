import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';

export default function Cars() {
    const [data, setData] = useState([]);
    const [model, setModel] = useState("");
    const [models, setModels] = useState([]);
    const [brand, setBrand] = useState("");
    const [brands, setBrands] = useState([]);
    const [location, setLocation] = useState("");


    const get_car_offers = () => {
        axios.get('http://localhost:8000/api/cars/car_offers')
            .then(response => {
                setData(response.data.data);
                console.log('---');
                console.log(response.data.data);
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }
    const get_brands = () => {
        axios.get('http://localhost:8000/api/cbrands')
            .then(response => {
                setBrands(response.data.brands);
                console.log('---');
                console.log(response.data.brands);
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }

    const get_models = () => {
        axios.get('http://localhost:8000/api/cmodels')
            .then(response => {
                setModels(response.data.models);
                console.log('---');
                console.log(response.data.models);
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }

    useEffect(() => {
        get_car_offers();
        get_brands();
        get_models();
    }, [brand])

    const handleBrand = (e) => {
        const brandId = e.target.value;
        setBrand(brandId);
        const modelsFiltered = models.filter((model) => model.cbrand_id == brandId);
        setModels(modelsFiltered);
    }
    const handleModel = async (e) => {
        const modelId = e.target.value;
        setModel(modelId);
        try {
            const response = await axios.get(`http://localhost:8000/api/cmodels/findBrand/${modelId}`);
            console.log(response.data);
        } catch (error) {
            console.error("Une erreur s'est produite:",error);
        }
    }

    return (
        <Layout>
            <div>
                {
                    <select value={brand}
                        onChange={handleBrand}
                    >
                        {
                            brands.map((brand, index) => (
                                <option key={index} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))
                        }
                    </select>
                }
                {
                    <select value={model}
                        onChange={handleModel}
                    >
                        {
                            models.map((model, index) => (
                                <option key={index} value={model.id}>
                                    {model.name}
                                </option>
                            ))
                        }
                    </select>
                }
                {data.cars && (
                    <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                        {data.cars.map((car, index) => (
                            <li key={index} className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                                <div className="order-1 sm:ml-6 xl:ml-0">
                                    <h3 className="mb-1 text-slate-900 font-semibold">
                                        <span className="mb-1 block text-sm leading-6 text-indigo-500"> {car.brand.name} {car.model.name}</span>
                                        price per day : {car.car.price_per_day} DH
                                    </h3>
                                    <div className="prose prose-slate prose-sm text-slate-600">
                                        <p>{car.car.description}</p>
                                    </div>
                                    <Link to={`/car/${car.car.id}`} className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 mt-6" href="">
                                        Learn more
                                        <span className="sr-only"></span>
                                        <svg className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400" width="3" height="6" viewBox="0 0 3 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M0 0L3 3L0 6"></path>
                                        </svg>
                                    </Link>
                                </div>
                                <img src={car.offer.images[0].url} alt="" className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full" width="1216" height="640" />

                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Layout>
    )
}
