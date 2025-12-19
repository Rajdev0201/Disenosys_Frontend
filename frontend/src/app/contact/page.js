import Banner from "@/pages/contact/Banner";
import Form from "@/pages/contact/Form";




export const metadata = () => { 
  return{
    title:"Contact"
  }
}


export default function ContactPage () {
    return(
        <main>
            <Banner/>
            <Form/>
        </main>
    )
}