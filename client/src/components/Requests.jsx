import React from 'react'
import {Link} from 'react-router-dom'
import './Requests.scss'
import Timeago from 'react-timeago'

const Requests = ({data, active, children, ts, appointmentId}) => (
  <div className='Requests'>
    <ul> 
      {data.map((datum, i) => (
        <li className={active.createdAt === datum.createdAt && !ts ? 'active' : ''}>
          <Link to={`/${active.id}/${datum.createdAt}`}>
            <pre>{datum.method} /{datum.id}</pre>
            <Timeago date={datum.createdAt} />
          </Link>
        </li>
      ))}
      <li className={ts === "new" ? 'active' : ''}>
        <Link to={"/" + appointmentId + "/new"}>Try it</Link>
      </li>
    </ul>
  </div>
)

export default Requests