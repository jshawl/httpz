import React from "react";
import Home from "./Home";
import Image from "next/image";
// import Appointment from "./Appointment";
import Link from 'next/link'
const App = () => (
    <div className="App">
      <h1>
        <Link href="/">
          http
          <span role="img" aria-label="z">
            ⚡
          </span>
        </Link>
        <a href="https://github.com/jshawl/httpz">
          <Image src="/github.svg" width="30" height="30" style={{position: 'absolute', top: 0, right: 0}} alt="GitHub logo" />
        </a>
      </h1>
      <Home />
    </div>
);

export default App;
