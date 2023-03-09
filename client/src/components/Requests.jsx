import React from "react";
import { Link } from "react-router-dom";
import "./Requests.css";
import Timeago from "react-timeago";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Requests = ({ data, active, ts, appointmentId }) => (
  <div className="Requests">
    <ul>
      <TransitionGroup>
        {data.map(datum => (
          <CSSTransition timeout={0} key={datum.createdAt}>
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
                <Timeago date={datum.createdAt} />
              </Link>
            </li>
          </CSSTransition>
        ))}
        <li className={ts === "new" ? "active" : ""}>
          <Link to={"/" + appointmentId + "/new"}>Try it</Link>
        </li>
      </TransitionGroup>
    </ul>
  </div>
);

export default Requests;
