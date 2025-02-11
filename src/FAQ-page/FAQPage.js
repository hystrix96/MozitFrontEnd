import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import FAQ from './components/FAQ';
import Footer from '../components/Footer';

export default function FAQPage(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <div>
        <FAQ />
        <Footer />
      </div>
    </AppTheme>
  );
}