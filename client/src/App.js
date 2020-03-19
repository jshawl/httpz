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
import { Menu, Grid } from 'semantic-ui-react'


const apiURL = 'http://localhost:3030'

const Appointment = () => {
  const {id, ts} = useParams()
  let [requests, loading] = useFetch(
    `${apiURL}/${id}.json`
  );

  if(loading) return <div>loading...</div>

  if(ts === "new"){
    return (
      <Grid columns={2} padded>
        <Grid.Column width={5}><Requests active={requests.requests[0]} data={requests} ts="new" /></Grid.Column>
        <Grid.Column width={11}><NewRequest appointmentURI={apiURL} /></Grid.Column>
      </Grid>
    )
  }
  const active = requests?.requests.find(d => d.createdAt === ts)
  return (
    <Grid columns={2} padded>
      <Grid.Column width={5}><Requests active={active} data={requests} /></Grid.Column>
      <Grid.Column width={11}>{active && <Request data={active} />}</Grid.Column>
    </Grid>
  )
}

const App = () => (
  <div className='ui inverted segment'>
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
