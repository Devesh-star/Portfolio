import React from "react";
import { education } from "../constants";

const Education = () => {
  return (
    <section
      id="education"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans bg-skills-gradient clip-path-custom3"
    >
      {/* Section title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-4xl text-white font-bold">
          EDUCATION
        </h2>
        <div className="w-32 h-1 bg-[#8245ec] mx-auto mt-2 mb-2"></div>
        <p className="text-gray-300 text-lg font-semibold">
            My education has been a journey of learning and development. Here are the details of my academic background
        </p>
      </div>

      {/* Education Timeline */}
      <div className="relative">
        <div className="absolute sm:left-1/2 left-0 md:hidden lg:block transform -translate-x-1/2 sm:translate-x-0 w-1 h-full bg-white"></div>
        {education.map((education, index) => {
          return (
            <div
              key={education.id} className={`flex flex-col sm:flex-row items-center mb-16 ${index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"}`}>
              {/* Timeline Circle */}
              <div className="absolute sm:left-1/2 md:hidden lg:block left-0 transform -translate-x-1/2 bg-gray-400 border-4 border-[#8245ec] w-12 h-12 sm:w-16 sm:h-16 rounded-full flex justify-center items-center z-10">
                <img
                  src={education.img}
                  alt={education.school}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Content Section */}
              <div
                className={`w-full sm:max-w-md p-4 sm:p-8 rounded-2xl border border-white bg-gray-900 backdrop-blur-md shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] 
                    ${index % 2 === 0 ? "sm:ml-0" : "sm:mr-0"} sm:ml-11 sm:mr-10 ml-8 transform transition-transform duration-300 hover:scale-105`}
              >
                {/* Flex container for img and text */}
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-22 bg-white rounded-md overflow-hidden">
                    {/* School logo */}
                    <img
                      className="w-full h-full object-full"
                      src={education.img}
                      alt={education.school}
                    />
                  </div>
                  {/* Degree , School Name and Date */}
                  <div>
                    <div className="flex flex-col justify-between">
                      <h3 className="text-xl sm:text-[18px] font-semibold text-white">
                        {education.degree}
                      </h3>
                      <h4 className="text-md sm:text-sm text-gray-300">
                        {education.school}
                      </h4>
                    </div>
                    {/* Date */}
                    <p className="text-sm text-gray-500 mt-2">
                      {education.date}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-400 font-bold">Grade: {education.grade}</p>
                <p className="text-gray-400 mt-4">{education.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Education;