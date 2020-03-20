import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import './NewRequest.scss'

const script = (uri) => 
`fetch('${uri}',{
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    ok: true,
    wow: {
      this: {
        is: 'cool'
      }
    }
  })
})`

const evaluate = (code, callback) => {
  // eslint-disable-next-line
  eval(code).then(res => res.json()).then(callback)
}

const NewRequest = ({ appointmentURI }) => {
  const {id} = useParams()
  return (
    <div className='Request NewRequest'>
      <h3>JavaScript</h3>
      <script id='script' type="text/demo" style={{ display: 'block' }}>
        {script(appointmentURI + '/' + id)}
      </script>
      <button onClick={e => evaluate(document.getElementById('script').innerHTML, _=>_ )}>Run Snippet</button>
      <br />
      <h3>cURL</h3>
      <pre className='bash wrap'>curl -X POST -d "shop[name]=Supermarket&shop[products][]=fruit&shop[products][]=eggs" {appointmentURI}/{id}</pre>
      <pre className='bash wrap'>curl -X PATCH -d "this=is&so=cool" {appointmentURI}/{id}</pre>
      <pre className='bash wrap'>curl -X PUT -d "this=is&so=cool" {appointmentURI}/{id}</pre>
      <pre className='bash wrap'>curl -X DELETE {appointmentURI}/{id}</pre>
    </div>
  )
}
export default NewRequest