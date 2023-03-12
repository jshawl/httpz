import React from "react";
import Link from 'next/link'

const Requests = ({ data, active, ts, appointmentId }) => (
  <div className="Requests">
    <ul>
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
              <Link href={`/${appointmentId}/${datum.createdAt}`}>
                <pre>
                  {datum.method} /{datum.id}
                  {datum.headers["user-agent"]}
                </pre>
                <time>{datum.createdAt}</time>
              </Link>
            </li>
        ))}
        <li className={ts === "new" ? "active" : ""}>
          <Link href={"/" + appointmentId + "/new"}>Try it</Link>
        </li>
    </ul>
  </div>
);

export default Requests;
