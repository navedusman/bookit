/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
         API_URL: "http://localhost:3000",
         DB_LOCAL_URI: "mongodb://0.0.0.0:27017/bookit",
         DB_URI:"",
    },
    images:{
        domains: ["res.cloudinary.com"],
    }
  
};

export default nextConfig;
