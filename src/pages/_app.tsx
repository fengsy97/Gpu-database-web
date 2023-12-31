import "@/styles/styles.scss";
import '@/styles/datatables.min.css';
import '@/styles/searchPanes.dataTables.min.css';
import '@/styles/select.dataTables.min.css';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
