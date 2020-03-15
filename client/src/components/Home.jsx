import React, {useState} from 'react'

import { Redirect } from 'react-router-dom'

const createAppointment = callback => {
  fetch("http://localhost:3030/appointments/create.json")
    .then(response => response.json())
    .then(d => callback(d))
}

export default function () {
  const [appointment, setAppointment] = useState(null)
  return ( !appointment ? 
    <div>
      <button onClick={e => createAppointment(setAppointment)}>Get Started</button>
    </div> :
    <Redirect to={"/" + appointment._id + "/new"} />
  )
}