import React from 'react'
import { GraduationCap, User, ShieldCheck, ListCheck, Calendar, Gauge, ClipboardCheck, Banknote, GraduationCapIcon, Lightbulb } from "lucide-react";
import Partner from '@/screens/home/Partner';
import Image from 'next/image';
import sch from "@/components/assests/sch.jpg"
 
 
export default function GetStarted() {
    return (
        <div className='font-dm-sans'>
            {/* banner */}
            <div className="scholar px-6 sm:px-12 md:px-20 lg:px-32 xl:px-44 py-20 sm:py-28 md:py-36 lg:py-48 mt-20 text-center lg:h-[320px] text-white font-dm-sans ">
                <h1 className="text-xl sm:text-xl md:text-2xl lg:text-4xl font-bold mb-6 mt-2">
                    Disenosys Scholarship Program
                </h1>
            </div>
            {/* scholarship */}
            <div className=" w-full flex flex-col lg:flex-row items-center
         px-4 sm:px-12 md:px-20 lg:px-32 xl:px-35 py-16 gap-10 mt-0">
                <Image 
                src={sch}
                alt="scholarship"
                className='lg:-ml-10 lg:w-1/2 flex justify-start  w-full object-cover h-120' />
      
                <div className=' w-full lg:w-1/2'>
                    <h1 className="lg:text-4xl sm:text-3xl font-bold mb-10 whitespace-nowrap tracking-tighter">
                        <span className="text-[#101359]">Disenosys </span>
                        <span className="text-[#45D2FF]">Scholarship Program</span>
                    </h1>
                    <p className="text-[#8C8C8C] text-large tracking-normal
                     leading-relaxed text-regular">
                        At Disenosys, we are committed to fostering the next generation of engineers, designers, and technology experts. Our Scholarship Program aims to support students by offering financial assistance and skill development opportunities based on their performance in our
                        scholarship exam.
                    </p>
 
                </div>
 
            </div>
            {/* who can apply*/}
            <div className="bg-[#101359] w-full px-6 sm:px-12 md:px-20 lg:px-32 xl:px-25 py-10 font-dm-sans text-white">
 
 
                <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                    Who <span className="text-[#2CCAFF]">Can Apply?</span>
                </h2>
 
                <p className="text-lg text-gray-300 mb-10">
                    This scholarship is open to:
                </p>
 
                <div className="space-y-4">
 
                    <div className="flex items-start gap-4">
                        <GraduationCap className="w-8 h-8 text-[#FFFFFF]" />
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Students pursuing Mechanical, Automobile, Electrical, or Industrial Design fields.
                        </p>
                    </div>
 
                    <div className="flex items-start gap-4">
                        <User className="w-8 h-8 text-[#FFFFFF]" />
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Candidates passionate about innovation, product development, and technology.
                        </p>
                    </div>
 
                    <div className="flex items-start gap-4">
                        <ShieldCheck className="w-8 h-8 text-[#FFFFFF]" />
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Applicants with a strong academic background or exceptional project work.
                        </p>
                    </div>
 
                </div>
            </div>
            {/* benefits */}
            <div>
                <div className='text-xl sm:text-xl  md:text-2xl  lg:text-4xl font-dm-sans font-bold mt-16 mb-6  justify-items-center'>
                    <h1 className='text-[#101359] tracking-tighter'>Scholarship <span className='text-[#45D2FF]'>Benefits</span> </h1>
 
 
                    <div className="grid grid-cols-1 font-medium md:grid-cols-3 gap-16 tracking-wide text-center mt-8">
 
                     
                        <div className='justify-items-center'>
                            <div className="w-14 h-14 rounded-full bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] flex justify-center items-center">
                            <Banknote size={20} className='text-[#101359]'/>
 
                            </div>
 
 
                            <h3 className="text-lg font-bold text-[#101359] mt-4">
                                Tuition Fee <span className="text-[#47C9FF]">Assistance</span>
                            </h3>
                            <p className="text-[#8C8C8C] text-base mt-2">
                                Financial aid based on exam performance.
                            </p>
                        </div>
 
                     
                        <div className='justify-items-center'>
                            <div className="w-14 h-14 rounded-full bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] flex justify-center items-center">
                               <GraduationCapIcon size={20} className='text-[#101359]' />
 
                            </div>
                            <h3 className="text-lg font-bold  text-[#101359] mt-4">
                                Exclusive <span className="text-[#47C9FF]">Learning Resources</span>
                            </h3>
                            <p className="text-[#8C8C8C]  text-base mt-2">
                                Access to specialized workshops <br /> and mentorship.
                            </p>
                        </div>
 
                       
                        <div className='justify-items-center'>
                            <div className="w-14 h-14 rounded-full bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] flex justify-center items-center">
                                <Lightbulb size={20} className='text-[#101359]'/>
 
                            </div>
 
 
 
                            <h3 className="text-lg font-bold  text-[#101359] mt-4">
                                Internship <span className="text-[#47C9FF]">Opportunities</span>
                            </h3>
                            <p className="text-[#8C8C8C] text-base mt-2">
                                Gain real-world experience with Disenosys <br />experts.
                            </p>
                        </div>
 
                    </div>
                </div>
                {/* table */}
                <div className="mt-20 mx-auto w-full px-35 mb-25">
                    <div className='text-xl sm:text-xl md:text-2xl lg:text-3xl font-dm-sans font-bold mt-16 mb-6  justify-items-center'>
                        <h1 className='text-[#101359]'>Scholarship Eligibility  <span className='text-[#45D2FF]'>& Percentage Table</span> </h1>
                    </div>
                    <div className="space-y-4">
                       
                        <div className="grid grid-cols-[30%_70%] bg-[#101359] rounded-b-lg text-white font-dm-sans font-bold text-sm sm:text-lg rounded-lg shadow-md my-3 ">
                            <div className="px-6 py-4 ">Exam Score</div>
                            <div className="px-6 py-4">Scholarship Percentage</div>
                        </div>
 
                       
                        <div className="grid grid-cols-[30%_70%] text-[#333333] text-sm sm:text-base px-6 py-5  bg-white rounded-lg shadow-sm my-3">
                            <div className="">90% and above</div>
                            <div>100% Scholarship (Full Coverage)</div>
                        </div>
 
                     
                        <div className="grid grid-cols-[30%_70%] bg-white text-[#333333] text-sm sm:text-base px-6 py-5 rounded-lg shadow-sm my-3">
                            <div className="">80% – 89%</div>
                            <div>75% Scholarship</div>
                        </div>
 
                       
                        <div className="grid grid-cols-[30%_70%] bg-white text-[#333333] text-sm sm:text-base px-6 py-5 rounded-lg shadow-sm my-3">
                            <div className="">70% – 79%</div>
                            <div>50% Scholarship</div>
                        </div>
 
                       
                        <div className="grid grid-cols-[30%_70%] bg-white text-[#333333] text-sm sm:text-base px-6 py-5 rounded-lg shadow-sm my-3">
                            <div className="">60% – 69%</div>
                            <div>25% Scholarship</div>
                        </div>
 
                       
                        <div className="grid grid-cols-[30%_70%] bg-white text-[#333333] text-sm sm:text-base px-6 py-5 rounded-b-xl rounded-lg shadow-sm my-3">
                            <div className="">Below 60%</div>
                            <div>Eligible for discounts on training program</div>
                        </div>
 
                    </div>
 
                </div>
 
 
            </div>
            {/*how to apply */}
            <div className="bg-[#101359] w-full px-6 sm:px-12 md:px-20 lg:px-32 xl:px-25 py-10 font-dm-sans text-white">
                <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                    How <span className="text-[#2CCAFF]">to Apply?</span>
                </h2>
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <ListCheck className="w-8 h-8 text-[#FFFFFF]" />
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Register for the Disenosys Scholarship Exam.
                        </p>
                    </div>
                    <div className="flex items-start gap-4">
                        <Calendar className="w-8 h-8 text-[#FFFFFF]" />
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Take the online/offline test on the scheduled date.</p>
                    </div>
 
                    <div className="flex items-start gap-4">
                        <Gauge className="w-8 h-8 text-[#FFFFFF]" />
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Score high to avail maximum benefits. </p>
                    </div>
                    <div className="flex items-start gap-4">
                        <ClipboardCheck className="w-8 h-8 text-[#FFFFFF]" />
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Shortlisted candidates will undergo a final verification process. </p>
                    </div>
                </div>
            </div>
            {/* imp dates */}
            <div>
                <div className='text-2xl  px-20 pt-14 mb-5 font-bold '>
                    <h1 className='text-[#101359] '>Important <span className='text-[#2CCAFF]'>Dates</span></h1>
                </div>
                <ul>
                    <li className=' flex px-25  mb-4'>
                        <Calendar className='w-5 h-5 text-[#101359]' />
                        <h1 className='px-4 text-[#101359]  text-semibold'>  Application Opens: <span className='font-thin'>[Start Date]</span> </h1>
                    </li>
                    <li className=' flex px-25 mb-4 '>
                        <Calendar className='w-5 h-5 text-[#101359]' />
                        <h1 className='px-4 text-[#101359] text-semibold'>  Application Opens: <span className='font-thin'>[Exam Date]</span> </h1>
                    </li>
                    <li className=' flex px-25 mb-4'>
                        <Calendar className='w-5 h-5 text-[#101359]' />
                        <h1 className='px-4 text-[#101359] text-semibold'>  Application Opens: <span className='font-thin'>[Result Date]</span> </h1>
                    </li>
                </ul>
                <div className='pl-25 mt-8 mb-8'>
                    <button className='rounded-md p-2 pl-10 pr-10 text-base text-white bg-[linear-gradient(to_right,#101359,#2229BF)]'>
                        Apply Now
                    </button>
                    <p className='text-sm text-[#8C8C8C] mt-4'>For any queries, contact us at <span className='text-[#101359] font-bold'>support@disenosys.com</span></p>
 
                </div>
 
            </div>
             <Partner/>
        </div>
       
 
 
    );
}
 