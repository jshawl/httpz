import React, {useState, Component} from 'react'
import './Request.scss'

const Request = ({ data }) => (
  <div className='Request'>
    <h3>{data.method} /{data.id} {data.createdAt}</h3>
    <div class='payload'>
      <h3>Payload</h3>
      <div class='js-jsonview'>
        <pre>{JSON.stringify(data.payload, null, 2)}</pre>
      </div>
    </div>
    <div class='headers'>
      <h3>Headers</h3>
      <pre>{JSON.stringify(data.headers, null, 2)}</pre>
    </div>
  </div>
)

export default Request