import { useState, useEffect } from "react";
import  JobList  from "./JobList";
import { loadJobs } from "../graphql/requests";

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    loadJobs()
      .then(setJobs)
      .catch((err) => setError(true));
  }, []);

  if (error) {
    return <p>sorry, something went wrong! Please try again later.</p>
  }
  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
