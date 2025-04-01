import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import PropertyPost from './pages/PropertyPost';
import Header from './components/Header';
import Footer from './components/Footer';
import PropertyForm from './pages/PropertyForm';
import FormProvider from './contexts/FormContext';
import SecondPropertyForm from './pages/SecondPropertyForm';
import LocationProvider from './contexts/LocationContext';
import BackendLogicProvider from './contexts/BackendLogic';

const App = () => {
  return(
    <div className='overflow-hidden'>
      <Router>
        <BackendLogicProvider>
        <FormProvider>
        <LocationProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='post/' element={<PropertyPost />} />
          <Route path='postproperty/' element={<PropertyForm />} />
          <Route path='postpropertysecond/' element={<SecondPropertyForm />} />
        </Routes>
        <Footer />
        </LocationProvider>
        </FormProvider>
        </BackendLogicProvider>
      </Router>
    </div>
  );
};

export default App;
