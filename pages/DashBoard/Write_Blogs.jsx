import Footer from '@/components/Footer'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaHome } from 'react-icons/fa'

const Write_Blogs = () => {
    let router=useRouter()

    useEffect(()=>{
    let getItem=localStorage.getItem('id')
          if(!getItem){
      router.push('/Login')
          }
    },[router])

    let [formdata,setFormdata]=useState({
        title:"",
        image:"",
        Category:"",
        Subcategory:"",
        content:""
    })

    let handleChange=async(e)=>{
        let {name,value}=e.target;
        setFormdata({
            ...formdata,
            [name]:value
        })
    }

    let handleChangeImage=async(e)=>{
        const file = e.target.files[0];
        console.log(file);
        
    const formData=new FormData()
    formData.append('file',file)
    formData.append('upload_preset', 'f5ni8bza');
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/ds9sben9e/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      
      if(data && data.secure_url){
        console.log(data.url);
        
        setFormdata({
          ...formdata,
          image: data.url
        });
        
      }
     
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
    }

    let [BlogSend,setSendBlog]=useState(false)
    let handleSubmit=async(e)=>
    {
        setSendBlog(true)
        e.preventDefault()
        let res=await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/blogPost`,formdata)
        if(res&&res.data&&res.data.success){
        setSendBlog(false)

            alert(res.data.msg)
            setFormdata({
                title:"",
                image:"",
                Category:"",
                Subcategory:"",
                content:""
            })
        }else{
            setSendBlog(false)
            alert("Blog Failed To Post")
        }
        
    }

    return (
        <>
         <Head>
      <title>Write a Blog | faddyblog</title>
      <meta name="description" content="Share your insights and stories by creating a new blog post on faddyblog. Let your voice be heard and inspire others." />
      <meta name="keywords" content="write blog, create blog, blog post, faddyblog, share stories, blog platform" />
      <meta name="author" content="faddyblog" />
      <meta property="og:title" content="Write a Blog | faddyblog" />
      <meta property="og:description" content="Share your insights and stories by creating a new blog post on faddyblog." />
      <meta property="og:image" content="https://faddyblog.blog/images/write-blog-og.png" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://faddyblog.blog/DashBoard/Write_Blogs" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Write a Blog | faddyblog" />
      <meta name="twitter:description" content="Share your insights and stories by creating a new blog post on faddyblog." />
      <meta name="twitter:image" content="https://faddyblog.blog/images/write-blog-twitter.png" />
    </Head>

            <section className="text-gray-600 body-font relative">
                
                <div className="container px-5 py-24 mx-auto">
                
                    <div className="flex flex-col text-center w-full mb-12"> 
                    <div onClick={()=>{
                        router.push("/DashBoard/Home")
                    }} className="mt-4 justify-center text-pink-500">
                <span className="text-2xl">
                        <FaHome/>
                    </span>
                </div>
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Write Your Blog</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Unleash Your Vision and Share Your Story—Elevate Your Blog Here.
                        </p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <form className="flex flex-wrap -m-2"  onSubmit={handleSubmit}>
                            <label
                                htmlFor="uploadFile1"
                                className="bg-white text-gray-500 font-semibold text-base rounded max-w-2xl h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                                    <path
                                        d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                        data-original="#000000"
                                    />
                                    <path
                                        d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                        data-original="#000000"
                                    />
                                </svg>
                                Upload file
                                <input type="file" name='image'  onChange={handleChangeImage} id="uploadFile1" required className="hidden" />
                                <p className="text-xs font-medium p-4 text-gray-400 mt-2">PNG, JPG, SVG, WEBP, and GIF are allowed.</p>
                                {formdata.image && (
        <p className="mt-2 text-sm text-gray-500">
          Selected file: {formdata.image}
        </p>
      )}
                            </label>

                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="title" className="leading-7 text-sm text-gray-600">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder='Enter Blog Title Here'
                                        name="title"
                                        value={formdata.title}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="Category" className="leading-7 text-sm text-gray-600">
                                        Enter Category
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="Category"
                                        value={formdata.Category}
                                        required
                                        placeholder='Enter category'
                                        onChange={handleChange}
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="Subcategory" className="leading-7 text-sm text-gray-600">
                                        Enter Subcategory
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="Subcategory"
                                        placeholder='Enter SubCategory'
                                        required
                                        value={formdata.Subcategory}
                                        onChange={handleChange}
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="content" className="leading-7 text-sm text-gray-600">
                                        Enter Blog Content
                                    </label>
                                    <textarea
                                        id="message"
                                        name="content"
                                        value={formdata.content}
                                        onChange={handleChange}
                                        placeholder='Enter Blog Content'
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button
                                    type="submit"
                                    className="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
                                >
                                    {
                                        BlogSend?"Submitting":"Post Blog"
                                    }
                                </button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </section>
            <Footer/>

        </>
    )
}

export default Write_Blogs
