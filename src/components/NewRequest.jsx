import Code from "./Code";

const host = process.env.NODE_ENV === "production" ? "https://httpz.app" : "http://localhost:3000";

const script = `fetch("${host}",{
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    ok: true,
    createdAt: new Date()
  })
})`

const NewRequest = ({ appointmentURI }) => {
  const url = `${host}/api${appointmentURI}`
  return (
    <div className="Request NewRequest">
      <div>
        <h2>WebHook URL:</h2>
        <Code language="text" content={url} />
        <hr />
        <h2>Using cURL:</h2>
        <br />
        <div>
          <h3>POST</h3>
          <p>query strings amirite</p>
          <Code language="bash" content={`curl -X POST ${url} \\
  -d "shop[name]=Supermarket&shop[products][]=fruit&shop[products][]=eggs"`} />
          <p>but also json</p>
          <Code language="bash" content={`curl -X POST \\
  -H 'Content-Type: application/json' \\
  ${url} \\
  -d '{"json": "rocks"}'`} />
          <p>and the other http verbs too</p>
          <h3>PATCH</h3>
          <Code language="bash" content={`curl -X PATCH \\
  -d "this=is&so=cool" \\
  ${url}`} />
          <h3>PUT</h3>
          <Code language="bash" content={`curl -X PUT \\
  -d "this=is&so=cool" \\
  ${url}`} />
          <h3>DELETE</h3>
          <Code language="bash" content={`curl -X DELETE ${url}`} />
        </div>
      </div>
    </div>
  );
};
export default NewRequest;
