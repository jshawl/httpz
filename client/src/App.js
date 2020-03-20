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
  Route,
  Link,
  useParams
} from "react-router-dom";
import io from "socket.io-client";



const apiURL = 'http://localhost:3030'

class Appointment extends Component {
  constructor(props){
    super(props)
    this.state = {
      requests: []
    }
  }
  componentDidMount(){
    const {id} = this.props.match.params
    const socket = io('http://localhost:3030/')
    socket.on('request', d => {
      let {requests} = this.state
      requests.push(d)
      this.setState({...this.state, requests})
    })

    fetch(`${apiURL}/${id}.json`).then(d => d.json()).then(d => {
      let {requests} = d
      this.setState({...this.state, requests})
    })
  }
  render(){
    const {requests} = this.state
    const {ts, id} = this.props.match.params
    console.log('')
      console.log('ts', requests, this.state)
    if(!requests) return <div>Loading...</div>
    const active = requests.find(d => d.createdAt === ts)
    const data = requests.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    return (
       <div className='flex'>
         {ts === "new" ? (
            <React.Fragment>
              <Requests active={data[0]} appointmentId={id} data={data} ts="new" />
              <NewRequest appointmentURI={apiURL} />
            </React.Fragment>
         ) : (
          <React.Fragment>
            <div><Requests appointmentId={id} active={active} data={data} /></div>
            <div>{active && <Request data={active} />}</div>
          </React.Fragment>
         )}
      </div>
    )
  }
}

const App = () => (
  <div className=''>
    <Router>
      <h1><Link to="/">Restful.link</Link></h1>
      <div className="App">
      <Switch>
        <Route path="/:id/:ts" component={Appointment} />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      </div>
    </Router>
  </div>
)

export default App;
