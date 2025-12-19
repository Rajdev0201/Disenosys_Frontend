import Banner from "@/screens/contact/Banner";
import Form from "@/screens/contact/Form";




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