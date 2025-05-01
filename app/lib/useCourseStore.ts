import { create } from "zustand";
import apiClient from "@/app/lib/apiClient"; // Your API client
import { CourseFilters, MainCourse } from "../utils/interface";

interface CourseStore {
  courses: MainCourse[];
  filteredCourses: MainCourse[];
  filters: CourseFilters;
  isFetched: boolean;
  courseLoading: boolean;
  setFilters: (update: (prev: CourseFilters) => CourseFilters) => void;
  fetchCourses: () => Promise<void>;
  setCourseLoading: (val: boolean) => void;
  searchCourses: (query: string, searchfilters?: { level?: string; department?: string }) => void;
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
      // console.log("Fetched Courses:", data);
      set({ courses: data, filteredCourses: data , isFetched:true}); // Store and initialize filtered list
    } catch (error) {
      console.error("Error fetching courses, from zustand:", error);
    }finally {
      set({ courseLoading: false });
    }
  },

  searchCourses: (query, searchfilters) => {
    const { courses } = get();
    // console.log("All courses in Zustand:", courses);
    // console.log("Filtering with:", query, searchfilters);
    const filtered = courses.filter(course => 
      course.title.toLowerCase().includes(query.toLowerCase()) &&
      (searchfilters?.level ? course.level === searchfilters.level : true) &&
      (searchfilters?.department ? course.department.includes(searchfilters.department) : true)
    );

    console.log("Finally filtered:", filtered);
    set({ filteredCourses: filtered });
  },
  setCourseLoading: (val: boolean) => set({ courseLoading: val })
}));
