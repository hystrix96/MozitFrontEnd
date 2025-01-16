import React, {useRef} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from './components/AppAppBar';
import Footer from './components/Footer';
import Highlights from './components/Highlights'

export default function FAQPage(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Highlights></Highlights>
      <div>
        <Footer />
      </div>
    </AppTheme>
  );
}