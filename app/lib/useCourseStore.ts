import { create } from "zustand";
import apiClient from "@/app/lib/apiClient"; // Your API client
import { CourseFilters, MainCourse } from "../utils/interface";

interface CourseStore {
  courses: MainCourse[];
  filteredCourses: MainCourse[];
  filters: CourseFilters;
  setFilters: (update: (prev: CourseFilters) => CourseFilters) => void;
  fetchCourses: () => Promise<void>;
  searchCourses: (query: string, searchfilters?: { level?: string; department?: string }) => void;
}

export const useCourseStore = create<CourseStore>((set, get) => ({
  courses: [],
  filteredCourses: [],
  filters: {},

  setFilters: (update) => set((state) => ({ filters: update(state.filters) })),

  fetchCourses: async () => {
    try {
      const { data } = await apiClient.get<MainCourse[]>("https://tutormeapi-6w2f.onrender.com/api/v2/course/course-list/");
      console.log("Fetched Courses:", data);
      set({ courses: data, filteredCourses: data }); // Store and initialize filtered list
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  },

  searchCourses: (query, searchfilters) => {
    const { courses } = get();
    console.log("All courses in Zustand:", courses);
    console.log("Filtering with:", query, searchfilters);
    const filtered = courses.filter(course => 
      course.title.toLowerCase().includes(query.toLowerCase()) &&
      (searchfilters?.level ? course.level === searchfilters.level : true) &&
      (searchfilters?.department ? course.department.includes(searchfilters.department) : true)
    );

    console.log("Finally filtered:", filtered);
    set({ filteredCourses: filtered });
  }

 
}));
