import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';


export const FormContext = createContext();
const FormProvider = ({children}) => {
  // state for input field form
  const [type, setType] = useState(() => Cookies.get('type') ? JSON.parse(Cookies.get('type')).data : '');
  const [title, setTitle] = useState(() => Cookies.get('title') || '');
  const [priceinput, setPriceInput] = useState(() => Cookies.get('price') || '');
  const [per, setPer] = useState(() => Cookies.get('per') ? JSON.parse(Cookies.get('per')).data : '');
  const [state, setState] = useState(() => Cookies.get('state') || '');
  const [city, setCity] = useState(() => Cookies.get('city') || '');
  const [descn, setDescn] = useState(() => Cookies.get('descn') || '');
  const [list, setList] = useState(() => Cookies.get('list') ? JSON.parse(Cookies.get('list')).data : '');
  // state for input field secondform
  const [room, setRoom] = useState(() => Cookies.get('room') || '');
  const [bathroom, setBathRoom] = useState(() => Cookies.get('bathroom') || '');
  const [measure, setMeasure] = useState(() => Cookies.get('measure') || '');
  const [unit, setUnit] = useState(() => Cookies.get('unit') || '');
  const [floor, setFloor]  = useState(() => Cookies.get('floor') || '');
  const [fence, setFence] = useState(() => Cookies.get('fence') ? JSON.parse(Cookies.get('fence')).data : '');
  const [gate, setGate] = useState(() => Cookies.get('gate') ? JSON.parse(Cookies.get('gate')).data : '');
  const [park, setPark] = useState(() => Cookies.get('park') ? JSON.parse(Cookies.get('park')).data : '');
  const [garage, setGarage] = useState(() => Cookies.get('garage') ? JSON.parse(Cookies.get('garage')).data : '');
  const [swim, setSwim] = useState(() => Cookies.get('swim') ? JSON.parse(Cookies.get('swim')).data : '');
  const [solar, setSolar] = useState(() => Cookies.get('solar') ? JSON.parse(Cookies.get('solar')).data : '');
  const [elevator, setElevator] = useState(() => Cookies.get('elevator') ? JSON.parse(Cookies.get('elevator')).data : '');
  const [restRoom, setRestRoom] = useState(() => Cookies.get('restroom') ? JSON.parse(Cookies.get('restroom')).data : '');

  return (
    <FormContext.Provider value={{ type, setType, title, setTitle, priceinput, setPriceInput,
    state, setState, city, setCity, descn, setDescn, list, setList, room, setRoom, bathroom, setBathRoom, measure, setMeasure, unit, setUnit, floor, setFloor,
    fence, setFence, gate, setGate, park, setPark, garage, setGarage,swim, setSwim, solar, setSolar, elevator, setElevator, restRoom, setRestRoom, per, setPer}}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
