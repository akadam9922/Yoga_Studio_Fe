import Head from 'next/head';
import { getServerSession } from "next-auth";
import {options} from "./api/auth/[...nextauth]/options"
import { redirect } from "next/navigation";

const Home = async ()=> {
  const session = await getServerSession(options);
  

    if(!!session && session.user.userType == "admin"){
        redirect("/Admin/dashboard");
        
    }else if(!!session && session.user.userType == "user"){
      redirect("/User/dashboard");
    }
  
  return (
    <>
      <Head>
        <title>White Lotus Yoga</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    

      {/* Hero Section */}
      <div className="hero bg-cover bg-center h-screen mr-2" style={{ backgroundImage: `url('https://source.unsplash.com/1600x900/?yoga')` }}>
        <div className="flex items-center justify-center h-full w-full bg-opacity-50 bg-gray-700">
          <div className="text-center text-white px-6 md:px-12">
            <h1 className="text-5xl font-bold mt-0 mb-6">Inspiring Healthier Lives Through Yoga</h1>
            <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded">
              Join Us Today
            </button>
          </div>
        </div>
      </div>

      {/* Offerings Section */}
      <section className="container mx-auto px-6 p-10">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">What We Offer</h2>
        <div className="flex items-stretch space-x-4">
          {/* Class Card */}
          <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md">
            <img className="rounded-t-lg" src="https://source.unsplash.com/1600x900/?yoga,class" alt="Yoga Class" />
            <div className="px-6 py-4">
              <h3 className="font-bold text-xl mb-2">Yoga Classes</h3>
              <p className="text-gray-700 text-base">
                Join our yoga classes tailored for all levels, from beginner to advanced. Experience the harmony of mind and body.
              </p>
            </div>
          </div>

          {/* Workshop Card */}
          <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md">
            <img className="rounded-t-lg" src="https://source.unsplash.com/1600x900/?yoga,workshop" alt="Yoga Workshop" />
            <div className="px-6 py-4">
              <h3 className="font-bold text-xl mb-2">Workshops</h3>
              <p className="text-gray-700 text-base">
                Dive deeper into your practice with our workshops on special topics and techniques.
              </p>
            </div>
          </div>

          {/* Course Card */}
          <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md">
            <img className="rounded-t-lg" src="https://source.unsplash.com/1600x900/?yoga,course" alt="Yoga Course" />
            <div className="px-6 py-4">
              <h3 className="font-bold text-xl mb-2">Yoga Courses</h3>
              <p className="text-gray-700 text-base">
                Enroll in our courses for a comprehensive yoga journey. Perfect for those looking to deepen their practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a href="#" className="text-xl font-bold text-gray-600">White Lotus</a>
          <p className="py-2 text-gray-500 sm:py-0">All rights reserved © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  );
}
export default Home;
