import { StaticImageData } from "next/image";

 export interface EyeToggleProps {
    onToggle?: () => void; 
    className?: string;
    isVisible: boolean; 
}

export interface genericInputProps {
    id: string;
    parentClass?: string;
    inputClass?: string;
    type?: string;
    placeholder?: string;
    label?: string;
    value?: string;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    ref?: React.Ref<HTMLInputElement>;
}

export interface formBtnProps {
    btnStyling?: string;
    btnlabel: string;
    icon?: any;
    iconStyle?: string;
    btnName?: string;
    isDisabled?: boolean;
    id?: string;
    isLoading?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
}
  
export interface signInFormSchema {
    email: string,
    password: string,
}

export interface RatedBoxProps {
    course_jpg: string,
    author_name: string,
    tut_topic: string,
    course_code: string
}


export interface CourseSubject {
    id: number;
    author_name: string;
    tut_topic: string;
    subject_icon: string;
    price: number;
    isNew: boolean;
    course_jpg: string;
    tut_description: string
}
  
export interface IconProps {
    fillProperty?: string,
    styles?: string,
    triggerClick?: (event: React.MouseEvent<SVGSVGElement>) => void,
}
export interface DropdownProps {
    toDisplay?: string[],
    labelName: string,
    placeholder: string,
    onSelect: (value: string) => void,
    isLoading: boolean
}
export interface DepartmentProps {
    id: number;
    name: string;
    description: string;
    head: string;
}
export interface tutorialCardProps{
    tutorImage: string,
    tutorialTopic: string,
    subjectIcon: string
}
export interface SausageProps{
    headUrl: string,
    bodyText: string,
    tailText: string
}
  
export type JwtPayload = {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
    user_id: number;
    full_name: string;
    name: string;
    email: string;
    username: string;
};
export interface Lecture {
    course: string;
    title: string;
   cloudflare_uid: string;
    content_duration: string;
    preview: boolean;
    variant_item_id: string;
}
  
export interface MainCourse {
    id: number;
    category: string;
    tutor: string;
    institution: string;
    department: string[]; // Array since it's a list
    document: string;
    image: string;
    title: string;
    description: string;
    name: string;
    price: string; // Keeping as string since it's formatted as "1500.00"
    language: string;
    level: string;
    status: string;
    total_enrolled: string;
    tutor_course_status: string;
    featured: boolean;
    course_id: string;
    slug: string;
    date: string; // ISO date format string
    lectures: Lecture[];
    average_rating: number | null;
    rating_count: number;
    review: unknown[];
}

export interface EnrolledCourse {
    course: string; 
    course_slug: string; 
    course_image: string;
    user: string; 
    tutor: string;
    lectures: EnrolledLecture[]; 
    completed_lesson?: any[]; 
    curriculum?: any[]; 
    note?: any[]; 
    question_answer?: any[]; 
    review: string | null; 
    enrollment_id: string; 
}
export interface NewEnrolledCourseProps{
    course: NewEnrolled; 
    course_slug: string; 
    course_image: string; 
    user: string; 
    tutor: string; 
    lectures: EnrolledLecture[]; 
    completed_lesson?: any[]; 
    curriculum?: any[];
    note?: any[]; 
    question_answer?: any[]; 
    review: string | null; 
    enrollment_id: string; 
}
export interface NewEnrolled{
    title: string;
    description: string
}


// Define the EnrolledLecture interface if not already defined
export interface EnrolledLecture {
    course: string;
    title: string;
    description: string;
    intro_url: string;
    video_url: string;
    content_duration: string;
    preview: boolean;
    variant_item_id: string;
}

  
export interface CourseFilters {
    level?: string;
    department?: string;
    course?: string;
    // key?:string;
    // value?:string;
}

export type  searchFilters = Pick<CourseFilters, | "department" | "level">
  
export type TutorialCardProps = Pick<MainCourse, | "tutor" | "image" | "description" | "title">
// export interface TutorialCardProps {
//     tutor: string | undefined,
//     image: string | undefined,
//     description: string | undefined,
//     price: string | undefined,
//     title: string | undefined
// }
export interface EnrolledCardprops {
    tutor: string,
    course_image: string,
    topic: string
    title: string
}


export interface Dept {
    institution: number,
    name: string
}

export type MarkCompleteResponse = {
    message: string;
    total_completed: number;
    completed_lessons: CompletedLesson[];
};

type CompletedLesson = {
    variant_item_id: string;
};
  