export const CareerOptionQuizPages = (props: { title: string, description: string }) => {
  return (
    <div className="pt-10">
      <h3 className="text-left">{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
};