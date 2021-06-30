import * as React from "react";
import { AppProps } from "next/app";

import "../styles/main.css";

import { Header } from "../components/global/Header";
import { Footer } from "../components/global/Footer";
import { ToastProvider } from "react-toast-notifications";
import { RecoilRoot } from "recoil";

const App: React.VFC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <RecoilRoot>
    <ToastProvider>
      <div className="container mx-auto text-left">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </ToastProvider>
  </RecoilRoot>
);

export default App;
