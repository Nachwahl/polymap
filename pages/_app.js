import '../styles/globals.css'
import React, {useEffect} from "react";
import { Provider } from 'next-auth/client'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { init } from "@socialgouv/matomo-next";



function MyApp({ Component, pageProps }) {
    useEffect(() => {
        if(process.env.NEXT_PUBLIC_MATOMO_ENABLE) {
            init({
                url: JSON.parse(process.env.NEXT_PUBLIC_MATOMO_CON).url,
                siteId: JSON.parse(process.env.NEXT_PUBLIC_MATOMO_CON).siteid,
                excludeUrlsPatterns: [/^\/api/, /\?token=.+/],
            });
        }

    })
  return (

      <Provider session={pageProps.session}>
          <head>
              <link rel="icon" href="/logo.png" />
          </head>

          <ToastContainer />
        <Component {...pageProps} />
      </Provider>
  )
}

export default MyApp
