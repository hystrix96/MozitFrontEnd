import React, {useRef} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Features from './components/Features';
import Footer from '../components/Footer';

export default function MarketingPage(props) {
  const pricingRef = useRef(null); // Create a ref for Pricing component
 

  const scrollToPricing = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Hero onPricingButtonClick={scrollToPricing} />
      <div>
        <Divider />
        <div >
        <Features />
        </div>
        <Divider />
        <div ref={pricingRef}>
          <Pricing />
        </div>
        <Divider />
        <Divider />
        <Footer/>
      </div>
    </AppTheme>
  );
}

