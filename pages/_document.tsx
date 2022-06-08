import React from 'react';
import Document, { Head, Html, Main, NextScript } from "next/document";


/* 
* A custom Document can update the <html> and <body> tags used to render a Page.
* This file is only rendered on the server, so event handlers like onClick cannot be used in _document.
* See: https://nextjs.org/docs/advanced-features/custom-document
* Load fonts directly from CDN: https://nextjs.org/docs/basic-features/font-optimization
*/

class myDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link 
                        rel="preload" 
                        href="/fonts/IBMPlexSans-Bold.ttf" 
                        as="font" 
                        crossOrigin="anonymous" 
                    />
                    <link 
                        rel="preload" 
                        href="/fonts/IBMPlexSans-Regular.ttf" 
                        as="font" 
                        crossOrigin="anonymous" 
                    />
                    <link 
                        rel="preload" 
                        href="/fonts/IBMPlexSans-SemiBold.ttf" 
                        as="font" 
                        crossOrigin="anonymous" 
                    />
                </Head>
                <body>
                    <Main></Main>
                    <NextScript/>                    
                </body>
            </Html>
        );
    }
}

export default myDocument;