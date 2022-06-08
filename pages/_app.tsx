import '../styles/globals.css'
import type { AppProps } from 'next/app'

/* 
* Anything that should be wrapped into the <body> element
* See: https://nextjs.org/docs/advanced-features/custom-app
*/

function MyApp({ Component, pageProps }: AppProps) {  
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
