import Stripe from "stripe";
import micro_cors from "micro-cors";

const cors=micro_cors({
    origin:"http://localhost:3000/",
})

const stripe=new Stripe(`${process.env.NEXT_SECRET}`)

export default cors(async function handler(req,res){
    

    if(req.method==="POST"){
        try{
            const session=await stripe.checkout.sessions.create({
                mode:"payment",
                payment_method_types:['card'],
                line_items:[{
                    price_data:{
                        currency:"inr",
                        unit_amount:req.body.items.amount,
                     product_data:{
                            name:req.body.items.name,
                            description:req.body.items.description
                        },
                       },
                    quantity:req.body.tems.quantity
                   
                }],
                success_url:`/cancel_url`,
                cancel_url:`/cancel_url`
            })
        console.log(session)
            res.status(200).json(session)
        }
        catch(err){
            res.status(500).json({message:err})
        }

    }
    
        
    else{
        res.setHeader("Allow","POST")
        res.status(400).end("Method Not Allowed")
    }
})