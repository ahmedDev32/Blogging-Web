import BlogsCard from '@/components/BlogsCard'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { searchapi } from '@/redux/SearchSlice'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

const SearchBlog = () => {
let dispatch=useDispatch()  

let router=useRouter()  
let blogs=useSelector((state)=>state.Search.Blogs)
console.log(blogs);

let Status=useSelector((state)=>state.Search.status)




useEffect(()=>{
    let fetchBlogs=async()=>{
        await dispatch(searchapi({Keyword:router.query.Search}))
    }
    if(router.query&&router.query.Search){
        fetchBlogs()
    }
},[dispatch,router]) 
  return (
    <>
    <Head>
        <title>{router&&router.query.Search}</title>
        <meta name="description" content="A brief description of your blog content, focusing on keywords for SEO." />
        <meta name="keywords" content="blog, your keywords, related to your content" />
        <meta name="author" content="Your Name" />
        <link rel="canonical" href="https://faddyblog.blog/blog" />
        <link rel="shortcut icon" href="/images/about.png" type="image/x-icon" />
        {/* Open Graph Tags for social media sharing */}
        <meta property="og:title" content="Your Blog Title" />
        <meta property="og:description" content="A brief description of your blog content." />
        <meta property="og:image" content="https://faddyblog.blog/path/to/image.jpg" />
        <meta property="og:url" content="https://faddyblog.blog/blog" />
        <meta property="og:type" content="website" />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Blog Title" />
        <meta name="twitter:description" content="A brief description of your blog content." />
        <meta name="twitter:image" content="https://faddyblog.blog/path/to/image.jpg" />
      </Head>

    <Navbar/>
    <div className="h-screen mt-12">
        <div className="mt-20 px-7">
            <h1 className='text-xl font-bold'>{router&&router.query.Search}</h1>
            <span>
                We Found {blogs && blogs.length} Blogs for <span className="text-pink-500">
                {router&&router.query.Search}
                </span>
            </span>
        </div>
    {
  Status === 'Loading' ? (
    <div
      role="status"
      className="flex justify-center  items-center text-center text-3xl my-24"
    >
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
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-wrap -m-4">
          {blogs && blogs.findBlog && blogs.findBlog.map((item, index) => (
            <BlogsCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
{blogs &&  blogs.pagination  && (
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
              dispatch(searchapi({Keyword:router.query.Search,page:i + 1}));
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


    <Footer/>
    </div>
      
    </>
  )
}

export default SearchBlog
