export const CareerOption = (props: { title: string, description: string }) => {
  return (
    <div className="max-width-75">
      <h3 className="text-left">{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
};