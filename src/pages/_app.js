import {useEffect} from 'react';
import "@/styles/globals.css";
import "@/styles/App.css";

import "highlight.js/styles/base16/github.css";

import hljs from 'highlight.js';
import jsonLang from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
hljs.registerLanguage('json', jsonLang);
hljs.registerLanguage('bash', bash);


export default function App({ Component, pageProps }) {
  useEffect(() => {
    hljs.highlightAll();
  },[])
  return <Component {...pageProps} />;
}
