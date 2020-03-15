import React from 'react'
import './Request.scss'

import ReactJson from 'react-json-view'


const Request = ({ data }) => (
  <div className='Request'>
    <h3>{data.method} /{data.id} {data.createdAt}</h3>
    <div class='payload'>
      <h3>Payload</h3>
      <ReactJson src={data.payload} displayDataTypes={false}
        displayObjectSize={false}
        enableClipboard={false}
        name={null}
        iconStyle="triangle"
      />
    </div>
    <div class='headers'>
      <h3>Headers</h3>
      <ReactJson src={data.headers} displayDataTypes={false}
        displayObjectSize={false}
        enableClipboard={false}
        name={null}
        iconStyle="triangle"
      />
    </div>
  </div>
)

export default Request