import React, {useState} from 'react'

import { Redirect } from 'react-router-dom'

import {Button} from 'semantic-ui-react'

const createAppointment = callback => {
  fetch("http://localhost:3030/appointments/create.json")
    .then(response => response.json())
    .then(d => callback(d))
}

export default function () {
  const [appointment, setAppointment] = useState(null)
  return ( !appointment ? 
    <div>
      <Button inverted onClick={e => createAppointment(setAppointment)}>Get Started</Button>
    </div> :
    <Redirect to={"/" + appointment._id + "/new"} />
  )
}