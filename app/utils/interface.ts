import { StaticImageData } from "next/image";

 export interface EyeToggleProps {
    onToggle?: () => void; 
    className?: string;
    isVisible: boolean; 
}

export interface genericInputProps {
    id?: string,
    parentClass?: string,
    inputClass?: string,
    type?:string,
    placeholder?: string,
    label?: string,
    value?: string,
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface formBtnProps {
    btnStyling?: string,
    btnlabel?: string,
    icon?: StaticImageData | string,
    iconStyle?: string,
    btnName: string,
    isDisabled?: boolean,
    id?: string,
    isLoading?: boolean
}
  
export interface signInFormSchema {
    email: string,
    password: string,
}

export interface RatedBoxProps {
    course_jpg: string,
    author_name: string,
    tut_topic: string,
    subject_icon: string,
    price: number,
    isNew: boolean;
    id?: number
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
    description: string;
    intro_url: string;
    video_url: string;
    content_duration: string;
    preview: boolean;
    variant_item_id: string;
    hls_video_url: string;
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
    tutor_course_status: string;
    featured: boolean;
    course_id: string;
    slug: string;
    date: string; // ISO date format string
    lectures: Lecture[];
    average_rating: number | null;
    rating_count: number;
    review: unknown[]; // Assuming an array of reviews (modify if needed)
}

export interface EnrolledCourse {
    course: string; // Course ID or name (e.g., "GEL121")
    course_slug: string; // Unique course slug (e.g., "gel12141cfOpqSZ2")
    course_image: string; // Course image URL
    user: string; // User email
    tutor: string; // Tutor name
    lectures: EnrolledLecture[]; // List of enrolled lectures
    completed_lesson?: any[]; // Define proper type if available
    curriculum?: any[]; // Define proper type if available
    note?: any[]; // Define proper type if available
    question_answer?: any[]; // Define proper type if available
    review: string | null; // Course review (if available)
    enrollment_id: string; // Unique enrollment ID
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
  
export type TutorialCardProps = Pick<MainCourse, | "tutor" | "image" | "description" | "price" | "title">

export interface EnrolledCardprops {
    tutor: string,
    course_image: string,
    topic: string
}


export interface Dept {
    institution: number,
    name: string
}