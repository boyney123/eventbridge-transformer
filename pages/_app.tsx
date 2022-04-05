import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Nav from '../components/Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Amazon EventBridge Transformer | Generate Input Transforms</title>
        <meta name="description" content="Quickly generate input transforms for Amazon EventBridge with your events and browser." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Online EventBridge Transformer Generator" />
        <meta property="og:description" content="Quickly generate input transforms for Amazon EventBridge with your events and browser." />
        <meta property="og:url" content="/social.png" />
        <meta property="og:url" content="https://eventbridge-transformer.vercel.app" />
        <meta property="og:image" content="https://eventbridge-transformer.vercel.app/social.png" />
        <meta property="og:image:alt" content="Amazon EventBridge Transformer | Generate Input Transforms in your browser" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        <link rel="icon" href="favicon.ico" />
        <meta property="og:locale" content="en-GB" />
        <meta name="author" content="boyney123" />
      </Head>
      <Nav />
      <ToastContainer theme="light" position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
