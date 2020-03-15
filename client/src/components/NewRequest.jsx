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
    ok: true
  })
})`

const evaluate = (code, callback) => {
  eval(code).then(res => res.json()).then(callback)
}

const NewRequest = ({ appointmentURI }) => {
  const {id} = useParams()
  const [response, setResponse] = useState(null)
  return (
    <div class='Request NewRequest'>
      <h3>JavaScript</h3>
      <script id='script' type="text/demo" contentEditable style={{ display: 'block' }}>
        {script(appointmentURI + '/' + id)}
      </script>
      <button onClick={e => evaluate(document.getElementById('script').innerHTML, setResponse)}>Run Snippet</button>
      {response && <pre>{JSON.stringify(response,0, 2)}</pre>}
      <h3>cURL</h3>
      <pre class='bash wrap'>curl -X POST -d "shop[name]=Supermarket&shop[products][]=fruit&shop[products][]=eggs" {appointmentURI}/{id}</pre>
      <pre class='bash wrap'>curl -X PATCH -d "this=is&so=cool" {appointmentURI}/{id}</pre>
      <pre class='bash wrap'>curl -X PUT -d "this=is&so=cool" {appointmentURI}/{id}</pre>
      <pre class='bash wrap'>curl -X DELETE {appointmentURI}/{id}</pre>
    </div>
  )
}
export default NewRequest