const express=require("express")
const app=express()
const cors=require("cors")
const qrcode=require("qrcode")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())
 
async function qrcodegenerator(text){
    const qr= await qrcode.toDataURL(text,{ scale: 10 })
    console.log(qr)
    return qr
}

app.post("/qrcode",async (req,res)=>{
    try {
        const {text}=req.body
        const imageurl= await qrcodegenerator(text)
        res.status(200).json({qrCode:imageurl})
    } catch (error) {
        console.log(error)
    }
})

app.listen(3000,()=>console.log(`http://localhost:3000`))