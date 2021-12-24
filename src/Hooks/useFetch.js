import { useState,useEffect} from "react"

export default function useFetch(url,method="GET") {
    let [data,setData]=useState(null)
    let [isPending,setIsPening]=useState(false)
    let [failure,setFailure]=useState(null)
    let [options,setOptions]=useState(null)


    // passing this into fetch as GET/POST and then making request to save/get data.
    const saveData=(data)=>{
        setOptions({
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }

    useEffect(() => {
        let controller=new AbortController()

        function fetchCall(fetchOptions){
            setIsPening(true)
            setFailure(false)

            fetch(url,{...fetchOptions,signal:controller.signal})
            .then(response=>{
                if(!response.ok){
                    setFailure("Could not fetch data")
                    throw Error(response.statusText)
                }else{
                    return response.json()
                }
            })
            .then(convertedData=>{
                setData(convertedData)
                setIsPening(false)
                setFailure(null)
            })
            .catch(err=>{
                if(err.message==="AbortError"){
                    console.log(err.message)
                }else{
                    console.log(`other error---> ${err.message}`)
                    setIsPening(false)
                    setFailure(err.message)
                }
            })
        }

        if(method==="GET"){
            fetchCall()
        }else if(method==="POST" && options){
            fetchCall(options)
        }
        
        return (()=>{controller.abort()})
    }, [url,options,method])
    
    return({data,isPending,failure,saveData})
}
