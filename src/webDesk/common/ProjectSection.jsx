import { Calendar, Check, FileText, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const ProjectSection = ({ projectData, setProjectData }) => {
  const [uploadProjects, setUploadProjects] = useState("no");

  const handleAddProject = () => {
    setProjectData([
      ...projectData,
      {
        projectName: "",
        completionDate: "",
        projectDescription: "",
        projectFile: null,
      },
    ]);
  };

  const handleRemoveProject = (index) => {
    setProjectData(projectData.filter((_, i) => i !== index));
  };

  // Immutable update
  const handleProjectChange = (index, field, value) => {
    setProjectData(
      projectData.map((proj, i) =>
        i === index ? { ...proj, [field]: value } : proj
      )
    );
  };

  return (
    <>
      <label className="block mb-4 text-gray-700 font-medium">
        Would you like to upload your projects?
      </label>
      <div className="flex gap-6 mb-6">
        {["yes", "no"].map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="radio"
              value={option}
              checked={uploadProjects === option}
              onChange={() => setUploadProjects(option)}
              className="text-teal-600 focus:ring-teal-500"
            />
            <span>
              {option === "yes" ? "Yes, Upload Now" : "No, Upload Later"}
            </span>
          </label>
        ))}
      </div>

      {uploadProjects === "yes" &&
        projectData.map((project, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
            {/* Project Name */}
            <InputField
              label="Project Name"
              value={project.projectName}
              onChange={(e) =>
                handleProjectChange(index, "projectName", e.target.value)
              }
              placeholder="Enter project name"
              icon={<FileText className="text-gray-400" size={20} />}
            />

            {/* Completion Date */}
            <InputField
              type="date"
              label="Completion Date"
              value={project.completionDate}
              onChange={(e) =>
                handleProjectChange(index, "completionDate", e.target.value)
              }
              icon={<Calendar className="text-gray-400" size={20} />}
            />

            {/* Description */}
            <div className="md:col-span-3">
              <InputField
                label="Project Description"
                value={project.projectDescription}
                onChange={(e) =>
                  handleProjectChange(
                    index,
                    "projectDescription",
                    e.target.value
                  )
                }
                placeholder="Enter project description"
                icon={<FileText className="text-gray-400" size={20} />}
              />
            </div>

            {/* File */}
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project File
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  handleProjectChange(
                    index,
                    "projectFile",
                    e.target.files?.[0] || null
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              {project.projectFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {project.projectFile.name}
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="md:col-span-3 flex justify-between items-center">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveProject(index)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1">
                  <Trash2 size={16} />
                  Remove
                </button>
              )}
              {index === projectData.length - 1 && (
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="text-teal-600 hover:text-teal-800 flex items-center gap-1">
                  <Plus size={16} />
                  Add Another Project
                </button>
              )}
            </div>
          </div>
        ))}
    </>
  );
};

const InputField = ({
  label,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
  disabled,
}) => (
  <motion.div layout className="space-y-1">
    {label && (
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
    )}
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition"
      />
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
    </div>
  </motion.div>
);

export default ProjectSection;
