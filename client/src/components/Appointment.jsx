import React, { Component } from "react";
import io from "socket.io-client";
import Requests from "./Requests";
import Request from "./Request";
import NewRequest from "./NewRequest";
import { API_URL } from "../config";

class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: []
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    const socket = io(API_URL);
    socket.on("request", d => {
      let { requests } = this.state;
      requests.push(d);
      this.setState({ ...this.state, requests });
    });

    fetch(`${API_URL}/${id}.json`)
      .then(d => d.json())
      .then(d => {
        let { requests } = d;
        this.setState({ ...this.state, requests });
      });
  }
  render() {
    const { requests } = this.state;
    const { ts, id } = this.props.match.params;
    if (!requests) return <div>Loading...</div>;
    const active = requests.find(d => d.createdAt === ts);
    const data = requests.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return (
      <div className="flex">
        {ts === "new" ? (
          <React.Fragment>
            <Requests
              active={data[0]}
              appointmentId={id}
              data={data}
              ts="new"
            />
            <NewRequest appointmentURI={API_URL} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
              <Requests appointmentId={id} active={active} data={data} />
            </div>
            <div>{active && <Request data={active} />}</div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default Appointment;
