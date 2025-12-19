import Banner from "@/screens/admission/Banner";
import AdmissionCourses from "@/screens/admission/Course";
import AdmissionForm from "@/screens/admission/Form";
import Process from "@/screens/admission/Process";
import MarqueeView from "@/screens/home/MarqueeSlide";


export const metadata = () => { 
  return{
    title:"Admission"
  }
}


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