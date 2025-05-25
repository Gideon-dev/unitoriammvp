import { create } from "zustand";
import apiClient from "@/app/lib/apiClient"; // Your API client
import { CourseFilters, MainCourse, searchFilters } from "../utils/interface";

interface CourseStore {
  courses: MainCourse[];
  filteredCourses: MainCourse[];
  filters: CourseFilters;
  isFetched: boolean;
  courseLoading: boolean;
  setFilters: (update: (prev: CourseFilters) => CourseFilters) => void;
  fetchCourses: () => Promise<void>;
  setCourseLoading: (val: boolean) => void;
  searchCourses: (query?: string, searchfilters?: searchFilters) => void;
}

export const useCourseStore = create<CourseStore>((set, get) => ({
  courses: [],
  filteredCourses: [],
  filters: {},
  isFetched: false,
  courseLoading: false,
  setFilters: (update) => set((state) => ({ filters: update(state.filters) })),
  fetchCourses: async () => {
    set({ courseLoading: true });
    try {
      const { data } = await apiClient.get<MainCourse[]>("https://tutormeapi-6w2f.onrender.com/api/v2/course/course-list/");
      set({ courses: data, filteredCourses: data , isFetched:true}); // Store and initialize filtered list
    } catch (error) {
      console.error("Error fetching courses, from zustand:", error);
    }finally {
      set({ courseLoading: false });
    }
  },

  searchCourses: (query, searchfilters) => {
    const { courses } = get();
  
    const filtered = courses.filter(course => 
      // Only check course title if query is provided
      (query ? course.title.toLowerCase().includes(query.toLowerCase()) : true) &&
  
      // Check level if provided
      (searchfilters?.level ? course.level === searchfilters.level : true) &&
  
      // Check department if provided
      (searchfilters?.department
        ? course.department.some(dept =>
            dept.toLowerCase().startsWith(searchfilters.department!.toLowerCase())
          )
        : true)
    );
    set({ filteredCourses: filtered });
  },
  setCourseLoading: (val: boolean) => set({ courseLoading: val })
}));
