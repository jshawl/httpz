import { useEffect, useState } from "react";
// import io from "socket.io-client";
import Requests from "./Requests";
import Request from "./Request";
import NewRequest from "./NewRequest";


export default function Appointment({ts, id}){
  const [requests, setRequests] = useState([])
  useEffect(() => {
    if(!id) return
    fetch(`/api/${id}`)
    .then(d => d.json())
    .then(d => {
      let { requests } = d;
      setRequests(requests);
    });
  },[id])
  if (!requests.length && ts !== "new") return <div>Loading...</div>;
    const active = requests.find(d => d.createdAt === ts);
    const data = requests.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return (
      <div className="flex">
        <Requests
          active={ts === "new" ? data[0] : active}
          appointmentId={id}
          data={data}
          ts={ts}
        />
        {ts === "new" ? (
          <NewRequest appointmentURI={"/" + id} />
        ) : (

          <Request
            appointmentURI={"/" + id}
            data={active}
            // onDelete={this.onDelete}
          />
        )}
      </div>
    );
}
  // onDelete({ id, createdAt }) {
  //   const { requests } = this.state;
  //   const deletee = requests.findIndex(d => d.createdAt === createdAt);
  //   fetch(`/api/${id}/${createdAt}.json`, { method: "delete" });
  //   requests.splice(deletee, 1);
  //   this.setState({ ...this.state, requests });
  // }
  
// export default Appointment;
