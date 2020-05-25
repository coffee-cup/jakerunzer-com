import { orderBy } from "lodash";
import { useMemo } from "react";
import { IEntry } from "../types";
import { usePosts } from "./usePosts";
import { useProjects } from "./useProjects";

export const useLatest = (): IEntry[] => {
  const posts = usePosts();
  const projects = useProjects();

  const sortedEntries = useMemo(() => {
    const entries: IEntry[] = [...posts, ...projects];
    return orderBy(entries, e => e.date, ["desc"]).slice(0, 5);
  }, [posts, projects]);

  return sortedEntries;
};
