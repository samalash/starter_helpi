import { Button } from "react-bootstrap";
import FadeIn from "./FadeIn";

export const CareerOption = ({ title, description, darkMode }: {title: string, description: string, darkMode: boolean}) => {
  return (
    <div>
      <FadeIn>
      <div className={`p-5 pb-3 shadow-xl rounded-xl ${darkMode ? "bg-[rgb(0,130,192)]" : "bg-[rgb(0,180,216)]"} text-white`}>
        <FadeIn>
          <h3 >{title}</h3>
          <p>{description}</p>
          <h4>Here are some job listings that match this career:</h4>
          <div>
            <Button href={`https://www.indeed.com/jobs?q=${title}`} target="_blank" rel="noreferrer" variant={`${darkMode ? "dark" : "light"}`}>Indeed</Button>
            <Button href={`https://www.linkedin.com/jobs/search/?keywords=${title}`} target="_blank" rel="noreferrer" variant={`${darkMode ? "dark" : "light"}`} className="m-4">LinkedIn Jobs</Button>
          </div>
        </FadeIn>
      </div>
      <div className="pt-5"></div>
      </FadeIn>
    </div>
  );
};