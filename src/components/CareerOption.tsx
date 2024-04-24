export const CareerOptions = (props: { title: string, description: string }) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
};