import React, { useContext } from 'react';
import Cookies from 'js-cookie';
import { HiBuildingOffice } from "react-icons/hi2";
import { MdLandscape } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import { IoEnterOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../contexts/FormContext';


const property_type = [
    {
        tag: <FaHouse strokeWidth={0} /> , 
        data: 'Housing Properties', 
        value1: 'Sell or Rent Faster! List Apartments, Duplexes & Bungalows to Buyers & Tenants Today!', 
        value2:'Get More Leads! Post Your Houses for Sale & Rent – Hot Market Waiting!',
        link: '/postproperty/',
        props: 'house',
    },
    {
        tag: <MdLandscape strokeWidth={0} />, 
        data: 'Landed Properties', 
        value1: 'Sell Land or Lease It! Post Plots, Farms & Estates to Investors & Developers NOW!', 
        value2: 'Cash Buyers Want Land! List Yours for Sale or Rent Today!',
        link: '/postproperty/',
        props: 'land',
    },
    {
        tag: <HiBuildingOffice strokeWidth={0} />, 
        data: 'Commercial Properties', 
        value1: 'Fill Vacancies Fast! Advertise Offices, Shops & Warehouses for Sale or Rent!', 
        value2:'Sell or Lease Commercial Properties – Connect with Serious Investors Instantly!',
        link: '/postproperty/',
        props: 'commercial',
    },
]

const PropertyType = () => {
  const { setType, setTitle, setPriceInput, setState, setCity, setDescn, setList,
    setRoom, setBathRoom, setMeasure, setUnit, setFloor, setFence, setGate, 
    setPark, setGarage, setSwim, setSolar, setElevator, setRestRoom, setPer } = useContext(FormContext);
  const navigate = useNavigate();
  return(
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10'>
      {
        property_type.map(item => (
            <button 
            onClick={() => {
              if (Cookies.get('property') !== item.props) {
                Cookies.remove('type');
                Cookies.remove('title');
                Cookies.remove('price');
                Cookies.remove('state');
                Cookies.remove('city');
                Cookies.remove('descn');
                Cookies.remove('list');
                Cookies.remove('bathroom');
                Cookies.remove('room');
                Cookies.remove('elevator');
                Cookies.remove('fence');
                Cookies.remove('garage');
                Cookies.remove('gate');
                Cookies.remove('measure');
                Cookies.remove('unit');
                Cookies.remove('park');
                Cookies.remove('solar');
                Cookies.remove('swim');
                Cookies.remove('restroom');
                Cookies.remove('per');
                setType('');
                setTitle('');
                setDescn('');
                setList('');
                setPriceInput('');
                setState('');
                setCity('');
                setRoom('');
                setBathRoom('');
                setMeasure(''); 
                setUnit(''); 
                setFloor(''); 
                setFence(''); 
                setGate(''); 
                setPark(''); 
                setGarage(''); 
                setSwim(''); 
                setSolar(''); 
                setElevator('');
                setRestRoom('');
                setPer('');
                Cookies.set('property', item.props);
                navigate(`${item.link}`);
                window.scrollTo(0, 0);
              } else {
                Cookies.set('property', item.props);
                navigate(`${item.link}`);
                window.scrollTo(0, 0);
              }
            }}
            className='border-2 border-gray-300 sm:w-[300px] md:w-auto sm:mx-auto
            md:mx-0 flex flex-col items-center justify-center space-y-2 py-2'
            key={item.data}>
                <div
                className='text-5xl opacity-60'>{item.tag}</div>
                <div className='font-medium '>{item.data}</div>
                <div className='text-sm px-2'>{item.value1}</div>
                <div className='text-sm font-jost px-2 pt-3'>{item.value2}</div>
                <div className='text-4xl'><IoEnterOutline /></div>
            </button>        
        ))
      }
    </div>
  );
};

export default PropertyType;
