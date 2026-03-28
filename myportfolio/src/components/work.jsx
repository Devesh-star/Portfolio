import React, { useState } from "react";
import { projects } from "../constants";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handelOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handelCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section
      id="work"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans relative"
    >
      {/* Section title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-4xl text-white font-bold transition-transform duration-200 hover:scale-110">PROJECTS</h2>
        <div className="w-32 h-1 bg-[#8245ec] mx-auto mt-2 mb-2"></div>
        <p className="text-gray-300 text-lg font-semibold">
          A showcase of the projects I have worked on, highlighting my skills
          and experience in various technologies
        </p>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project) => {
          return (
            <div
              key={project.id}
              onClick={() => handelOpenModal(project)}
              className="border border-white bg-gray-900 backdrop-blur-md rounded-2xl overflow-hidden cursor-pointer shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-transform duration-300"
            >
              <div className="p-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full object-cover h-48 rounded-xl"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-white mb-2 text-2xl">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 pt-4 line-clamp-3">
                  {project.description}
                </p>
                <div>
                  {project.tags.map((tag, index) => {
                    return (
                      <span
                        key={index}
                        className="inline-block bg-[#251f38] text-xs font-semibold text-purple-500 rounded-full px-2 py-1 mr-2 mb-2"
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Container */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
          <div className="bg-gray-900 rounded-xl shadow-2xl lg:w-full w-[90%] max-w-3xl overflow-hidden relative">
            <div className="flex justify-end p-4">
              <button
                onClick={handelCloseModal}
                className="text-white text-3xl font-bold hover:text-purple-500"
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col">
              <div className="w-full flex justify-center bg-gray-900 px-4">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="lg:w-full w-[95%] h-48 object-contain rounded-xl shadow-2xl"
                />
              </div>
              <div className="p-4">
                <h3 className="lg:text-3xl font-bold text-white mb-4 text-md">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-400 mb-6 lg:text-base text-xs">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tags.map((tag, index) => {
                    return (
                      <span
                        key={index}
                        className="bg-[#251f38] text-xs font-semibold text-purple-500 rounded-full px-2 py-1"
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
                <div className="flex gap-4">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-1/2 bg-gray-800 hover:bg-purple-800 text-gray-400 lg:px-6 lg:py-2 px-2 py-1 rounded-xl lg:text-xl text-sm font-semibold text-center"
                  >
                    View Code
                  </a>
                  <a
                    href={selectedProject.webapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-1/2 bg-purple-600 hover:bg-purple-800 text-white lg:px-6 lg:py-2 px-2 py-1 rounded-xl lg:text-xl text-sm font-semibold text-center"
                  >
                    View Live
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;