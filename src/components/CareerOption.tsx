export const CareerOption = (props: { title: string, description: string }) => {
  return (
    <div className="pt-10">
      <h3 className="text-left">{props.title}</h3>
      <p>{props.description}</p>
      <h4>Here are some job listings that match this career:</h4>
        <a href={`https://www.indeed.com/jobs?q=${props.title}`} target="_blank" rel="noreferrer">Indeed</a>
        <p></p>
        <a href={`https://www.linkedin.com/jobs/search/?keywords=${props.title}`} target="_blank" rel="noreferrer">LinkedIn Jobs</a>
    </div>
  );
};