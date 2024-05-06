import { Button } from "react-bootstrap";
import FadeIn from "./FadeIn";

export const CareerOption = (props: { title: string, description: string }) => {
  return (
    <div>
      <FadeIn>
      <div className="p-5 pb-3 shadow-xl rounded-xl bg-[rgb(0,180,216)] text-white">
        <h3 className="text-left">{props.title}</h3>
        <p>{props.description}</p>
        <h4>Here are some job listings that match this career:</h4>
        <div>
          <Button href={`https://www.indeed.com/jobs?q=${props.title}`} target="_blank" rel="noreferrer" variant="light">Indeed</Button>
          <Button href={`https://www.linkedin.com/jobs/search/?keywords=${props.title}`} target="_blank" rel="noreferrer" variant="light" className="m-4">LinkedIn Jobs</Button>
        </div>
      </div>
      <div className="pt-5"></div>
      </FadeIn>
    </div>
  );
};