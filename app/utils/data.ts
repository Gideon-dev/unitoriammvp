import { CourseSubject, DepartmentProps } from "./interface"

export const dataRated: CourseSubject[] = [
  {
    "id": 1,
    "author_name": "John Doe",
    "tut_topic": "How to solve Arithmetic Progression (A.P) like a pro",
    "tut_description": "Learn how to solve arithmetic progression problems in this easy-to-follow tutorial. We'll break down the key concepts, formulas, and steps to help you understand how to find the nth term, sum, and common difference in any arithmetic sequence",
    "subject_icon": "/subject-icon.svg",
    "price": 49.99,
    "isNew": true,
    "course_jpg": "/course_img_1.png"
  },
  {
    "id": 2,
    "author_name": "Jane Smith",
    "tut_topic": "Advanced JavaScript",
    "tut_description": "Deep dive into modern JavaScript concepts like closures, async/await, and ES6+.",
    "subject_icon": "/subject-icon.svg",
    "price": 79.99,
    "isNew": false,
    "course_jpg": "/tutor.png"
  },
  {
    "id": 3,
    "author_name": "Emily Johnson",
    "tut_topic": "Python for Data Science",
    "tut_description": "Master Python for data analysis, visualization, and machine learning.",
    "subject_icon": "/subject-icon.svg",
    "price": 59.99,
    "isNew": true,
    "course_jpg": "/course_img_1.png"
  },
  {
    "id": 4,
    "author_name": "Michael Brown",
    "tut_topic": "UI/UX Design Principles",
    "tut_description": "Explore fundamental UI/UX design principles and best practices.",
    "subject_icon": "/subject-icon.svg",
    "price": 39.99,
    "isNew": false,
    "course_jpg": "/course_img_2.png"
  },
  {
    "id": 5,
    "author_name": "Sarah Lee",
    "tut_topic": "Machine Learning Basics",
    "tut_description": "Introduction to machine learning concepts and practical applications.",
    "subject_icon": "/subject-icon.svg",
    "price": 99.99,
    "isNew": true,
    "course_jpg": "/course_img_1.png"
  }
];


  export const departments:DepartmentProps[] = [
  {
    "id": 1,
    "name": "Engineering",
    "description": "Responsible for software and hardware development.",
    "head": "Alice Johnson"
  },
  {
    "id": 2,
    "name": "Marketing",
    "description": "Handles branding, advertising, and market research.",
    "head": "Michael Smith"
  },
  {
    "id": 3,
    "name": "Human Resources",
    "description": "Manages employee relations, recruitment, and benefits.",
    "head": "Sarah Williams"
  },
  {
    "id": 4,
    "name": "Finance",
    "description": "Oversees budgeting, investments, and financial planning.",
    "head": "David Brown"
  },
  {
    "id": 5,
    "name": "Customer Support",
    "description": "Provides assistance and support to customers.",
    "head": "Emily Davis"
  }
]



  