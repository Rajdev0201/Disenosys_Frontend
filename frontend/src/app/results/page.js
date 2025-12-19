import Results from "@/screens/quicktest/Result";
import { Suspense } from "react";





export default function ResultsPage () {
    return(
        <main>
            <Suspense fallback={<div>Loading...</div>}>
            <Results/>
            </Suspense>
        </main>
    )
}