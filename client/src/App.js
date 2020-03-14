import React, {useState, Component} from 'react';
import './App.scss';
import Requests from './components/Requests'
import Request from './components/Request'
import Home from './components/Home'
import {useFetch} from './hooks'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
  useParams
} from "react-router-dom";

const Appointment = () => {
  const {id, ts} = useParams()
  let [requests, loading] = useFetch(
    `http://localhost:3030/${id}.json`
  );
  let active

  if(loading) return <div>loading...</div>

  // missing a ts value
  if(requests.requests && requests.requests.length && !ts){
    let req = requests.requests[0]
    return <Redirect to={"/" + req.id + "/" + req.createdAt} />
  }
  if(requests.requests && requests.requests.length){
    active = requests.requests.find(d => d.createdAt == ts)
  }
  return (
    <React.Fragment>
      <Requests active={active} data={requests} />
      {active && <Request data={active} />}
    </React.Fragment>
  )
}

const App = () => (
  <div className="App">
    <Router>
      <Switch>
        <Route path="/:id/:ts?">
          <Appointment />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </div>
)

export default App;
