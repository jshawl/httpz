import React, { useState, useEffect } from "react";
import json from "./HomeDemo.js";

const createAppointment = callback => {
  fetch(`/api/appointments/create`)
    .then(response => response.json())
    .then(d => callback(d));
};

export default function() {
  const [appointment, setAppointment] = useState(null);
  useEffect(() => {
    if(appointment)
      window.location = `/${appointment.insertedId}/new`
 }, [appointment]);
  return (
    <div>
      <p>I can receive http requests and tell you about them.</p>
      <button onClick={() => createAppointment(setAppointment)}>
        Get Started
      </button>
      <p>👆 Click this button and I'll create a special url just for you.</p>
      <p>Then you test your curl skills with</p>
      <pre className='bash'><code className='hljs language-bash'>
        curl -X POST -d '{"{"}"radi":"cool"{"}"}' https://httpz.app/:id
        </code>
      </pre>
      <p>
        or maybe you want to save a webhook request and inspect the payload idk.
        Like this one:
      </p>
      <pre><code>{JSON.stringify(json, null, 2)}</code></pre>
    </div>
  );
}
