import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./Requests.scss";
import * as timeago from "timeago.js";

const Requests = ({ data, active, ts, appointmentId }) => {
  const [redirect, setRedirect] = React.useState(null);
  return (
    <div className="Requests">
      {redirect && <Redirect to={redirect} />}
      <select
        onChange={e => setRedirect(`/${appointmentId}/${e.target.value}`)}
      >
        {data.map(datum => (
          <option
            value={datum.createdAt}
            key={datum.createdAt}
            defaultValue={
              active && active.createdAt === datum.createdAt && ts !== "new"
            }
          >
            {datum.method} /{datum.id}
            {timeago.format(new Date(datum.createdAt))}
          </option>
        ))}
        <option value="new">Try it</option>
      </select>
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
