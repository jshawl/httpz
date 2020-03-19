import React from 'react'
import {Link} from 'react-router-dom'
import './Requests.scss'
import {Menu} from 'semantic-ui-react'

const Requests = ({data, active, children, ts}) => (
  <div className='Requests inverted ui segment'>
    <h2>Requests</h2>
    <Menu vertical fluid pointing> 
      {data?.requests.map((datum, i) => (
        <Menu.Item active={active.createdAt === datum.createdAt && !ts}>
          <Link to={`/${active.id}/${datum.createdAt}`}>
            <pre>{datum.method} /{datum.id}</pre>
            <time>{datum.createdAt}</time>
          </Link>
        </Menu.Item>
      ))}
      <Menu.Item active={ts === "new"}>
        <Link to={"/" + data._id + "/new"} >Try it</Link>
      </Menu.Item>
    </Menu>
  </div>
)

export default Requests