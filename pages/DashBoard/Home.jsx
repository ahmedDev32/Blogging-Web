import DateVal from '@/components/Date'
import Footer from '@/components/Footer'
import { fetchPosts } from '@/redux/CounterSlice'
import { DeleteBlog, EditBlog } from '@/redux/DashboardSlice'
import { GetSingleBlogs } from '@/redux/SingleBlog'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {

  let status = useSelector((state) => state.counter.status)

  let blogs = useSelector((state) => state.counter.Blogs)

  let router=useRouter()
  
  
  
  let dispatch = useDispatch()
  
  

  let [model, SetModel] = useState(false)
  let [BlogId, SetBlogId] = useState("")
  let statusBlog = useSelector((state) => state.SingleBlog.status)
  let Blog = useSelector((state) => state.SingleBlog.Blogs)
 
  let [image,setImage]=useState("")
  let [Edit, SetEdit] = useState({
    title:  "",
    content:  "",
    Category:  "",
    Subcategory:  "",
    SlugId:  "",
    image:  ""
  })

  let dashBoardStatus=useSelector((state)=>state.DashboardState.status)

  let HandleImageChange = async(e) => {
    const file = e.target.files[0];
    const formData=new FormData()
    formData.append('file',file)
    formData.append('upload_preset', 'f5ni8bza');
    try {
      const response = await fetch('https://api.cloudinary.blog/v1_1/ds9sben9e/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      
      if(data && data.secure_url){
        console.log(data.url);
        
        setImage(data.url);
        SetEdit({
          ...Edit,
          image: data.url
        });
        
      }
     
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
    
  };
  useEffect(() => {
    let getItem=localStorage.getItem('id')
    if(getItem){
      let fetchData = async () => {
        await dispatch(fetchPosts(1))
      }
      if (status === 'pending') {
        fetchData()
      }
      if (Blog && Blog.blog && Blog.blog[0]) {
        SetEdit({
          title: Blog.blog[0].title || "",
          content: Blog.blog[0].content || "",
          Category: Blog.blog[0].Category || "",
          Subcategory: Blog.blog[0].Subcategory || "",
          SlugId: Blog.blog[0].title || "",
          image: Blog.blog[0].image || "",
          _id:Blog.blog[0]._id||""
  
        });
        setImage(Blog.blog[0].image || "");
      }
    }else{
      router.push('/Login')
    }
    
  }, [dispatch,Blog,router,status])
 
  

  let handleChange=(e)=>{
    let {name,value}=e.target
    SetEdit({
      ...Edit,
      [name]:value
    })
  }

  let handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(Edit);
    
    let data=Edit
    console.log(data);
    
    let res=await dispatch(EditBlog(data))
    if(res&&res.payload&&res.payload.success){
      alert("Blog Updated SuccessFully")
      SetModel(false)
      await dispatch(fetchPosts(1))
    }else{
      alert("Blog Updation Failed")
    }
     
  }
  




  return (
    <>
     <Head>
      <title>Dashboard | faddyblog</title>
      <meta name="description" content="Manage your blogs, view analytics, and configure settings on your faddyblog dashboard." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content="Dashboard | faddyblog" />
      <meta property="og:description" content="Manage your blogs, view analytics, and configure settings on your faddyblog dashboard." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.faddyblog.blog/Dashboard/Home" />
      <meta property="og:image" content="https://www.faddyblog.blog/images/dashboard-og-image.jpg" />
      </Head>
    <div className="max-w-screen-xl  mt-8 mx-auto px-4 md:px-8">


      {/* Main modal */}
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${model ? "" : "hidden"} flex flex-col  mx-auto overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        {
          statusBlog === "loading" ? (
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
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit Blog
                  </h3>
                  <button
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                    onClick={() => {
                      SetModel(false)
                    }}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                {
                  Blog && Blog.blog && <div className="p-4 md:p-5">
                    <form className="space-y-4" action="#" onSubmit={(e)=>handleSubmit(e)} >
                    <div>
                        <label
                          htmlFor="Image"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your Blog Image
                        </label>
                        <input
                          type="file"
                          name="image"
                          onChange={HandleImageChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"

                          
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="title"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your Blog Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={Edit.title}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"

                          
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="Category"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your Blog Category
                        </label>
                        <input
                          type="text"
                          name="Category"
                          value={Edit.Category}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"

                          
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="SubCategory"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your Blog Subcategory
                        </label>
                        <input
                          type="text"
                          name="Subcategory"
                          value={Edit.Subcategory}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"

                          
                        />
                      </div>
                      <div>
                        <div>

                          <input
                            type="text"
                            name="title"
                            value={Blog.blog[0].title}
                            className="bg-gray-50 hidden border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"

                            
                          />
                        </div>
                        <label
                          htmlFor="Content"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your Blog Content
                        </label>
                        <textarea
                          name="content"
                          value={Edit.content}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          
                        ></textarea>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">

                          </div>

                        </div>

                      </div>
                      <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        {
                          dashBoardStatus==="loading"?"Submitting....":"Update Blog"
                        }
                      </button>

                    </form>
                  </div>
                }

              </div>
            </div>
          )
        }

      </div>
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Your Blogs
          </h3>
          <p className="text-gray-600 mt-2">
            You Can Edit Or Delete Blogs From Here.
          </p>
        </div>
        <div onClick={()=>{
          router.push("/DashBoard/Write_Blogs")
        }} className="mt-3 md:mt-0">
          <a
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-pink-600 rounded-lg hover:bg-pink-500 active:bg-pink-700 md:text-sm"
          >
            Add Blog
          </a>
        </div>
      </div>
      {
        status === 'loading' ?
          (
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
          )
          : (


            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
              <table className="w-full table-auto text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                    <th className="py-3 px-6">Main Detail</th>
                    <th className="py-3 px-6">Category</th>
                    <th className="py-3 px-6">SubCategory</th>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-8"></th>

                  </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                  {
                    blogs && blogs.blogdata && blogs.blogdata.map((item, idx) => (
                      <tr key={idx}>
                        <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                          <Image alt={item.title.slice(0,10)} src={item.image} width={10} height={10} className="w-10 h-10 rounded-full" />
                          <div>
                            <span className="block text-gray-700 text-sm font-medium">{item._id}</span>
                            <span className="block text-gray-700 text-xs">{item.title.slice(0, 35)}....</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.Category}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.Subcategory}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{<DateVal date={item.createdAt} />}</td>
                        <td className="text-right px-6 whitespace-nowrap">
                          <a onClick={() => {
                            SetBlogId(item.Slug)
                            SetModel(true)
                            dispatch(GetSingleBlogs(`Slug=${item.Slug}`))

                          }} className="py-2 cursor-pointer px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                            Edit
                          </a>
                          <button
                            onClick={() => {
                              dispatch(DeleteBlog(item.Slug))
                              alert("Blog Deleted With Slug Id=" + item.Slug)
                              dispatch(fetchPosts(1))
                            }}
                            className="py-2 leading-none px-3 cursor-pointer font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

            </div>

          )
      }
      {
        blogs && blogs.blogdata && <div className="py-1 px-4">
          <nav className="flex items-center space-x-1" aria-label="Pagination">
            <button
              type="button"
              className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-2xl rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
              aria-label="Previous"
            >
              <span aria-hidden="true">«</span>
              <span className="sr-only">Previous</span>
            </button>
            {Array.from({ length: blogs.pagination.totalPages }, (_, i) => (
              <button
                onClick={() => {
                  dispatch(fetchPosts(i + 1))
                }
                }
                key={i}
                type="button"
                className="min-w-[40px]
                text-2xl
                flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 
                py-2.5  rounded-full disabled:opacity-50 disabled:pointer-events-none text-1"
              >
                {i + 1}
              </button>
            ))}

            <button
              type="button"
              className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-2xl rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
              aria-label="Next"
            >
              <span className="sr-only">Next</span>
              <span aria-hidden="true">»</span>
            </button>
          </nav>
        </div>
      }

    </div>
    <Footer/>
    </>
  )
}

export default Home
