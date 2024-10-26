import  {Provider} from 'react-redux'
import Store from '../redux/Store';
import '../styles/globals.css'
import LoadingBar from 'react-top-loading-bar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {

  const [progress,setProgress]=useState(0)

  let router =useRouter()


  useEffect(() => {
    const handleRouteChangeStart = () => setProgress(30);
    const handleRouteChangeComplete = () => setProgress(100);
  
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
  
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);
  

  return(
  <Provider store={Store}>
    <LoadingBar
    progress={progress}
    color='#f11946'
    onLoaderFinished={() => setProgress(0)}
    />
  <Component {...pageProps} />
</Provider>
  );
}
