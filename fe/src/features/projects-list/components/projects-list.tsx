import ProjectCard from "@/features/projects-list/components/project-card.tsx";

const SAMPLE_PROJECTS = [
  {
    id: "1",
    name: "Redesign firemního webu",
    lastUpdated: new Date("2023-11-10"),
  },
  {
    id: "2",
    name: "Mobilní aplikace",
    lastUpdated: new Date("2023-12-05"),
  },
  {
    id: "3",
    name: "Dashboard analytics",
    lastUpdated: new Date("2023-10-22"),
  },
  {
    id: "4",
    name: "E-commerce platforma",
    lastUpdated: new Date("2023-12-15"),
  },
  {
    id: "5",
    name: "Redesign loga a identity",
    lastUpdated: new Date("2023-09-20"),
  },
  {
    id: "6",
    name: "CRM systém",
    lastUpdated: new Date("2023-12-20"),
  },
];

const ProjectsList = () => {
  return (
    <div
      className={
        "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      }
    >
      {SAMPLE_PROJECTS.map((project, index) => (
        <ProjectCard project={project} key={index} />
      ))}
    </div>
  );
};

export default ProjectsList;
