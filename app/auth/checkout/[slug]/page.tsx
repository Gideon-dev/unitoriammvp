import { getCourse } from '@/app/lib/getCourse';
import { MainCourse } from '@/app/utils/interface';
import React from 'react';
import CheckOutPageClient from '../../../components/CheckOutPageClient';

type checkPageProps = {
   params: { slug: string };
};

export default async function CheckOutPage({ params }: checkPageProps) {
    const course: MainCourse | null = await getCourse(params.slug);

    if (!course) {
        return <p>Course not found</p>;
    }

    return <CheckOutPageClient course={course} />;
}
