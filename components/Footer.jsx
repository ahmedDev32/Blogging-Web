import React from "react"
import Image from "next/image"
import configObject from "@/config/config"
const Footer = () => {
  let date=new Date()


  
  return (
     
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <Image 
              className="w-20 h-20 text-white p-2 rounded-full"
            src={"/images/favicon.svg"}
            alt="faddyblog image"
            width={5}
            height={5}
            />
              
            <span className="ml-3 text-xl">faddy <span className="text-pink-600">blog</span></span>
          </a>
          <p className="mt-2 text-sm text-gray-500">
            Discover New Ideas And Thoughts By faddy <span className="text-pink-600">blog</span>
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
  <div className="lg:w-1/4 md:w-1/2 w-full px-4">
    <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Product</h2>
    <nav className="list-none mb-10">
      <li>
        <a href="#" className="text-gray-600 hover:text-gray-800">Pricing</a>
      </li>
      <li>
        <a href="#" className="text-gray-600 hover:text-gray-800">Feature</a>
      </li>
      <li>
        <a href="#" className="text-gray-600 hover:text-gray-800">Security</a>
      </li>
     
    </nav>
  </div>
  <div className="lg:w-1/4 md:w-1/2 w-full px-4">
    <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Support</h2>
    <nav className="list-none mb-10">
      <li>
        <a href="#" className="text-gray-600 hover:text-gray-800"> Contact</a>
      </li>
      <li>
        <a href="#" className="text-gray-600 hover:text-gray-800">Platforms</a>
      </li>
      
    </nav>
  </div>
  <div className="lg:w-1/4 md:w-1/2 w-full px-4">
    <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Legal</h2>
    <nav className="list-none mb-10">
      <li>
        <a href="#" className="text-gray-600 hover:text-gray-800">Term Of Use</a>
      </li>
      <li>
        <a href="#" className="text-gray-600 hover:text-gray-800">Privacy Policy</a>
      </li>
      
      
    </nav>
  </div>
  <div className="lg:w-1/4 md:w-1/2 w-full px-4">
    <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Company</h2>
    <nav className="list-none mb-10">
      <li>
        <a href="#" className="text-gray-600 hover:text-gray-800">About</a>
      </li>
      <li>
        <a href="#" className="text-gray-600 hover:text-gray-800">Blog</a>
      </li>
      
    </nav>
  </div>
</div>

      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap justify-center  flex-col sm:flex-row">
          <p className="text-gray-500 text-xl text-center sm:text-left">
            © {date.getFullYear()} All Keyword reserved —
            <a
              href="https://twitter.com/knyttneve"
              rel="noopener noreferrer"
              className="text-pink-600 ml-1"
              target="_blank"
            >
              @{configObject.webname}
            </a>
          </p>
          
        </div>
      </div>
    </footer>
  )
}
 
export default Footer
