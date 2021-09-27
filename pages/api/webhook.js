import { buffer } from "micro"
import * as admin from "firebase-admin"
const stripe = require("stripe")(process.env.STRIPE_ID)

var nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tomyself6@gmail.com",
    pass: "27janu2000",
  },
  tls: {
    rejectUnauthorized: false,
  },
})

//secure connection or firebase config
var serviceAccount = require("../../webhookPermission.json")
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app()

const endpointSecret = process.env.WEBHOOK_ID

export default async (req, res) => {
  if (req.method === "POST") {
    const reqBuffer = await buffer(req)
    const payload = reqBuffer.toString()
    const signature = req.headers["stripe-signature"]
    let event
    try {
      event = await stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      )
    } catch (e) {
      return res.status(400).send(`webhook error ${e.message}`)
    }
    if (event.type === "checkout.session.completed") {
      const session = event.data.object

      var mailOptions = {
        from: "tomyself6@gmail.com",
        to: session.metadata.email,
        subject: "Next Amazon email",
        text: "Your order will be placed within 2 to 3 days",
      }

      await app
        .firestore()
        .collection("users")
        .doc(session.metadata.email)
        .collection("orders")
        .doc(session.id)
        .set({
          amount: session.amount_total / 100,
          images: JSON.parse(session.metadata.images),
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error)
            }
          })
        })
    }
    res.status(200).end()
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}
