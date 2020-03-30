import React, {useState, useEffect} from "react";
import "./Request.scss";
import ReactJson from "react-json-view";
import Popup from "reactjs-popup";


const parseJSON = stringOrObject => {
  let o;
  try {
    o = JSON.parse(stringOrObject);
  } catch (e) {
    o = stringOrObject;
  }
  if (typeof o !== "object") return o;
  for (let k in o) {
    o[k] = parseJSON(o[k]);
  }
  return o;
};

const request = (data, url) => {
  data.headers["content-type"] = "application/json"
  console.log('fetching', url, data)
  fetch(url, {
    method: data.method,
    headers: data.headers,
    body: JSON.stringify(data.payload)
  }).then((err,res) => {
    console.log('got', err, res)
  })
}

const Request = ({ data, onDelete, appointmentURI }) => {
  const [url, setUrl] = useState(localStorage.getItem("httpz.proxy.url") || appointmentURI)
  useEffect(() => {
    localStorage.setItem("httpz.proxy.url", url)
  },[url])
  if (!data) return <div className="Request">Gone.</div>;
  return (
    <div className="Request">
      <h2>
        <pre>
          {data.method} /{data.id}
        </pre>
      </h2>
      <time>{data.createdAt}</time>
      <div class='controls'>
        <button onClick={() => {
          request(data, url)
        }}>Resend request to</button>
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="http://localhost:3000/" type="text" />
        
        <button className="delete" onClick={() => onDelete(data, url)}>
          Delete
        </button>
      </div>
      <div className="payload">
        <h3>Request Body</h3>
        <ReactJson
          src={parseJSON(data.payload)}
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
          name={null}
          iconStyle="triangle"
        />
      </div>
      <div className="headers">
        <h3>Request Headers</h3>
        <ReactJson
          src={data.headers}
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
          name={null}
          iconStyle="triangle"
        />
      </div>
    </div>
  );
};

export default Request;
