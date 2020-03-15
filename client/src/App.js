import React, {useState, Component} from 'react';
import './App.scss';
import Requests from './components/Requests'
import Request from './components/Request'
import Home from './components/Home'
import NewRequest from './components/NewRequest'
import {useFetch} from './hooks'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
  useParams
} from "react-router-dom";

const apiURL = 'http://localhost:3030'

const Appointment = () => {
  const {id, ts} = useParams()
  let [requests, loading] = useFetch(
    `${apiURL}/${id}.json`
  );

  if(loading) return <div>loading...</div>

  if(ts == "new"){
    return (
      <React.Fragment>
        <Requests active={requests.requests[0]} data={requests} />
        <NewRequest appointmentURI={apiURL}/>
      </React.Fragment>
    )
  }
  const active = requests?.requests.find(d => d.createdAt == ts)
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
      <h1><Link to="/">Restful.link</Link></h1>
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
