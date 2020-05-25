import { IProject } from "../types";
import { projects } from "../projects";

export const useProjects = (): IProject[] => {
  return projects;
};
