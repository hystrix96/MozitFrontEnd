import React, {useRef} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import Highlights from './components/Highlights'
import Testimonials from './components/Testimonials'

export default function AboutUs(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      {/* <Highlights></Highlights> */}
      <Testimonials></Testimonials>
      <div>
        <Footer />
      </div>
    </AppTheme>
  );
}