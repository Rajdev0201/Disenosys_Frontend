import Banner from "@/pages/blog/Banner";
import BlogInsights from "@/pages/blog/BlogInsights";
import BrowseCourse from "@/pages/blog/BrowseCourse";


export const metadata = {
  title: "Blog",
  description: "Latest blogs from Disenosys",
};

async function getBlogs() {
  const res = await fetch("https://disenosys-dkhj.onrender.com/api/blog/data", {
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