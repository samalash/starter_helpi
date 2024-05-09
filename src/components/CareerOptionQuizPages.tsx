import FadeIn from './FadeIn';

export const CareerOptionQuizPages = (props: { title: string, description: string, darkMode: boolean}) => {
  return (
    <div className='flex justify-center'>
      <div className="pt-2 pb-2 w-1/2">
          <FadeIn key={`${props.darkMode}`}>
              <div className={`p-3 shadow-xl rounded-xl ${props.darkMode ? "bg-gradient-to-r from-[#0082C0] to-blue-700" : "bg-gradient-to-r from-[#00B4D8] to-[#0082C0]"} text-white text-center`}>
                <h3 className="text-left">{props.title}</h3>
                <p>{props.description}</p>
              </div>
          </FadeIn>
      </div>
    </div>
  );
};