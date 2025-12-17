// /BrowseCourse.js
import Link from "next/link";
export default function BrowseCourse() {
    return (

        <div className="relative sm:mx-auto max-w-7xl mx-auto p-2  sm:p-6 lg:p-0 bg-[#0D0D4C] text-white py-20 rounded-2xl mb-8 overflow-hidden mt-18">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 font-dm-sans mt-0">

                {/* Text Section */}
                <div className="relative z-10 md:max-w-xl text-center md:text-left md:pl-6">
                    <h1 className="text-2xl md:text-3xl  font-bold leading-tight md:whitespace-nowrap ">
                        Start Your <span className="text-[#3AD1FF]">Career Transformation</span> Today
                    </h1>
                    <p className="text-gray-300 mt-8 text-base md:text-lg whitespace-normal">
                        Our courses are designed to help you build job-ready skills and succeed in your <br />chosen field. Explore our programs and take your next big step.
                    </p>
                    <Link
                        href="/course"
                        className="inline-block mt-8 bg-gradient-to-r from-[#3AD1FF] to-[#00BFFF] text-white font-semibold px-6 py-3 rounded-full transition hover:opacity-90 md:pl-6"
                    >
                        Browse Our Courses →
                    </Link>
                </div>

                {/* Image Section */}
                <div className="scholar-blog w-full md:w-1/2 h-65 rounded-xl overflow-hidden shadow-2xl relative"
                    role="img"
                    aria-label="Man in business attire holding a laptop and phone, representing career success.">
                    <div className=" absolute inset-0 bg-black opacity-10"></div>

                </div>

            </div>
        </div >
    );
}