import React, { useState, useEffect } from "react";
import json from "./HomeDemo.js";
import Code from "./Code";
const createAppointment = (callback) => {
  fetch(`/api/appointments/create`)
    .then((response) => response.json())
    .then((d) => callback(d));
};

export default function () {
  const [appointment, setAppointment] = useState(null);
  useEffect(() => {
    if (appointment) window.location = `/${appointment.insertedId}/new`;
  }, [appointment]);
  return (
    <div>
      <p>I can receive http requests and tell you about them.</p>
      <button onClick={() => createAppointment(setAppointment)}>
        Get Started
      </button>
      <p>👆 Click this button and I'll create a special url just for you.</p>
      <p>Then you test your curl skills with</p>
      <Code
        language="bash"
        content={`curl -X POST -d '{"radi":"cool"}' https://httpz.app/:id`}
      />
      <p>
        or maybe you want to save a webhook request and inspect the payload idk.
        Like this one:
      </p>
      <Code language="json" content={JSON.stringify(json, null, 2)} />
    </div>
  );
}
