import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, {  } from 'react';
import { AppProvider } from '../stores/context';

/* 
* Anything that should be wrapped into the <body> element
* See: https://nextjs.org/docs/advanced-features/custom-app
*/


function MyApp({ Component, pageProps }: AppProps) {  
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp
