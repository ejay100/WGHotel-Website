import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Log app initialization
    console.log('Winners Gold Hotel - App Initialized');
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </>
  );
}
