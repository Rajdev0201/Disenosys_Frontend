import ArticleCourses from "@/screens/blog/Article";
import Banner from "@/screens/blog/BlogDetails";



async function getBlogs() {
  const res = await fetch("https://disenosys-backendv2-9yuy.onrender.com/data", {
    next: { revalidate: 60 }, // for ISR
  });
  if (!res.ok) {
    console.error("Blog API failed:", res.status);
    return [];
  }

  const contentType = res.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    console.error("Invalid response type:", contentType);
    return [];
  }

  return res.json();
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