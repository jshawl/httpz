import { useEffect } from "react";
import "@/styles/globals.css";
import "@/styles/App.css";
import "@/styles/NewRequest.css";
import "@/styles/Request.css";
import "@/styles/Requests.css";
import "highlight.js/styles/base16/github.css";
import "react-tabs/style/react-tabs.css";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <div className="App">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>
        <Link href="/">
          http
          <span role="img" aria-label="z">
            ⚡
          </span>
        </Link>
        <a href="https://github.com/jshawl/httpz">
          <Image
            src="/github.svg"
            width="30"
            height="30"
            style={{ position: "absolute", top: 0, right: 0 }}
            alt="GitHub logo"
          />
        </a>
      </h1>
      <Component {...pageProps} />
    </div>
  );
}
