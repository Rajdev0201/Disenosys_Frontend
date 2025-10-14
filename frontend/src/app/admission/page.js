import Banner from "@/pages/admission/Banner";
import AdmissionCourses from "@/pages/admission/Course";
import AdmissionForm from "@/pages/admission/Form";
import Process from "@/pages/admission/Process";
import MarqueeView from "@/pages/home/MarqueeSlide";




export default function AdmissionPage () {
    return (
        <div>
            <Banner/>
            <Process/>
            <AdmissionCourses/>
            <MarqueeView/>
            <AdmissionForm/>
        </div>
    )
}