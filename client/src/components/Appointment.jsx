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
      requests: null
    };
    this.onDelete = this.onDelete.bind(this);
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
        if (d) {
          let { requests } = d;
          this.setState({ ...this.state, requests });
        }
      });
  }
  onDelete({ id, createdAt }) {
    const { requests } = this.state;
    const deletee = requests.findIndex(d => d.createdAt === createdAt);
    fetch(`${API_URL}/${id}/${createdAt}.json`, { method: "delete" });
    requests.splice(deletee, 1);
    this.setState({ ...this.state, requests });
  }
  render() {
    const { requests } = this.state;
    const { ts, id } = this.props.match.params;
    const active = requests?.find(d => d.createdAt === ts);
    const data = requests?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return (
      <div className="flex" data-testid="appointment">
        {requests ? (
          <React.Fragment>
            <Requests
              active={ts === "new" ? data[0] : active}
              appointmentId={id}
              data={data}
              ts={ts}
            />
            {ts === "new" ? (
              <NewRequest appointmentURI={API_URL} />
            ) : (
              <Request data={active} onDelete={this.onDelete} />
            )}
          </React.Fragment>
        ) : (
          <div>404</div>
        )}
      </div>
    );
  }
}
export default Appointment;
