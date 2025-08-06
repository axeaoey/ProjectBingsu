import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { Iceland } from 'next/font/google';

const iceland = Iceland({
  subsets: ['latin'],
  weight: '400', // ปรับตามที่ใช้จริง
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={iceland.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
