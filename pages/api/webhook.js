import Stripe from "stripe";
import { buffer } from "micro";

const stripe=new Stripe(`${process.env.NEXT_SECRET}`)

export const config={
    api:{
        bodyParser:false
    }
}

export default async function handler(req,res){
    if(req.method==="POST"){
        let event;
        try{
            const rawBody=await buffer(req)
            const signature=req.header['stripe-signature']
            event=stripe.webhooks.constructEvent(rawBody.toString(),signature,process.env.WEBHOOK_SECRET)
            

        }
        catch(err){
            res.status(500).json({message:err.message})
        }
        console.log(event.id)
        if(event.type==="checkout.session.completed"){
            console.log("payemt Sucessfull")
        }
        else{
            console.warn(event.type)
        }
res.json({recieved:true})
    }
    else{
        res.setHeader("Allow","POST")
        res.status(405).json("Method Not Allowed")
    }
   

}