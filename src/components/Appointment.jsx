import { useEffect, useState } from "react";
// import io from "socket.io-client";
import Requests from "./Requests";
import Request from "./Request";
import NewRequest from "./NewRequest";

export default function Appointment({ ts, id }) {
  const [requests, setRequests] = useState([]);
  const onDelete = async (id) => {
    await fetch(`/api/${id}`, { method: "delete", headers: {
      "x-httpz-internal": true
    }});
    window.location = '/';
  }
  useEffect(() => {
    if (!id) return;
    fetch(`/api/${id}`)
      .then((d) => d.json())
      .then((d) => {
        if(d === null){
          setRequests(null)
          return
        }
        let { requests } = d;
        setRequests(requests);
      });
  }, [id]);
  if(requests === null) return <div>Not Found.</div>
  if (!requests.length && ts !== "new") return <div>Loading...</div>;
  const active = requests.find((d) => d.createdAt === ts);
  const data = requests.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return (
    <>
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
        />
      )}
     
    </div>
    <hr />
        <button className="delete" onClick={() => onDelete(id)}>
          Delete
        </button>
    </>
  );
}


