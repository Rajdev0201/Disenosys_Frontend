import ArticleCourses from "@/screens/blog/Article";
import Banner from "@/screens/blog/BlogDetails";



async function getBlogs() {
  const res = await fetch("https://disenosys-dkhj.onrender.com/api/blog/data", {
    next: { revalidate: 60 }, // for ISR
  });
  const data = await res.json();
  return data;
}


export default async function BlogDetailsPage({params}){
    const blogs = await getBlogs();
    const {slug} = await params;
    const decodedSlug = decodeURIComponent(slug);
 return(
    <main>
        <Banner slug={decodedSlug}/>
        <ArticleCourses slug={decodedSlug} blogs={blogs}/>
    </main>
 )
}