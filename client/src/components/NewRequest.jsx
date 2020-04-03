import React from "react";
import "./NewRequest.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const script = (uri) =>
  `fetch('${uri}',{
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    ok: true,
    createdAt: new Date()
  })
})`;

const evaluate = (code, callback) => {
  // eslint-disable-next-line
  eval(code)
    .then((res) => res.json())
    .then(callback);
};

const NewRequest = ({ appointmentURI }) => {
  return (
    <div className="Request NewRequest">
      <Tabs>
        <TabList>
          <Tab>JavaScript</Tab>
          <Tab>curl</Tab>
          <Tab>Webhooks</Tab>
        </TabList>
        <TabPanel>
          <p>content-editable javascript:</p>
          <script
            id="script"
            contentEditable="true"
            type="text/demo"
            style={{ display: "block" }}
          >
            {script(appointmentURI)}
          </script>
          <button
            onClick={() =>
              evaluate(document.getElementById("script").innerHTML, (_) => _)
            }
          >
            Run Snippet
          </button>
        </TabPanel>
        <TabPanel>
          <p>query strings amirite</p>
          <pre className="bash">
            curl -X <strong>POST</strong> -d
            "shop[name]=Supermarket&shop[products][]=fruit&shop[products][]=eggs"{" "}
            {appointmentURI}
          </pre>
          <p>but also json</p>
          <pre className="bash">
            curl -X <strong>POST</strong> -d \ '{"{"}"json":"rocks"{"}"}' -H
            'Content-Type: application/json' {appointmentURI}
          </pre>
          <p>and the other http verbs too</p>
          <pre className="bash wrap">
            curl -X <strong>PATCH</strong> -d "this=is&so=cool" {appointmentURI}
          </pre>
          <pre className="bash wrap">
            curl -X <strong>PUT</strong> -d "this=is&so=cool" {appointmentURI}
          </pre>
          <pre className="bash wrap">
            curl -X <strong>DELETE</strong> {appointmentURI}
          </pre>
        </TabPanel>
        <TabPanel>
          <p>this is your webhook url:</p>
          <pre className="wrap">{appointmentURI}</pre>
        </TabPanel>
      </Tabs>
    </div>
  );
};
export default NewRequest;
