import Banner from "@/screens/description/Banner";
import CourseDetails from "@/screens/description/CourseDetails";




export async function generateMetadata ({params}) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    return {
        title:decodedSlug,
        description: `Comprehensive course covering essential concepts, practical skills, and industry insights to enhance your expertise. ${decodedSlug}`
      }
}


export default async function DescriptionPage({params}){
    const {slug} = await params;
    const decodedSlug = decodeURIComponent(slug);
    return(
        <main>
            <Banner slug={decodedSlug}/>
            <CourseDetails slug={decodedSlug}/>
        </main>
    )
}