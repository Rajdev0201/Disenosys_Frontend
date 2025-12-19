import Reset from "@/screens/auth/Reset";
import { Suspense } from "react";





export default function ResetPassword(){
    return(
        <main>
             <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
            <Reset/>
            </Suspense>
        </main>
    )
}