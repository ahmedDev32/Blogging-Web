import Footer from '@/components/Footer';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { GetSingleBlogs } from '@/redux/SingleBlog';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Properly define the component
const Slug = ({ Slug }) => {
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.SingleBlog.Blogs);
  const Status = useSelector((state) => state.SingleBlog.status);


  const date = blog?.blog?.[0]?.createdAt ? new Date(blog.blog[0].createdAt) : null;
  const monthObj = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  let router=useRouter()
  useEffect(() => {
    const apiCall = async () => {
      await dispatch(GetSingleBlogs(Slug));
    };
      apiCall();
    
  }, [dispatch, Slug,router]);

  return (
    <>
    {
      blog&&blog.blog&&<Head>
      <title>{blog?.blog[0]?.title || 'faddyblog Blog'}</title>
      <meta name="description" content={blog?.blog[0]?.description || 'Read the latest articles and insights on faddyblog.'} />
      <meta
  name="keywords"
  content={`${Slug}, ${blog.blog[0].Category}, ${blog.blog[0].Subcategory}`}
/>

      <meta name="author" content="faddyblog" />
      <link rel="canonical" href={`https://faddyblog.blog/blogs/${Slug}`} />
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={blog?.blog[0]?.title || 'faddyblog Blog'} />
      <meta property="og:description" content={blog?.blog[0]?.description || 'Read the latest articles and insights on faddyblog.'} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`https://faddyblog.blog/blogs/${Slug}`} />
      <meta property="og:image" content={blog?.blog[0]?.image || 'https://faddyblog.blog/images/favicon.svg'} />
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={blog?.blog[0]?.title || 'faddyblog Blog'} />
      <meta name="twitter:description" content={blog?.blog[0]?.description || 'Read the latest articles and insights on faddyblog.'} />
      <meta name="twitter:image" content={blog?.blog[0]?.image || 'https://faddyblog.blog/images/favicon.svg'} />
    </Head>
    }
    
      

      <Navbar />


      <div className="h-screen mt-16">
        {Status === 'loading' ? (
          <div role="status" className="flex justify-center align-middle text-center text-3xl">
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
          blog?.blog && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                {/* Blog post header */}
                <div className="py-8">
                  <h1 className="text-3xl font-bold mb-2">{blog.blog[0].title}</h1>
                  <p className="text-gray-500 text-sm">
                    Published on{' '}
                    <time dateTime={date?.toISOString()}>
                      {monthObj[date?.getMonth()]} {date?.getDate()}, {date?.getFullYear()}
                    </time>
                  </p>
                </div>

                {/* Featured image */}
                <Image
                  src={blog.blog[0].image}
                  alt="Featured image"
                  width={100}
                  height={100}
                  className="w-full h-auto mb-8"
                />

                {/* Blog post content */}
                <div className="prose prose-sm text-xl sm:prose lg:prose-lg xl:prose-xl mx-auto" dangerouslySetInnerHTML={{ __html: blog.blog[0].content} } >
                  
                </div>
                <Image
                  src={blog.blog[0].image}
                  alt="Featured image"
                  width={100}
                  height={100}
                  className="w-full h-auto mb-8"
                />
              </div>
            </div>
          )
        )}
        <Footer />
      </div>
    </>
  );
};

// Fetch data server-side
export async function getServerSideProps(context) {
  const { Slug } = context.params;
  return {
    props: {
      Slug,
    },
  };
}


// Export the component correctly
export default Slug;
