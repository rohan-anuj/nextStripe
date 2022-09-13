import Stripe from "stripe";

const stripe=new Stripe(process.env.NEXT_SECRET)

export default async function  handler(){
    const id=req.query.id
    console.log(id)

    try{

        if(!id.startwith('cs_')){
            throw Error("Invalid Checkout Session_Id");
        }
        const checkout_session=await stripe.checkout.sessions.retrieve(id)
        res.status(200).json(checkout_session)

    }
    catch(err){
        res.status(500).end({message:err.message})
    }
}