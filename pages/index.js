import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import getStripe from '../utils/get-stripe'


export default function Home() {
  const redirectToCheckout=async()=>{
  
    const {data}=await axios.post("/api/checkout_sessions",{
      items:{
        name:"Pants",
        description:"full fledged pants",
        quantity:2,
        amount:200
      }})
   console.log(data)

   const stripe=await getStripe()
   await stripe.redirectToCheckout({sessionId:data.id})



  }
  return (
    <div className={styles.container}>

    <button onClick={()=>redirectToCheckout()}>buy</button>

    
    </div>
  )
}
