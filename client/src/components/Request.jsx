import React from 'react'
import './Request.scss'

import ReactJson from 'react-json-view'

const parseJSON = (stringOrObject) => {
  let o
  try {
    o = JSON.parse(stringOrObject)
  } catch (e) {
    o = stringOrObject
  }
  if (typeof o !== "object") return o
  for (let k in o) {
    o[k] = parseJSON(o[k])
  }
  return o
}

const Request = ({ data }) => (
  <div className='Request'>
    <h2><pre>{data.method} /{data.id}</pre></h2>
    <time>{data.createdAt}</time>
    <div class='payload'>
      <h3>Request Body</h3>
      <ReactJson src={parseJSON(data.payload)} 
        displayDataTypes={false}
        displayObjectSize={false}
        enableClipboard={false}
        name={null}
        iconStyle="triangle"
      />
    </div>
    <div class='headers'>
      <h3>Request Headers</h3>
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