import Banner from "@/screens/blog/Banner";
import BlogInsights from "@/screens/blog/BlogInsights";
import BrowseCourse from "@/screens/blog/BrowseCourse";


export const metadata = {
  title: "Blog",
  description: "Latest blogs from Disenosys",
};

async function getBlogs() {
  const res = await fetch("https://disenosys-backendv2-9yuy.onrender.com/api/blog/data", {
    next: { revalidate: 60 }, // for ISR
  });
  const data = await res.json();
  return data;
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