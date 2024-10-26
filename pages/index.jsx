import Navbar from '@/components/Navbar'
import Image from 'next/image'
import { FaLongArrowAltLeft,FaLongArrowAltRight } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import configObject from '@/config/config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '@/redux/CounterSlice';
import BlogsCard from '@/components/BlogsCard';
import Head from 'next/head';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import axios from 'axios';

const Index = () => {
  let dispatch=useDispatch()
  let date=new Date()
  let status=useSelector((state)=>state.counter.status)
  let blogs=useSelector((state)=>state.counter.Blogs)
  let [search,SetSearch]=useState('')
  
  useEffect(()=>{
  dispatch(fetchPosts(1))
  },[dispatch])
 
  let handleChange=(e)=>{
    SetSearch(e.target.value)
  }


  let router=useRouter()

  let [newsletter,setnewsletter]=useState("")

  let handle=async(e)=>{
    setnewsletter(e.target.value)
  }

  let handleSub = async (e) => {
    e.preventDefault();
    try {
        let res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/userEmail`, {email:newsletter});
        if(res.success){
          alert("Subscription Added")
          setnewsletter("")
        }else{
          alert("Subscription failed")
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
};

  let handleSubmit=async(e)=>{
    e.preventDefault()
    router.push(`/SearchBlog?Search=${search}`)
  }
  
  return (
    <>
     <Head>
        <title>faddyblog | Discover Insights & Ideas</title>
        <meta name="description" content="faddyblog is your go-to platform for discovering insights, ideas, and thought-provoking articles across various topics. Stay inspired with our latest posts!" />
        <meta name="keywords" content="faddyblog, blog, insights, ideas, thought-provoking, articles, inspiration" />
        <link rel="canonical" href="https://www.faddyblog.shop/" />
        <meta property="og:title" content="faddyblog | Discover Insights & Ideas" />
        <meta property="og:description" content="faddyblog is your go-to platform for discovering insights, ideas, and thought-provoking articles. Stay inspired with our latest posts!" />
        <meta property="og:url" content="https://www.faddyblog.shop/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="faddyblog | Discover Insights & Ideas" />
        <meta name="twitter:description" content="faddyblog is your go-to platform for discovering insights, ideas, and thought-provoking articles. Stay inspired with our latest posts!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "faddyblog",
              "url": "https://www.faddyblog.com",
              "description": "faddyblog is your go-to platform for discovering insights, ideas, and thought-provoking articles.",
              "author": {
                "@type": "Person",
                "name": "Ahmed"
              }
            })
          }}
        />
      </Head>
        <Navbar />
      {/* creating hero <section></section>  */}
      <div className="mt-28 flex flex-col justify-center text-center align-middle">
        <h1 className="text-2xl font-bold">
          Our Blogs
        </h1>
        <p className='text-lg font-light'>
        A center of all our resources and insigth
        </p>
        <div className="my-8">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">   
  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
    Search
  </label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg className="w-4 h-4 text-pink-500 dark:text-pink-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
      </svg>
    </div>
    <input 
      type="search" 
      id="default-search" 
      className="block w-full p-4 ps-10 text-sm text-gray-900  rounded-lg bg-gray-300   dark:bg-gray-50  dark:placeholder-gray-400" 
      placeholder="Search our blog by topic or keyword" 
      value={search}
      onChange={handleChange}
      required 
    />
    <button 
      type="submit" 
      className="text-white absolute end-2.5 bottom-2.5 bg-pink-700 hover:bg-blue-800    font-medium rounded-lg text-sm px-4 py-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
    >
      Search
    </button>
  </div>
</form>

        </div>
      </div>
      {/* hero <section></section> */}
      <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <Image
            className="object-cover object-center rounded"
            alt="hero"
            src="/images/hero.jpg"
            width={1000}
            height={1000}
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-pink-800">
          Discover Stories, Insights, and Ideas
           
          </h1>
          <p className="mb-8 text-xl leading-relaxed">  Welcome to our blogging platform, where we share thoughts, tips, and in-depth articles on a variety of topics. Dive into a world of creativity, stay updated with the latest trends, and gain fresh perspectives that add value to your everyday life.

          </p>
          <div className="flex justify-center">

          </div>
        </div>
      </div>
    </section>
    {/* blog <section></section> */}
    {
  status === "loading" ? (
    <div role="status " className='flex justify-center align-middle text-center text-3xl my-'>
      <svg
        aria-hidden="true"
        className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only text-3xl">Loading...</span>
    </div>
  ) : (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto">
        <h1 className="text-center my-8 text-2xl font-bold">
          Our Blog Lsit
        </h1>
        {
          blogs&&blogs.pagination&&blogs.pagination.totalBlogs===0&&(
            <span className="flex justify-center my-4 text-center text-xl ">
          Error No Blog Found
        </span>
          )
        }
        <div className="flex flex-wrap -m-4">
          {blogs?.blogdata?.map((item, index) => (
            <BlogsCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

{blogs?.pagination?.totalPages > 1 && (
  <nav aria-label="Page navigation example" className="w-80 mx-auto flex flex-col justify-center mb-5">
    <ul className="inline-flex justify-center align-middle text-center -space-x-px text-sm">
      <li>
        <a
          href="#"
          className="flex items-center text-xl justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-pink-700 dark:border-gray-700 dark:hover:bg-pink-700 dark:hover:text-white"
        >
          <FaLongArrowAltLeft />
        </a>
      </li>
      {Array.from({ length: blogs.pagination.totalPages }, (_, i) => (
        <li key={i}>
          <a
            href="#"
            className={`flex text-xl items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-pink-700 dark:border-gray-700 dark:hover:bg-pink-700 ${blogs.pagination.currentPage === i + 1 ? "text-pink-700" : ""} dark:hover:text-white`}
            onClick={(event) => {
              event.preventDefault();
              dispatch(fetchPosts(i + 1));
            }}
          >
            {i + 1}
          </a>
        </li>
      ))}
      <li>
        <a
          href="#"
          className="flex text-xl items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-pink-700 dark:border-gray-700 dark:hover:bg-pink-700 dark:hover:text-white"
        >
          <FaLongArrowAltRight />
        </a>
      </li>
    </ul>
  </nav>
)}

   
    {/* pagination <section></section> */}
    
    {/* our newsletter <section></section> */}
    <div className="bg-gradient-to-b from-[#2e0249] to-[#680871] py-16 px-6 font-[sans-serif]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-white md:text-5xl text-4xl font-extrabold mb-6">
          Join Our Exclusive Newsletter
        </h2>
        <p className="text-xl text-gray-300">
          Be part of our elite community. Get VIP access to curated content, early product releases, and special promotions.
        </p>
        <form action="" onSubmit={handleSub}>
        <div className="bg-white shadow-lg rounded-lg p-8 mt-12 flex flex-col md:flex-row items-center justify-center">
          <input
            type="email"
            value={newsletter}
            name="email"
            onChange={handle}
            placeholder="Enter your email"
            required
            className="w-full md:w-96 bg-transparent border-b-2 border-[#a91079] py-3 px-4 text-[#2e0249] text-base focus:outline-none placeholder-[#a91079] placeholder-opacity-70"
          />
          <button  type='submit' className="max-md:mt-6 md:ml-4 bg-[#a91079] hover:bg-pink-900 text-white font-semibold py-3 px-6 rounded hover:shadow-md hover:transform hover:scale-105 focus:outline-none">
            Get Started
          </button>
        </div>
        </form>

        
      </div>
    </div>
    {/* footer <section></section> */}
   <Footer/>
    </>
  )
}
 
export default Index
