import FadeIn from './FadeIn';

// CareerOptionQuizPages component that takes in a title, description, and darkMode prop
export const CareerOptionQuizPages = (props: { title: string, description: string, darkMode: boolean}) => {
  return (
    <div className='flex justify-center'>
      <div className="pt-2 pb-2 w-1/2">
          <FadeIn key={`${props.darkMode}${"CareerOptionQuizPages"}`}>
              <div className={`p-3 shadow-xl rounded-xl ${props.darkMode ? "bg-gradient-to-r from-[#0082C0] to-blue-700" : "bg-gradient-to-r from-[#00B4D8] to-[#0082C0]"} text-white`}>
                <h3 className="text-left">{props.title}</h3>
                <p>{props.description}</p>
              </div>
          </FadeIn>
      </div>
    </div>
  );
};