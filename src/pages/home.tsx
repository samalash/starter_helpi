import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

const name = localStorage.getItem("name");
const jobs = ["Job+1", "Job+2", "Job+3"];
const indeedJoblinks = ["https://www.indeed.com/jobs?q=" + jobs[0], "https://www.indeed.com/jobs?q=Job+2", "https://www.indeed.com/jobs?q=Job+3"];
const linkedinJoblinks = ["https://www.linkedin.com/jobs/search/?keywords=Job+1", "https://www.linkedin.com/jobs/search/?keywords=Job+2", "https://www.linkedin.com/jobs/search/?keywords=Job+3"];


function Home() {
  const [isSignedIn] = useState<boolean>(localStorage.getItem("isSignedIn") === "true"); //for sign in button

  return (
    <div className="App">
      <Header />
      <div className="min-vh-100 pt-30">
        { !isSignedIn ? (
        <div>
          <h1 className="pb-3">Our Title</h1>
          <div className="w-50 mx-auto">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed ligula nec ante vehicula dignissim vel nec ex. Sed condimentum metus vitae elit condimentum, sed hendrerit libero sodales. Integer eget arcu id ligula fringilla ullamcorper. Sed in magna nec metus viverra accumsan. Integer in augue a ligula congue eleifend non sed nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi. Nullam ut lorem sapien. Nunc accumsan purus id tortor gravida, ut consequat quam feugiat. Sed consectetur, lorem vitae condimentum congue, nisl nulla suscipit urna, non fermentum mauris sapien non nisi. Curabitur bibendum ipsum vitae lectus sollicitudin, nec ultrices elit sodales. Nunc id elit eget tortor malesuada malesuada. Sed euismod purus nec justo vulputate, ut lacinia dui dignissim. Etiam in velit nec est scelerisque ultrices. Sed dignissim velit non tincidunt posuere.</p>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="pb-3">Welcome {name !== "" ? "b" : "B"}ack{name !== "" && ", " + name}!</h1>
          <h2 className="pb-3">Here are your career recommendations:</h2>
          <div className="w-50 mx-auto">
            <ol>
              {jobs.map((job, index) => (
                <li key={index}>
                  <h3>{job.replace("+", " ")}</h3>
                    <a href={`https://www.indeed.com/jobs?q=${job}`} target="_blank" rel="noreferrer">Indeed</a>
                    <p></p>
                    <a href={`https://www.linkedin.com/jobs/search/?keywords=${job}`} target="_blank" rel="noreferrer" className="ml-4">LinkedIn Jobs</a>
                </li>
              ))}
            </ol>
          </div>
          <h2 className="mb--10 pb-3 pt-30">Take the quiz again:</h2>
        </div>
      )}
        <div className="pt-10">
          <Button href="#/basic-questions">Basic Questions</Button>
          <Button href="#/detailed-questions" className="ml-4">Detailed Questions</Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
