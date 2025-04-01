import React, { useContext, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";
import { IoEnterOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../contexts/FormContext';
import { LocationContext } from '../contexts/LocationContext';
import { BackendLogicContext } from '../contexts/BackendLogic';


const property_house = [
  {data: 'Apartment', value: 'apartment'},
  {data: 'Selfcontain', value: 'selfcontain'},
  {data: 'Bungalow', value: 'bungalow'},
  {data: 'Studio Apartment', value: 'studio'},
  {data: 'Duplex', value: 'duplex'},
  {data: 'Triplex/Fourplex', value: 'triplex/fourplex'},
  {data: 'Detached House', value: 'detached'},
  {data: 'Semi-Detached House', value: 'semi-detached'},
  {data: 'Mansion', value: 'mansion'},
  {data: 'Townhouse', value: 'townhouse'},
]

const property_commercial = [
  {data: 'Office', value: 'office'},
  {data: 'Warehouse', value: 'warehouse'},
  {data: 'Store', value: 'store'},
  {data: 'Hotel Reservation', value: 'hotel'},
]

const property_land = [
  {data: 'Land', value: 'land'},
]

const listing_type = [
  {data: 'Sell', value: 'buy'},
  {data: 'Rent', value: 'rent'},
  {data: 'Shortlet', value: 'shortlet'},
]

const period = [
  {data: 'Per Annum', value: 'per_year'},
  {data: 'Per Month', value: 'per_month'},
  {data: 'Per Week', value: 'per_week'},
  {data: 'Per Day', value: 'per_day'},
]

const Form = () => {
  const {type, setType, title, setTitle, priceinput, setPriceInput, per, setPer,
    state, setState, city, setCity, descn, setDescn, list, setList, } = useContext(FormContext);
  const {getState, getCity, listCity, listState} = useContext(LocationContext);
  const {postProperty} = useContext(BackendLogicContext);

  const [prop, setProp] = useState(false);
  const [onList, setOnList] = useState(false);
  const [onState, setOnState] = useState(false);
  const [onCity, setOnCity] = useState(false);
  const [onPer, setOnPer] = useState(false);

  const navigate = useNavigate();
  const topRef = useRef();
  const outsideRefState = useRef();
  const outsideRefCity = useRef();
  const outsideRefProp = useRef();
  const outsideRefList = useRef();
  const outsideRefPer = useRef();


  useEffect(() => {
    if (!Cookies.get('property')) {
      navigate('/');
    }
  }, [navigate])

  useEffect(() => {
    getCity(state);
  }, [state, getCity])

  // function to push all box content to the top 
  const divTop = () => {
    if (topRef.current) {
      topRef.current.scrollTop = 0;
    }
  }

  // function to close when clicked outside the box 
  const divOutside = (e) => {
    if (outsideRefState.current && !outsideRefState.current.contains(e.target)) {
      setOnState(false);
    } if (outsideRefCity.current && !outsideRefCity.current.contains(e.target)) {
      setOnCity(false);
    } if (outsideRefProp.current && !outsideRefProp.current.contains(e.target)) {
      setProp(false);
    } if (outsideRefList.current && !outsideRefList.current.contains(e.target)) {
      setOnList(false);
    } if (outsideRefPer.current && !outsideRefPer.current.contains(e.target)) {
      setOnPer(false);
    } 
  }

  // useEffect to trigger divOutside 
  useEffect(() => {
    document.addEventListener('mousedown', divOutside);
    return () => {
      document.removeEventListener('mousedown', divOutside);
    }
  }, [])

  const priceFormat = (priceinput) => {
    if (!priceinput) {
      return;
    }

    const numericValue = priceinput.split('.');
    if (numericValue.length > 2) {
      return 'wrong input*';
    }

    if (/[^0-9.]/.test(priceinput)) {
      return 'wrong input*';
    }
    numericValue[0] = numericValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return(
      <div className='flex items-center'>
        <TbCurrencyNaira strokeWidth={1} className='text-2xl' />
        <div className='text-lg'>{numericValue.join('.')}</div>
      </div>
    );
  }

  return(
    <div className='space-y-5'>
      
      {/* information */}
      <div className='font-play text-sm italic px-4'>
        Please ensure you accurately fill in the following required information before proceeding. 
        All fields must be completed correctly for your listing to go live.
      </div>

      {/* Property Type */}
      <div className='border border-white bg-white py-5 px-2 mx-5 space-y-3'>
        <div className='font-medium font-jost'>Property Type</div>
        <div className='font-jost italic font-light'>
          Enter the specific property you want to list. Review the available options and select the one that best matches your listing.
        </div>
        <div ref={outsideRefProp}
        className='relative w-60'>
          <input type="text" 
          className='w-60 h-8 border-2 border-gray-300 rounded-sm bg-gray-100 px-2 font-jost' 
          value={type}
          readOnly />
          <button onClick={() => {
            setProp(!prop);
            divTop();
          }}
          className='w-60 h-8 bg-transparent absolute top-0 flex
          items-center justify-end px-3 text-lg'>
            {!prop ? <FaAngleDown /> : <FaAngleUp />}
          </button>
          <div 
          ref={topRef} 
          className={`${!prop ? 'hidden' : 'block'} bg-gray-100 absolute z-10 mt-2 overflow-auto 
          h-[280px] space-y-3 w-60 pt-3 border-2 border-gray-300 pb-5 rounded-sm`}>
            {
              Cookies.get('property') === 'house' ? 
              (
                property_house.map(item => (
                <div onClick={() => {
                  setType(item.data);
                  setProp(!prop);
                  Cookies.set('type', JSON.stringify({
                    data: item.data,
                    value: item.value,
                  }));
                }}
                key={item.data} 
                className='cursor-pointer px-2 font-jost'>
                  {item.data}
                </div>
                ))
              ) : Cookies.get('property') === 'commercial' ?
              (
                property_commercial.map(item => (
                <div onClick={() => {
                  setType(item.data);
                  setProp(!prop);
                  Cookies.set('type', JSON.stringify({
                    data: item.data,
                    value: item.value,
                  }));
                }}
                key={item.data} 
                className='cursor-pointer px-2 font-jost'>
                  {item.data}
                </div>
                ))
              ) : Cookies.get('property') === 'land' ?
                property_land.map(item => (
                <div onClick={() => {
                  setType(item.data);
                  setProp(!prop);
                 Cookies.set('type', JSON.stringify({
                    data: item.data,
                    value: item.value,
                  }));
                }}
                key={item.data} 
                className='cursor-pointer px-2 font-jost'>
                  {item.data}
                </div>
                )) : ''
             }
          </div>
        </div>
      </div>

      {/* Title */}
      <div className='border border-white bg-white py-5 px-2 mx-5 space-y-3'>
        <div className='font-medium font-jost'>Title</div>
        <div className=''>
          <input type="text" 
          className='sm:w-[350px] md:w-[400px] h-8 border-2 border-gray-300 rounded-sm bg-gray-100 px-2 font-jost'
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            Cookies.set('title', e.target.value);
          }}
          />
        </div>
      </div>

      {/* Description */}
      <div className='border border-white bg-white py-5 px-2 mx-5 space-y-3
      h-[350px]'>
        <div className='font-medium font-jost'>Description</div>
        <div className='font-jost italic font-light'>
        Summarize your property listing. This will be your property description on our website, 
        helping potential buyers or renters learn more about the property.
        </div>
        <div className=''>
          <textarea type="text"
          className='sm:max-w-[350px] sm:w-[350px] md:max-w-[500px] md:w-[550px] max-h-[200px] 
          h-[150px] resize px-2 font-jost border-2 border-gray-300 bg-gray-100 rounded-sm'
          value={descn}
          onChange={e => {
            setDescn(e.target.value);
            Cookies.set('descn', e.target.value);
          }}
          />
        </div>
      </div>

      {/* Listing Type */}
      <div className='border border-white bg-white py-5 px-2 mx-5 space-y-3'>
        <div className='font-medium font-jost'>Listing Type</div>
        <div className='font-jost font-light italic'>
          Select the Type of Property Listing. Choose the option that best describes your listing: Selling, Renting, or Shortlet.
        </div>
        <div ref={outsideRefList}
        className='relative w-60'>
          <input type="text" 
          className='w-60 h-8 border-2 border-gray-300 rounded-sm bg-gray-100 px-2 font-jost' 
          value={list}
          onChange={e => {setList(e.target.value)}}
          readOnly />
          <button onClick={() => {
            setOnList(!onList);
          }}
          className='w-60 h-8 bg-transparent absolute top-0 flex
          items-center justify-end px-3 text-lg'>
            {!onList ? <FaAngleDown /> : <FaAngleUp />}
          </button>
          <div 
          ref={topRef}
          className={`${!onList ? 'hidden' : 'block'} bg-gray-100 absolute z-10 mt-2 overflow-auto 
          h-[100px] space-y-2 w-60 pt-2 pb-5 border-2 border-gray-300`}>
            {
              listing_type.map(item => (
                <div onClick={() => {
                  setList(item.data);
                  setOnList(!onList);
                  Cookies.set('list', JSON.stringify({
                    data: item.data,
                    value: item.value,
                  }));
                }}
                key={item.data} 
                className='cursor-pointer px-2 font-jost'>
                  {item.data}
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {/* Price */}
      <div className='border border-white bg-white py-5 px-2 mx-5 space-y-3'>
        <div className='font-medium font-jost'>Price</div>
        <div className='font-light opacity-50'>{priceFormat(priceinput)}</div>
        <div className='flex gap-8'>
          <div className=''>
            <input type="text" 
            placeholder='price'
            value={priceinput}
            onChange={e => {
              setPriceInput(e.target.value);
              Cookies.set('price', e.target.value);
            }}
            className='w-[200px] h-8 border border-2 border-gray-300 rounded-sm bg-gray-100 px-2 font-jost' />
          </div>

          <div ref={outsideRefPer}
          className='relative w-32'>
            <input 
            type="text" 
            placeholder='duration'
            className='w-32 h-8 border-2 border-gray-300 rounded-sm bg-gray-100 px-2 font-jost'
            value={per}
            readOnly
            />
            <button onClick={() => {
              setOnPer(!onPer);
            }}
            className='w-32 h-8 bg-transparent absolute top-0 flex
            items-center justify-end px-3 text-lg'>
              {!onPer ? <FaAngleDown /> : <FaAngleUp />}
            </button>
            <div 
            ref={topRef}
            className={`${!onPer ? 'hidden' : 'block'} bg-gray-100 absolute z-10 mt-2 overflow-auto h-[250px] space-y-3
            w-60 pt-3 border-2 border-gray-300`}>
              {
                period.map(item => (
                  <div onClick={() => {
                    setPer(item.data);
                    setOnPer(!onPer);
                    Cookies.set('per', JSON.stringify({
                      data: item.data,
                      value: item.value
                    }));
                  }}
                  key={item.data} 
                  className='cursor-pointer px-2 font-jost'>
                    {item.data}
                  </div>
                ))
              }
          </div>
          </div>
        </div>
      </div>

      {/* State */}
      <div className='border border-white bg-white py-5 px-2 mx-5 space-y-3'>
        <div className='font-medium font-jost'>State</div>
        <div className='font-jost font-light italic'>
          Enter the state where the property is currently located.
        </div>
        <div ref={outsideRefState}
        className='relative w-60'>
          <input 
          type="text" 
          className='w-60 h-8 border-2 border-gray-300 rounded-sm bg-gray-100 px-2 font-jost'
          value={state}
          readOnly
          />
          <button onClick={() => {
            if (listState.length === 0) {
              getState();
              setOnState(!onState);
            }
            setOnState(!onState);
          }}
          className='w-60 h-8 bg-transparent absolute top-0 flex
          items-center justify-end px-3 text-lg'>
            {!onState ? <FaAngleDown /> : <FaAngleUp />}
          </button>
          <div 
          ref={topRef}
          className={`${!onState ? 'hidden' : 'block'} bg-gray-100 absolute z-10 mt-2 overflow-auto h-[250px] space-y-3
          w-60 pt-3 border-2 border-gray-300`}>
            {
              listState.map(item => (
                <div onClick={() => {
                  setState(item);
                  setCity('');
                  setOnState(!onState);
                  Cookies.set('state', item);
                }}
                key={item} 
                className='cursor-pointer px-2 font-jost'>
                  {item}
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {/* City */}
      <div className='border border-white bg-white py-5 px-2 mx-5 space-y-3'>
        <div className='font-medium font-jost'>City</div>
        <div className='font-jost font-light italic'>
          Please select the state where the property is located before choosing the city.
        </div>
        <div ref={outsideRefCity}
        className='relative w-60'>
          <input 
          type="text" 
          className='w-60 h-8 border-2 border-gray-300 rounded-sm bg-gray-100 px-2 font-jost' 
          value={city}
          readOnly />
          <button onClick={() => {
            if (state) {
              setOnCity(!onCity);
            }
          }}
          className='w-60 h-8 bg-transparent absolute top-0 flex
          items-center justify-end px-3 text-lg'>
            {!onCity ? <FaAngleDown /> : <FaAngleUp />}
          </button>
          <div ref={topRef}
          className={`${!onCity ? 'hidden' : 'block'} bg-gray-100 absolute z-10 mt-2 overflow-auto h-[250px] space-y-3
          w-60 pt-3 border-2 border-gray-300`}>
            {
              listCity.map(item => (
                <div onClick={() => {
                  setCity(item);
                  setOnCity(!onCity);
                  Cookies.set('city', item);
                }}
                key={item} 
                className='cursor-pointer px-2 font-jost'>
                  {item}
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {/* information */}
      <div className='text-sm italic font-play px-4'>
        All fields are required for submission. 
        The "Next Section" button will appear only after you have filled out the entire form.
      </div>

      {/* next button */}
      <div className={`
      ${
          type &&
          title &&
          priceinput &&
          per &&
          state &&
          city &&
          descn &&
          list ? 'block' : 'hidden'
      }
      flex items-center justify-end px-10`}>
        <button onClick={() => {
          postProperty();
          navigate('/postpropertysecond/');
          window.scrollTo(0, 0);
        }}
        className='flex items-center border-2 border-gray-400 px-2 gap-1 py-[1px]
        rounded-sm'>
          <div className='font-medium text-sm'>Save & Procced</div>
          <div className='text-2xl'><IoEnterOutline /></div>
        </button>
      </div>

    </div>
  );
};

export default Form;
