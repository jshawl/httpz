import React from 'react';
import './App.scss';
import Requests from './components/Requests'
import Request from './components/Request'
import Home from './components/Home'
import NewRequest from './components/NewRequest'
import {useFetch} from './hooks'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import { Menu } from 'semantic-ui-react'


const apiURL = 'http://localhost:3030'

const Appointment = () => {
  const {id, ts} = useParams()
  let [requests, loading] = useFetch(
    `${apiURL}/${id}.json`
  );

  if(loading) return <div>loading...</div>

  if(ts === "new"){
    return (
      <React.Fragment>
        <Requests active={requests.requests[0]} data={requests} ts="new" />
        <NewRequest appointmentURI={apiURL} />
      </React.Fragment>
    )
  }
  const active = requests?.requests.find(d => d.createdAt === ts)
  return (
    <React.Fragment>
      <Requests active={active} data={requests} />
      {active && <Request data={active} />}
    </React.Fragment>
  )
}

const App = () => (
  <div >
    <Router>
      <Menu basic inverted fluid>
        <Menu.Item>
        <h1><Link to="/">Restful.link</Link></h1>
        </Menu.Item>
      </Menu>
      
      <div className="App">
      <Switch>
        <Route path="/:id/:ts">
          <Appointment />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      </div>
    </Router>
  </div>
)

export default App;
