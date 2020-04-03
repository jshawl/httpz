import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { API_URL } from "../config";
import json from "./HomeDemo.js";
import ReactJson from "react-json-view";

const createAppointment = (callback) => {
  fetch(`${API_URL}/appointments/create.json`)
    .then((response) => response.json())
    .then((d) => callback(d));
};

export default function () {
  const [appointment, setAppointment] = useState(null);
  return !appointment ? (
    <div>
      <p>I can receive http requests and tell you about them.</p>
      <button onClick={() => createAppointment(setAppointment)}>
        Get Started
      </button>
      <p>^^ Click this button and I'll create a special url just for you.</p>
      <p>Then you test your curl skills with</p>
      <pre className="bash">
        curl -X POST -d '{"{"}"radi":"cool"{"}"}' https://httpz.app/:id
      </pre>
      <p>
        or maybe you want to save a webhook request and inspect the payload idk.
        Like this one:
      </p>
      <ReactJson
        src={json}
        displayDataTypes={false}
        displayObjectSize={false}
        enableClipboard={false}
        name={null}
        iconStyle="triangle"
      />
    </div>
  ) : (
    <Redirect to={"/" + appointment._id + "/new"} />
  );
}
