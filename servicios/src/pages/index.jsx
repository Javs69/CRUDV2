import { Axios } from "axios";
export default function Index() {

     const conAxios=async()=> {
        const options={
            url:"localhost:3000/",
            method:"get",
            Headers:{
                "Content-Type":"application/json"
            }
        }
        try {
            const res=await axios.request(options);
            console.log(res.data)
        }
        catch(error) {
            console.log(error)
        }
    }
}



    