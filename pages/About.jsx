import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Head from 'next/head'

const About = () => {

  return (
    <>
     <Head>
    <title>About Us | faddyblog - Dive into Insights & Ideas</title>
    <meta
      name="description"
      content="Learn more about faddyblog, a platform dedicated to sharing thought-provoking articles, insightful ideas, and engaging discussions. Discover our mission and what makes us unique."
    />
    <meta name="keywords" content="faddyblog, about faddyblog, blog insights, engaging discussions, thought-provoking content, creative ideas, blog platform" />
    <meta name="author" content="faddyblog" />
    <meta property="og:title" content="About Us | faddyblog - Dive into Insights & Ideas" />
    <meta
      property="og:description"
      content="Explore faddyblog's story and mission. A space where curiosity meets creativity, offering articles that inspire, educate, and entertain."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.faddyblog.blog/about" />
    <meta property="og:image" content="https://www.faddyblog.blog/images/about-page-thumbnail.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="About Us | faddyblog" />
    <meta
      name="twitter:description"
      content="Discover more about faddyblog, the platform for insightful articles, creative ideas, and thought-provoking discussions."
    />
    <meta name="twitter:image" content="https://www.faddyblog.blog/images/about-page-thumbnail.jpg" />
    <link rel="canonical" href="https://www.faddyblog.blog/about" />
  </Head>
   
    <div>
      <Navbar/>
      <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-24">
            <div className="flex items-center lg:mb-0 mb-10">
                <div className="">
                    <h2 className="text-gray-900 font-manrope text-4xl font-semibold leading-10 mb-9 lg:text-left text-center">
                    About faddy <span className='text-pink-500'>blog</span>
                    </h2>
                    <p className="text-lg leading-7 text-gray-700">
  Welcome to faddyblog, your go-to destination for insightful articles, thought-provoking ideas, and engaging discussions. Our mission is to create a space where curiosity meets creativity, and where every reader finds something that resonates with them. From the latest trends to timeless wisdom, we strive to bring you content that inspires, educates, and entertains. Dive in, explore, and let your thoughts flow with us!
</p>
                   
                </div>
            </div>
            <div className="lg:max-w-xl w-full h-[600px] flex items-center justify-center  bg-cover bg-no-repeat bg-[url('/images/about.jpg')] ">
                
            </div>
      </div>
    </div>
</section>
                                            
      <Footer/>
    </div>
    </>
  )

}
export default About
