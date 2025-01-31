import Home from "@/components/Home";
import Error from "./error";

const getRooms = async() => {
const res = await fetch(`${process.env.API_URL}/api/rooms`)
return res.json();
}

export default async function HomePage() {

  const data = await getRooms()

  if (data?.message){
    return <Error error={data} />
  }
 // console.log(data)
  return (
   <Home  data = {data}/>
  );
}
