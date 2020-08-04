import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import mgTransport from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const adjRandomNumber = Math.floor(Math.random() * adjectives.length);
  const nounRandomNumber = Math.floor(Math.random() * nouns.length);
  return `${adjectives[adjRandomNumber]} ${nouns[nounRandomNumber]}`;
};

export const sendMail = (email) => {
  const auth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };
  const client = nodemailer.createTransport(mgTransport(auth));
  return client.sendMail(email, (err, info) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      console.log(`Response: ${info}`);
    }
  });
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "md2eoseo@prismagram.com",
    to: address,
    subject: "🔒Login Secret for Prismagram🔒",
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/wepsite to login.`,
  };
  return sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
