import React from "react";


const data = [
    {
        name:"Students taught",
        count:"20+",
    },
    {
        name:"Projects completed",
        count:"20+",
    },
    {
        name:"Years of experience",
        count:"3+",
    },
    // {
    //     name:"test",
    //     count:"5k",
    // },

]
const About = () => {
  return (
    <div className="flex justify-center items-center flex-col  space-y-2 py-6 border-b border-gray-800">
           <h2 className="text-xl lg:text-4xl font-bold text-center mb-14">Mentor Profile</h2> 
      <h5 className="bg-gradient-to-r from-transparent via-purple-500 to-transparent text-white px-4 py-1">
        Hello
      </h5>
      <h1 className="text-white text-xl lg:text-2xl lg:mb-9">I'm Rajkumar.</h1>
      <p className=" text-white text-md lg:text-xl text-center w-3/4 lg:w-2/4 mb-16">
        I’ve spent 3+ years in software engineering, and my goal isn’t just to
        teach you to code — it’s to help you think like a professional software
        engineer, master problem-solving, and build skills you’ll use for life.
      </p>
          
      <div className="grid lg:grid-cols-3">
        {data.map((data => 
        <div key={data.name} className=" px-4">
          <div className="relative flex flex-col justify-center rounded-xl border border-gray-800 px-12 py-6 text-center w-full hover:scale-105 transition-transform duration-300 ease-in-out mb-6">
            <div className="absolute top-0 left-0 w-full h-[2px] overflow-hidden rounded-t-xl">
              <div className="mx-auto w-32 h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full" />
            </div>

            <h1 className="text-5xl font-bold text-purple-400 mb-2">{data.count}</h1>
            <h3 className="text-gray-500 text-lg">{data.name}</h3>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default About;
