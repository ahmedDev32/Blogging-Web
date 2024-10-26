import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { SendContactPage } from '@/redux/Contact'
import Head from 'next/head'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Contact = () => {

    let dispatch=useDispatch()
    let status=useSelector((state)=>state.Contact.status)

    let [contact,SetContact]=useState({
        Name:"",
        Email:"",
        Question:""
    })

    let handleChange=(e)=>{
        let {name,value}=e.target;
        SetContact({
            ...contact,
            [name]:value,
        })
    }

    let HandleSubmit=async (e)=>{
        e.preventDefault()
        if(status='idle'){

            let data = await dispatch(SendContactPage(contact))
            if(data && data.payload.success)
            {
                alert("Your Query Has Been Submited SuccessFully !!!")
                SetContact({
                    Name:"",
                    Email:"",
                    Question:""
                })
            }else{
                alert("Your Query Has Been Reject Try Agin Later !!!")

            }
            
        }
        
        
    }

  return (
    <>
     <Head>
                <title>Contact Us | ThoughtFlow</title>
                <meta name="description" content="Get in touch with ThoughtFlow for any inquiries, questions, or feedback. We're here to assist you." />
                <meta name="keywords" content="Contact ThoughtFlow, ThoughtFlow support, ThoughtFlow inquiries, ThoughtFlow help, ThoughtFlow feedback" />
                <meta name="author" content="ThoughtFlow" />
                <meta property="og:title" content="Contact Us | ThoughtFlow" />
                <meta property="og:description" content="Reach out to ThoughtFlow for any inquiries, questions, or feedback. We're here to assist you." />
                <meta property="og:url" content="https://www.thoughtflow.com/contact" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://www.thoughtflow.com/images/contact-thumbnail.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact Us | ThoughtFlow" />
                <meta name="twitter:description" content="Reach out to ThoughtFlow for any inquiries, questions, or feedback. We're here to assist you." />
                <meta name="twitter:image" content="https://www.thoughtflow.com/images/contact-thumbnail.jpg" />
                <link rel="canonical" href="https://www.thoughtflow.com/contact" />
            </Head>
    <div>
      <Navbar/>
      <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-24">
            <div className="flex items-center lg:mb-0 mb-10">
                <div className="">
                    <h4 className="text-pink-600 text-base font-medium leading-6 mb-4 lg:text-left text-center">Contact Us</h4>
                    <h2 className="text-gray-900 font-manrope text-4xl font-semibold leading-10 mb-9 lg:text-left text-center">Reach Out To Us</h2>
                    <form action="" onSubmit={HandleSubmit}>
                        <input type="text" name='Name' value={contact.Name}  onChange={handleChange} className="w-full h-14 shadow-sm text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none py-2 px-4 mb-8" required placeholder="Name"/>
                        <input type="email" name='Email' value={contact.Email} onChange={handleChange}  className="w-full h-14 shadow-sm text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none py-2 px-4 mb-8" placeholder="Email" required/>
                        <textarea name="Question" value={contact.Question} onChange={handleChange} required id="text" className="w-full h-48 shadow-sm resize-none text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-2xl border border-gray-200 focus:outline-none px-4 py-4 mb-8" placeholder="Message"></textarea>
                    <button className="w-full h-12 text-center text-white text-base font-semibold leading-6 rounded-full bg-pink-600 shadow transition-all duration-700 hover:bg-pink-800">{status==='loading'?"Submitting.......":"Send Message"}</button>
                    </form>
                </div>
            </div>
            <div className="lg:max-w-xl w-full h-[600px] flex items-center justify-center  bg-cover bg-no-repeat bg-[url('https://pagedone.io/asset/uploads/1696488602.png')] ">
                
            </div>
      </div>
    </div>
</section>
                                            
      <Footer/>
    </div>
    </>
  )
}

export default Contact
