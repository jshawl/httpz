import React, { useState } from "react";

import { Redirect } from "react-router-dom";
import { API_URL } from "../config";

const createAppointment = callback => {
  fetch(`${API_URL}/appointments/create.json`)
    .then(response => response.json())
    .then(d => callback(d));
};

export default function() {
  const [appointment, setAppointment] = useState(null);
  return !appointment ? (
    <div>
      <button onClick={e => createAppointment(setAppointment)}>
        Get Started
      </button>
    </div>
  ) : (
    <Redirect to={"/" + appointment._id + "/new"} />
  );
}
