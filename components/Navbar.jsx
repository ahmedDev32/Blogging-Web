import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Navbar = () => {

  let navbarLinksObj=[
    {page:"Home",linkUrl:"/"},
    {page:"About",linkUrl:"/About"},
    {page:"Contact",linkUrl:"/Contact"},

  ]

  let [navbar,setnavbar] = useState(false)

  // impot <Objects></Objects>
  let router = useRouter()
  

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <span className="self-center flex text-center align-middle text-2xl font-semibold whitespace-nowrap ">
        faddy <span className="text-pink-500">
          blog
        </span>
        </span>
      </Link>
      <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button
          type="button"
          className="text-pink-500 border bg-white font-bold  rounded-lg text-sm px-4 py-2 text-center  "
          onClick={()=>{
            router.push("/Login")
          }}
        >
          Log In
        </button>
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          onClick={()=>{
            setnavbar(!navbar)
          }}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden hover:bg-gray-100 focus:outline-none  dark:text-gray-400 "
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div className={`items-center justify-between ${navbar?'':'hidden'} w-full md:flex md:w-auto md:order-1" id="navbar-sticky`}>
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white  ">
          {
            navbarLinksObj.map((data,index)=>{
              return(
                <li key={index}>
                <Link
                  href={data.linkUrl}
                  className={`block py-2 hover:text-pink-600 px-3 ${router.pathname===data.linkUrl?'text-pink-500 border-b border-b-pink-500':"text-dark"}  `}
                  aria-current="page"
                >
                  {data.page}
                </Link>
              </li>
              )
            })
          }
          
          
        </ul>
      </div>
    </div>
  </nav>
  
  )
}

export default Navbar
