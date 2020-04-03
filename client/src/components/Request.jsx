import React, { useState, useEffect } from "react";
import "./Request.scss";
import ReactJson from "react-json-view";

const parseJSON = (stringOrObject) => {
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

const request = ({ method, headers, payload }, url, callback) => {
  headers["content-type"] = "application/json";
  fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(payload),
  })
    .then(callback)
    .catch((err) => callback(err.toString()));
};

const Request = ({ data, onDelete, appointmentURI }) => {
  const [url, setUrl] = useState(
    localStorage.getItem("httpz.proxy.url") || appointmentURI
  );
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  useEffect(() => {
    localStorage.setItem("httpz.proxy.url", url);
  }, [url]);
  if (!data) return <div className="Request">Gone.</div>;
  return (
    <div className="Request">
      <h2>
        <pre>
          {data.method} /{data.id}
        </pre>
      </h2>
      <time>{data.createdAt}</time>
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
      <hr />
      <div className="controls">
        <button
          onClick={() => {
            setLoading(true);
            request(data, url, (res) => {
              setLoading(false);
              setResponse(res);
            });
          }}
        >
          Resend{loading && "ing"} request to
        </button>
        <div className={response && "response"}>
          {response && response.status ? (
            <div>
              {response.status} {response.statusText}
            </div>
          ) : (
            <div>{response}</div>
          )}
        </div>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="http://localhost:3000/"
          type="text"
        />
        <hr />
        <button className="delete" onClick={() => onDelete(data, url)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Request;
