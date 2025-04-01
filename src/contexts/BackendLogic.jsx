import React, { createContext } from 'react';
import Cookies from 'js-cookie';

export const BackendLogicContext = createContext();

const BackendLogicProvider = ({children}) => {

  const postProperty = async () => {
    const type = Cookies.get('type') ? JSON.parse(Cookies.get('type')).value : '';
    const title = Cookies.get('title') || '';
    const price = Cookies.get('price') || '';
    const state = Cookies.get('state') || '';
    const city = Cookies.get('city') || '';
    const descn = Cookies.get('descn') || '';
    const list = Cookies.get('list') ? JSON.parse(Cookies.get('list')).value : '';
    const agent = 'emeka';
    const phone = '09063097244';
    const slug = Cookies.get('slug') || '';
    try {
      if (!slug) {
        let response = await fetch(`http://127.0.0.1:8000/post_property/`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({"listing":list, "title":title, "property_type": type, "description": descn,
        "price": price, "state": state, "city": city, "agent_username": agent, "agent_phone":phone })
      });
      let data = await response.json();
      if (response.status === 200) {
        console.log(data);
        Cookies.set('slug', data.slug);
      } else {
        console.log('something went wrong');
      }
    } else {
      let response = await fetch(`http://127.0.0.1:8000/update_property/`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({"listing":list, "title":title, "property_type": type, "description": descn,
        "price": price, "state": state, "city": city, "agent_username": agent, "agent_phone":phone, 'slug':slug })
      });
      let data = await response.json();
      if (response.status === 200) {
        console.log(data);
      } else {
        console.log('something went wrong');
      }
    }
    } catch (error) {
      console.log('unexpected error', error);
    }
  }

  const CompleteProperty = async () => {
    const unit = Cookies.get('unit') || '';
    const bedroom = Cookies.get('room') || '';
    const bathroom = Cookies.get('bathroom') || '';
    const measure = Cookies.get('measure') || '';
    const agent = 'emeka';
    const slug = Cookies.get('slug') || '';

    try {
      let response = await fetch(`http://127.0.0.1:8000/update_property/`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({"bedrooms":bedroom, "bathrooms":bathroom, "measurement":measure, "agent_username": agent, "unit":unit, 'slug':slug })
      });
      let data = await response.json();
      if (response.status === 200) {
        console.log(data);
      } else {
        console.log('something went wrong');
      }
    } catch (error) {
      console.log('unexpected error', error);
    }
  }

  return(
    <BackendLogicContext.Provider value={{postProperty, CompleteProperty}}>
      {children}
    </BackendLogicContext.Provider>
  );
};

export default BackendLogicProvider;
