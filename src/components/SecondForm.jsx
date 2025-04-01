import React, { useContext, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoEnterOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../contexts/FormContext';
import { BackendLogicContext } from '../contexts/BackendLogic';


const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const unit_num = ['sq_m', 'sq_ft'];

const land_num = ['plots', 'hectares', 'acres']

const fence_type = [
  {data: 'No Fence', value: 'none'},
  {data: 'Dwarf/Incomplete Fence', value: 'dwarf'},
  {data: 'Full Fence', value: 'full'},
]

const isBoolean = [
  {data: 'No', value: 'false'},
  {data: 'Yes', value: 'true'},
]



const SecondForm = () => {
  const { room, setRoom, bathroom, setBathRoom, measure, setMeasure, unit, setUnit, floor, setFloor,
    fence, setFence, gate, setGate, park, setPark, garage, setGarage,swim, setSwim, solar, setSolar,
    elevator, setElevator, restRoom, setRestRoom } = useContext(FormContext);
  const {CompleteProperty} = useContext(BackendLogicContext);


  const [onRoom, setOnRoom] = useState(false);
  const [onBath, setOnBath] = useState(false);
  const [onUnit, setOnUnit] = useState(false);
  const [onFloor, setOnFloor] = useState(false);
  const [onFence, setOnFence] = useState(false);
  const [onGate, setOnGate] = useState(false);
  const [onPark, setOnPark] = useState(false);
  const [onGarage, setOnGarage] = useState(false);
  const [onSwim, setOnSwim] = useState(false);
  const [onSolar, setOnSolar] = useState(false);
  const [onElevator, setOnElevator] = useState(false);
  const [onRestRoom, setOnRestRoom] = useState(false)
  

  const navigate = useNavigate();
  const topRef = useRef();
  const outsideRefroom = useRef();
  const outsideRefbath = useRef();
  const outsideRefUnit = useRef();
  const outsideRefFloor = useRef();
  const outsideRefFence = useRef();
  const outsideRefGate = useRef();
  const outsideRefPark = useRef();
  const outsideRefGarage = useRef();
  const outsideRefSwim = useRef();
  const outsideRefSolar = useRef();
  const outsideRefElevator = useRef();
  const outsideRefRestRoom = useRef();

  useEffect(() => {
    if (!Cookies.get('property')) {
      navigate('/');
    }
  }, [navigate])

  // function to push all box content to the top 
  const divTop = () => {
    if (topRef.current) {
      topRef.current.scrollTop = 0;
    }
  }

  // function to close when clicked outside the box 
  const divOutside = (e) => {
    if (outsideRefbath.current && !outsideRefbath.current.contains(e.target)) {
      setOnBath(false);
    } if (outsideRefroom.current && !outsideRefroom.current.contains(e.target)) {
      setOnRoom(false);
    } if (outsideRefUnit.current && !outsideRefUnit.current.contains(e.target)) {
      setOnUnit(false);
    } if (outsideRefFloor.current && !outsideRefFloor.current.contains(e.target)) {
      setOnFloor(false);
    } if (outsideRefFence.current && !outsideRefFence.current.contains(e.target)) {
      setOnFence(false);
    } if (outsideRefGate.current && !outsideRefGate.current.contains(e.target)) {
      setOnGate(false);
    } if (outsideRefPark.current && !outsideRefPark.current.contains(e.target)) {
      setOnPark(false);
    } if (outsideRefGarage.current && !outsideRefGarage.current.contains(e.target)) {
      setOnGarage(false);
    } if (outsideRefSwim.current && !outsideRefSwim.current.contains(e.target)) {
      setOnSwim(false);
    } if (outsideRefSolar.current && !outsideRefSolar.current.contains(e.target)) {
      setOnSolar(false);
    } if (outsideRefElevator.current && !outsideRefElevator.current.contains(e.target)) {
      setOnElevator(false);
    } if (outsideRefRestRoom.current && !outsideRefRestRoom.current.contains(e.target)) {
      setOnRestRoom(false);
    }
  }

  // useEffect to trigger divOutside 
  useEffect(() => {
    document.addEventListener('mousedown', divOutside);
    return () => {
      document.removeEventListener('mousedown', divOutside);
    }
  }, [])

  const measureFormat = () => {
    if (!measure) {
      return;
    }

    const numericValue = measure.split('.');
    if (numericValue.length > 2) {
      return 'wrong input*';
    }

    if (/[^0-9.]/.test(measure)) {
      return 'wrong input*';
    }
    numericValue[0] = numericValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return(
      <div className='flex items-center'>
        <div className='text-lg'>{numericValue.join('.')}</div>
        <div>{unit ? <p className='pl-1'>{unit}</p> : <p className='pl-1'>add unit</p>}</div>
      </div>
    );
  }

  return(
    <div className='space-y-5'>

      {/* information */}
      <div className='font-play text-sm italic px-4'>
        You can skip this section and leave the input fields 
        empty if they do not match your property's qualities. 
        Simply fill in the necessary ones and proceed.
      </div>

      {/* Room Number */}
      <div className={`${Cookies.get('property') === 'house' ? 'block' : 'hidden'}
      border border-white bg-white py-5 px-2 mx-5 space-y-3`}>
        <div className='font-medium font-jost'>Bedroom</div>
        <div className='font-jost italic font-light'>
          Enter the total number of rooms in the property, 
          including any sitting rooms or living areas, if available.
        </div>
        <div ref={outsideRefroom}
        className='relative w-60'>
          <input type="text" 
          className='w-60 h-8 border border-gray-400 rounded-sm bg-gray-100 px-2 font-jost' 
          value={room}
          readOnly />
          <button onClick={() => {
            setOnRoom(!onRoom);
            divTop();
          }}
          className='w-60 h-8 bg-transparent absolute top-0 flex
          items-center justify-end px-3 text-lg'>
            {!onRoom ? <FaAngleDown /> : <FaAngleUp />}
          </button>
          <div 
          ref={topRef} 
          className={`${!onRoom ? 'hidden' : 'block'} bg-gray-100 absolute z-10 mt-2 overflow-auto 
          h-[280px] space-y-2 w-60 pt-2 pb-5 border border-gray-300 rounded-sm`}>
            {
              Cookies.get('property') === 'house' ? 
              (
                num.map(item => (
                <div onClick={() => {
                  setRoom(item);
                  setOnRoom(!onRoom);
                  Cookies.set('room', item);
                }}
                key={item} 
                className='cursor-pointer px-2 font-jost'>
                  {item}
                </div>
                ))
              )  : ''
             }
          </div>
        </div>
      </div>

      {/* bathroom Number */}
      <div className={`${Cookies.get('property') === 'house' ? 'block' : 'hidden'}
      border border-white bg-white py-5 px-2 mx-5 space-y-3`}>
        <div className='font-medium font-jost'>Bathrooms</div>
        <div className='font-jost italic font-light'>
          Enter the total number of bathrooms in the property, 
          including any guest or en-suite bathrooms, if applicable.
        </div>
        <div ref={outsideRefbath}
        className='relative w-60'>
          <input type="text" 
          className='w-60 h-8 border border-gray-400 rounded-sm bg-gray-100 px-2 font-jost' 
          value={bathroom}
          readOnly />
          <button onClick={() => {
            setOnBath(!onBath);
            divTop();
          }}
          className='w-60 h-8 bg-transparent absolute top-0 flex
          items-center justify-end px-3 text-lg'>
            {!onBath ? <FaAngleDown /> : <FaAngleUp />}
          </button>
          <div 
          ref={topRef} 
          className={`${!onBath ? 'hidden' : 'block'} bg-gray-100 absolute z-10 mt-2 overflow-auto 
          h-[280px] space-y-2 w-60 pt-2 pb-5 border border-gray-300 rounded-sm`}>
            {
              Cookies.get('property') === 'house' ? 
              (
                num.map(item => (
                <div onClick={() => {
                  setBathRoom(item);
                  setOnBath(!onBath);
                  Cookies.set('bathroom', item);
                }}
                key={item} 
                className='cursor-pointer px-2 font-jost'>
                  {item}
                </div>
                ))
              )  : ''
             }
          </div>
        </div>
      </div>

      {/* Measurement */}
      <div className='border border-white bg-white py-5 px-2 mx-5 space-y-3'>
        <div className='font-medium font-jost'>Measurement</div>
        <div className='font-jost italic font-light'>
          Provide the room measurements.
          For larger properties like duplexes with multiple rooms, this section may be optional.
        </div>
        <div className='font-light opacity-50'>{measureFormat(measure)}</div>
        <div className='flex gap-5'>
          <div>
            <input type="text" 
            placeholder='measurement'
            value={measure}
            onChange={e => {
              setMeasure(e.target.value);
              Cookies.set('measure', e.target.value);
            }}
            className='w-[200px] h-8 border border-gray-400 rounded-sm bg-gray-100 px-2 font-jost' />
          </div>

          <div ref={outsideRefUnit}
          className='relative w-32'>
            <input type="text" 
            placeholder='unit'
            className='w-32 h-8 border border-gray-400 rounded-sm bg-gray-100 px-2 font-jost' 
            value={unit}
            onChange={e => {
              setUnit(e.target.value);
            }}
            readOnly />
            <button onClick={() => {
              setOnUnit(!onUnit);
            }}
            className='w-32 h-8 bg-transparent absolute top-0 flex
            items-center justify-end px-3 text-lg'>
              {!onUnit ? <FaAngleDown /> : <FaAngleUp />}
            </button>
            <div 
            ref={topRef}
            className={`${!onUnit ? 'hidden' : 'block'} bg-gray-100 absolute z-10 mt-2 overflow-auto 
            h-[100px] space-y-2 w-32 pt-2 pb-5 border border-gray-300`}>
              {
                Cookies.get('property') === 'land' ?
                (
                  land_num.map(item => (
                  <div onClick={() => {
                    setUnit(item);
                    setOnUnit(!onUnit);
                    Cookies.set('unit', item);
                  }}
                  key={item} 
                  className='cursor-pointer px-2 font-jost'>
                    {item}
                  </div>
                ))
                ) : (
                  unit_num.map(item => (
                  <div onClick={() => {
                    setUnit(item);
                    setOnUnit(!onUnit);
                    Cookies.set('unit', item);
                  }}
                  key={item} 
                  className='cursor-pointer px-2 font-jost'>
                    {item}
                  </div>
                ))
                )
              }
          </div>
          </div>
        </div>
      </div>

      {/* Floor count */}
      <div className={`${Cookies.get('property') === 'land' ? 'hidden' : 'block'}
      border border-white bg-white py-5 px-2 mx-5 space-y-3`}>
        <div className='font-medium font-jost'>Floor count</div>
        <div className='font-jost italic font-light'>
          This indicates either the total number of floors in the building or 
          the specific floor where the property is situated.
        </div>
        <div ref={outsideRefFloor}
        className='relative w-60'>
          <input type="text" 
          className='w-60 h-8 border border-gray-400 rounded-sm bg-gray-100 px-2 font-jost' 
          value={floor}
          readOnly />
          <button onClick={() => {
            setOnFloor(!onFloor);
            divTop();
          }}
          className='w-60 h-8 bg-transparent absolute top-0 flex
          items-center justify-end px-3 text-lg'>
            {!onFloor ? <FaAngleDown /> : <FaAngleUp />}
          </button>
          <div 
          ref={topRef} 
          className={`${!onFloor ? 'hidden' : 'block'} bg-gray-100 absolute z-10 mt-2 overflow-auto 
          h-[280px] space-y-2 w-60 pt-2 pb-5 border border-gray-300 rounded-sm`}>
            {
                num.map(item => (
                <div onClick={() => {
                  setFloor(item);
                  setOnFloor(!onFloor);
                  Cookies.set('room', item);
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

      {/* Fence */}
      <div className='border border-white bg-white py-5 px-2 mx-5 space-y-3'>
        <div className='font-medium font-jost'>Fence</div>
        <div className='font-jost italic font-light'>
          The listing shows preliminary fence information - 
          exact details will be verified upon inspection.
        </div>
        <div ref={outsideRefFence}
        className='relative w-60'>
          <input type="text" 
          className='w-60 h-8 border border-gray-400 rounded-sm bg-gray-100 px-2 font-jost' 
          value={fence}
          readOnly />
          <button onClick={() => {
            setOnFence(!onFence);
            divTop();
          }}
          className='w-60 h-8 bg-transparent absolute top-0 flex
          items-center justify-end px-3 text-lg'>
            {!onFence ? <FaAngleDown /> : <FaAngleUp />}
          </button>
          <div 
          ref={topRef} 
          className={`${!onFence ? 'hidden' : 'block'} bg-gray-100 absolute z-10 mt-2 overflow-auto 
          h-[280px] space-y-2 w-60 pt-2 pb-5 border border-gray-300 rounded-sm`}>
            {
                fence_type.map(item => (
                <div onClick={() => {
                  setFence(item.data);
                  setOnFence(!onFence);
                  Cookies.set('fence', JSON.stringify({
                    data: item.data,
                    value:item.value,
                  }));
                }}
                key={item.value} 
                className='cursor-pointer px-2 font-jost'>
                  {item.data}
                </div>
                ))
            }
          </div>
        </div>
      </div>

      {/* gate */}
      <div className='border border-white bg-white py-5 px-2 mx-5 space-y-3'>
        <div className='font-medium font-jost'>Gate</div>
        <div className='font-jost italic font-light'>
          Please specify if the property includes a gate
        </div>
        <div ref={outsideRefGate}
        className='relative w-60'>
          <input type="text" 
          className='w-60 h-8 border border-gray-400 rounded-sm bg-gray-100 px-2 font-jost' 
          value={gate}
          readOnly />
          <button onClick={() => {
            setOnGate(!onGate);
            divTop();
          }}
          className='w-60 h-8 bg-transparent absolute top-0 flex
          items-center justify-end px-3 text-lg'>
            {!onGate ? <FaAngleDown /> : <FaAngleUp />}
          </button>
          <div 
          ref={topRef} 
          className={`${!onGate ? 'hidden' : 'block'} bg-gray-100 absolute z-10 mt-2 overflow-auto 
          h-[150px] space-y-3 w-60 pt-3 pb-5 border border-gray-300 rounded-sm`}>
            {
              isBoolean.map(item => (
                <div onClick={() => {
                  setGate(item.data);
                  setOnGate(!onGate);
                  Cookies.set('gate', JSON.stringify({
                    data: item.data,
                    value: item.value,
                  }));
                }}
                key={item.value} 
                className='cursor-pointer px-2 font-jost flex justify-between group all'>
                  <div>{item.data}</div>
                  <div className={`${gate === item.data ? 'bg-blue-500' : ''}
                  border-[4px] w-4 h-4 bg-transparent rounded-full group-hover:bg-blue-500
                  transition-all duration-300`}></div>
                </div>
                ))
             }
          </div>
        </div>
      </div>

      {/* park space */}
      <div className={`${Cookies.get('property') === 'land' ? 'hidden' : 'block'}
      border border-white bg-white py-5 px-2 mx-5 space-y-3`}>
        <div className='font-medium font-jost'>Parking Space</div>
        <div className='font-jost italic font-light'>
          Is there available parking space here?
        </div>
        <div ref={outsideRefPark}
        className='relative w-60'>
          <input type="text" 
          className='w-60 h-8 border border-gray-400 rounded-sm bg-gray-100 px-2 font-jost' 
          value={park}
          readOnly />
          <button onClick={() => {
            setOnPark(!onPark);
            divTop();
          }}
          className='w-60 h-8 bg-transparent absolute top-0 flex
          items-center justify-end px-3 text-lg'>
            {!onPark ? <FaAngleDown /> : <FaAngleUp />}
          </button>
          <div 
          ref={topRef} 
          className={`${!onPark ? 'hidden' : 'block'} bg-gray-100 absolute z-10 mt-2 overflow-auto 
          h-[150px] space-y-3 w-60 pt-3 pb-5 border border-gray-300 rounded-sm`}>
            {
              isBoolean.map(item => (
                <div onClick={() => {
                  setPark(item.data);
                  setOnPark(!onPark);
                  Cookies.set('park', JSON.stringify({
                    data: item.data,
                    value: item.value,
                  }));
                }}
                key={item.value} 
                className='cursor-pointer px-2 font-jost flex justify-between group all'>
                  <div>{item.data}</div>
                  <div className={`${park === item.data ? 'bg-blue-500' : ''}
                  border-[4px] w-4 h-4 bg-transparent rounded-full group-hover:bg-blue-500
                  transition-all duration-300`}></div>
                </div>
                ))
             }
          </div>
        </div>
      </div>

      {/* garage */}
      <div className={`${Cookies.get('property') === 'land' ? 'hidden' : 'block'}
      border border-white bg-white py-5 px-2 mx-5 space-y-3`}>
        <div className='font-medium font-jost'>Garage</div>
        <div className='font-jost italic font-light'>
          Is there a garage available?
        </div>
        <div ref={outsideRefGarage}
        className='relative w-60'>
          <input type="text" 
          className='w-60 h-8 border border-gray-400 rounded-sm bg-gray-100 px-2 font-jost' 
          value={garage}
          readOnly />
          <button onClick={() => {
            setOnGarage(!onGarage);
            divTop();
          }}
          className='w-60 h-8 bg-transparent absolute top-0 flex
          items-center justify-end px-3 text-lg'>
            {!onGarage ? <FaAngleDown /> : <FaAngleUp />}
          </button>
          <div 
          ref={topRef} 
          className={`${!onGarage ? 'hidden' : 'block'} bg-gray-100 absolute z-10 mt-2 overflow-auto 
          h-[150px] space-y-3 w-60 pt-3 pb-5 border border-gray-300 rounded-sm`}>
            {
              isBoolean.map(item => (
              <div onClick={() => {
                setGarage(item.data);
                setOnGarage(!onGarage);
                Cookies.set('garage', JSON.stringify({
                  data: item.data,
                  value: item.value,
                }));
              }}
              key={item.value} 
              className='cursor-pointer px-2 font-jost flex justify-between group all'>
                <div>{item.data}</div>
                <div className={`${garage === item.data ? 'bg-blue-500' : ''}
                border-[4px] w-4 h-4 bg-transparent rounded-full group-hover:bg-blue-500
                transition-all duration-300`}></div>
              </div>
              ))
             }
          </div>
        </div>
      </div>

      {/* swimming pool */}
      <div className={`${Cookies.get('property') === 'land' ? 'hidden' : 'block'}
      border border-white bg-white py-5 px-2 mx-5 space-y-3`}>
        <div className='font-medium font-jost'>Swimming Pool</div>
        <div className='font-jost italic font-light'>
          Is there a swimming pool available?
        </div>
        <div ref={outsideRefSwim}
        className='relative w-60'>
          <input type="text" 
          className='w-60 h-8 border border-gray-400 rounded-sm bg-gray-100 px-2 font-jost' 
          value={swim}
          readOnly />
          <button onClick={() => {
            setOnSwim(!onSwim);
            divTop();
          }}
          className='w-60 h-8 bg-transparent absolute top-0 flex
          items-center justify-end px-3 text-lg'>
            {!onSwim ? <FaAngleDown /> : <FaAngleUp />}
          </button>
          <div 
          ref={topRef} 
          className={`${!onSwim ? 'hidden' : 'block'} bg-gray-100 absolute z-10 mt-2 overflow-auto 
          h-[150px] space-y-3 w-60 pt-3 pb-5 border border-gray-300 rounded-sm`}>
            {
              isBoolean.map(item => (
              <div onClick={() => {
                setSwim(item.data);
                setOnSwim(!onSwim);
                Cookies.set('swim', JSON.stringify({
                  data: item.data,
                  value: item.value,
                }));
              }}
              key={item.value} 
              className='cursor-pointer px-2 font-jost flex justify-between group all'>
                <div>{item.data}</div>
                <div className={`${swim === item.data ? 'bg-blue-500' : ''}
                border-[4px] w-4 h-4 bg-transparent rounded-full group-hover:bg-blue-500
                transition-all duration-300`}></div>
              </div>
              ))
             }
          </div>
        </div>
      </div>

      {/* solar */}
      <div className={`${Cookies.get('property') === 'land' ? 'hidden' : 'block'}
      border border-white bg-white py-5 px-2 mx-5 space-y-3`}>
        <div className='font-medium font-jost'>Solar</div>
        <div className='font-jost italic font-light'>
          Is there solar panel electricity available?
        </div>
        <div ref={outsideRefSolar}
        className='relative w-60'>
          <input type="text" 
          className='w-60 h-8 border border-gray-400 rounded-sm bg-gray-100 px-2 font-jost' 
          value={solar}
          readOnly />
          <button onClick={() => {
            setOnSolar(!onSolar);
            divTop();
          }}
          className='w-60 h-8 bg-transparent absolute top-0 flex
          items-center justify-end px-3 text-lg'>
            {!onSolar ? <FaAngleDown /> : <FaAngleUp />}
          </button>
          <div 
          ref={topRef} 
          className={`${!onSolar ? 'hidden' : 'block'} bg-gray-100 absolute z-10 mt-2 overflow-auto 
          h-[150px] space-y-3 w-60 pt-3 pb-5 border border-gray-300 rounded-sm`}>
            {
              isBoolean.map(item => (
              <div onClick={() => {
                setSolar(item.data);
                setOnSolar(!onSolar);
                Cookies.set('solar', JSON.stringify({
                  data: item.data,
                  value: item.value,
                }));
              }}
              key={item.value} 
              className='cursor-pointer px-2 font-jost flex justify-between group all'>
                <div>{item.data}</div>
                <div className={`${solar === item.data ? 'bg-blue-500' : ''}
                border-[4px] w-4 h-4 bg-transparent rounded-full group-hover:bg-blue-500
                transition-all duration-300`}></div>
              </div>
              ))
             }
          </div>
        </div>
      </div>

      {/* elevator */}
      <div className={`${Cookies.get('property') === 'land' ? 'hidden' : 'block'}
      border border-white bg-white py-5 px-2 mx-5 space-y-3`}>
        <div className='font-medium font-jost'>Elevator</div>
        <div className='font-jost italic font-light'>
          Does this property include an elevator for convenience?
        </div>
        <div ref={outsideRefElevator}
        className='relative w-60'>
          <input type="text" 
          className='w-60 h-8 border border-gray-400 rounded-sm bg-gray-100 px-2 font-jost' 
          value={elevator}
          readOnly />
          <button onClick={() => {
            setOnElevator(!onElevator);
            divTop();
          }}
          className='w-60 h-8 bg-transparent absolute top-0 flex
          items-center justify-end px-3 text-lg'>
            {!onElevator ? <FaAngleDown /> : <FaAngleUp />}
          </button>
          <div 
          ref={topRef} 
          className={`${!onElevator ? 'hidden' : 'block'} bg-gray-100 absolute z-10 mt-2 overflow-auto 
          h-[150px] space-y-3 w-60 pt-3 pb-5 border border-gray-300 rounded-sm`}>
            {
              isBoolean.map(item => (
              <div onClick={() => {
                setElevator(item.data);
                setOnElevator(!onElevator);
                Cookies.set('elevator', JSON.stringify({
                  data: item.data,
                  value: item.value,
                }));
              }}
              key={item.value} 
              className='cursor-pointer px-2 font-jost flex justify-between group all'>
                <div>{item.data}</div>
                <div className={`${elevator === item.data ? 'bg-blue-500' : ''}
                border-[4px] w-4 h-4 bg-transparent rounded-full group-hover:bg-blue-500
                transition-all duration-300`}></div>
              </div>
              ))
             }
          </div>
        </div>
      </div>

      {/* restroom */}
      <div className={`${Cookies.get('property') === 'land' || Cookies.get('property') === 'house' ? 'hidden' : 'block'}
      border border-white bg-white py-5 px-2 mx-5 space-y-3`}>
        <div className='font-medium font-jost'>Rest Room</div>
        <div className='font-jost italic font-light'>
          Is there a restroom available?
        </div>
        <div ref={outsideRefRestRoom}
        className='relative w-60'>
          <input type="text" 
          className='w-60 h-8 border border-gray-400 rounded-sm bg-gray-100 px-2 font-jost' 
          value={restRoom}
          readOnly />
          <button onClick={() => {
            setOnRestRoom(!onRestRoom);
            divTop();
          }}
          className='w-60 h-8 bg-transparent absolute top-0 flex
          items-center justify-end px-3 text-lg'>
            {!onRestRoom ? <FaAngleDown /> : <FaAngleUp />}
          </button>
          <div 
          ref={topRef} 
          className={`${!onRestRoom ? 'hidden' : 'block'} bg-gray-100 absolute z-10 mt-2 overflow-auto 
          h-[150px] space-y-3 w-60 pt-3 pb-5 border border-gray-300 rounded-sm`}>
            {
              isBoolean.map(item => (
              <div onClick={() => {
                setRestRoom(item.data);
                setOnRestRoom(!onRestRoom);
                Cookies.set('restroom', JSON.stringify({
                  data: item.data,
                  value: item.value,
                }));
              }}
              key={item.value} 
              className='cursor-pointer px-2 font-jost flex justify-between group all'>
                <div>{item.data}</div>
                <div className={`${restRoom === item.data ? 'bg-blue-500' : ''}
                border-[4px] w-4 h-4 bg-transparent rounded-full group-hover:bg-blue-500
                transition-all duration-300`}></div>
              </div>
              ))
             }
          </div>
        </div>
      </div> 

      {/* next button */}
      <div className='flex items-center justify-end px-10'>
        <button onClick={() => {
          CompleteProperty();
          window.scrollTo(0, 0)
        }}
        className='flex items-center border-2 border-gray-400 px-2 gap-1 py-[4px]
        rounded-sm'>
          <div className='font-medium text-sm'>Save & Procced</div>
          <div className='text-2xl'><IoEnterOutline /></div>
        </button>
      </div>

    </div>
  );
};

export default SecondForm;
