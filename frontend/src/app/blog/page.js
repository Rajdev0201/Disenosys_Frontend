import Banner from "@/screens/blog/Banner";
import BlogInsights from "@/screens/blog/BlogInsights";
import BrowseCourse from "@/screens/blog/BrowseCourse";


export const metadata = {
  title: "Blog",
  description: "Latest blogs from Disenosys",
};


async function getBlogs() {
  const res = await fetch("https://disenosys-backendv2-9yuy.onrender.com/data", {
    next: { revalidate: 60 },
  });
 console.log("Blog API response:", res);
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


export default async function BlogPage () {
      const blogs = await getBlogs();
    return(
        <main>
            <Banner/>
            <BlogInsights blogs={blogs}/>
            <BrowseCourse/>
        </main>
    )
}