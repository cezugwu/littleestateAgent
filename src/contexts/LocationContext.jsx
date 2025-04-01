import React, { createContext, useCallback, useState } from 'react';

export const LocationContext = createContext();
const LocationProvider = ({children}) => {
  const [listState, setListState] = useState([]);
  const [listCity, setListCity] = useState([]);

  const getState = async () => {
    try {
      let response = await fetch(`http://127.0.0.1:8001/get_state/`);
      let data = await response.json();
      if (response.status === 200) {
        const mapData = data.map(item => {
          return item.state;
        })
        console.log(mapData)
        setListState(mapData);
      } else {
        console.log('failed to fetch state')
      }
    } catch (error) {
      console.log('unexpected error', error)
    }
  }

  const getCity = useCallback(async (city) => {
    try {
      let response = await fetch(`http://127.0.0.1:8001/get_city/?state=${city}`);
      let data = await response.json();
      if (response.status === 200) {
        const mapData = data.map(item => {
          return item.city;
        })
        console.log(mapData);
        setListCity(mapData);
      } else {
        console.log('failed to fetch state')
      }
    } catch (error) {
      console.log('unexpected error', error)
    }
  }, [])

  return (
    <LocationContext.Provider value={{getState, getCity, listCity, listState}}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
