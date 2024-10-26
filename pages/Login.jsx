import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { SendContactPage } from '@/redux/Contact'
import { LoginApi } from '@/redux/LoginSlice'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {

    let [form,setForm]=useState({
        username:"",
        password:""
    });

    let dispatch=useDispatch()


    let status = useSelector((state)=>state.Login.status)
    let router =useRouter()

    let handleChange = (e)=>{
        let {name,value}=e.target;
        setForm({
            ...form,
            [name]:value
        })
    }

    let handleSubmit = async(e)=>{
        e.preventDefault()
        let data=await dispatch(LoginApi(form))
        if(data &&data.payload&& data.payload.success)
            {
                router.push("/DashBoard/Home")
                localStorage.setItem("id",form.username)
                setForm({
                    username:"",
                    password:"",
                })
            }else{
                alert("Login Failed !!!")

            }
        
        
    }

  return (
    <>
      <Head>
      <title>Login | faddyblog - Sign In to Access Your Account</title>
      <meta name="description" content="Sign in to faddyblog to access your personalized blog dashboard, write new posts, and engage with the community. Secure and fast login process." />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Login | faddyblog - Sign In to Access Your Account" />
      <meta property="og:description" content="Sign in to faddyblog and start sharing your thoughts with the world. Join our community of writers and readers." />
      <meta property="og:url" content="https://www.faddyblog.blog/login" />
      <meta property="og:image" content="https://www.faddyblog.blog/images/og-login.jpg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Login | faddyblog - Sign In to Access Your Account" />
      <meta name="twitter:description" content="Sign in to faddyblog and start sharing your thoughts with the world. Join our community of writers and readers." />
      <meta name="twitter:image" content="https://www.faddyblog.blog/images/twitter-login.jpg" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Schema.org for Google */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Login | faddyblog",
            "description": "Sign in to faddyblog to access your personalized blog dashboard, write new posts, and engage with the community.",
            "url": "https://www.faddyblog.blog/login"
          }
        `}
      </script>
    </Head>
    <div>
      <Navbar/>
      <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-24">
            <div className="flex items-center lg:mb-0 mb-10">
                <div className="">
                    <h4 className="text-pink-600 text-base font-medium leading-6 mb-4 lg:text-left text-center">Log In</h4>
                    <h2 className="text-gray-900 font-manrope text-4xl font-semibold leading-10 mb-9 lg:text-left text-center">
                        Only For Admin Use
                    </h2>
                    <form action="" onSubmit={handleSubmit} >
                        <input type="email" name='username' value={form.username} onChange={handleChange}  className="w-full h-14 shadow-sm text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none py-2 px-4 mb-8" required placeholder="Email"/>
                        <input type="password" name='password' value={form.password} onChange={handleChange}   className="w-full h-14 shadow-sm text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none py-2 px-4 mb-8" placeholder="Password" required/>
                       
                    <button className="w-full h-12 text-center text-white text-base font-semibold leading-6 rounded-full bg-pink-600 shadow transition-all duration-700 hover:bg-pink-800">
                        {status==='loading'?"Submitting.....":"Log In"}
                    </button>
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

export default Login
