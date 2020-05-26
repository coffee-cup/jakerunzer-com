import { projects } from "../projects";
import { IProject } from "../types";

export const useProjects = (): IProject[] => {
  return projects;
};
