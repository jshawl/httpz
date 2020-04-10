import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./Requests.scss";
import * as timeago from "timeago.js";
import Select from "react-select";

const Requests = ({ data, active, ts, appointmentId }) => {
  const [redirect, setRedirect] = React.useState(null);
  return (
    <div className="Requests">
      {redirect && <Redirect to={redirect} />}
      <Select
        placeholder="Recent Requests"
        onChange={({ value }) => setRedirect(`/${appointmentId}/${value}`)}
        options={[
          { value: "new", label: "try it" },
          ...data.map(d => ({
            value: d.createdAt,
            label: `${d.method}/${d.id} - ${timeago.format(
              new Date(d.createdAt)
            )}`
          }))
        ]}
      />
      <ul style={{ display: "none" }}>
        {data.map(datum => (
          <li
            data-key={datum.createdAt}
            key={datum.createdAt}
            className={
              active &&
              active.createdAt === datum.createdAt &&
              ts !== "new" &&
              "active"
            }
          >
            <Link to={`/${appointmentId}/${datum.createdAt}`}>
              <pre>
                {datum.method} /{datum.id}
              </pre>
              <pre className="soft">{datum.headers["user-agent"]}</pre>
              <span> date={datum.createdAt}</span>
            </Link>
          </li>
        ))}
        <li className={ts === "new" ? "active" : ""}>
          <Link to={"/" + appointmentId + "/new"}>Try it</Link>
        </li>
      </ul>
    </div>
  );
};

export default Requests;
