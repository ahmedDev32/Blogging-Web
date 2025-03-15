import connectdb from "@/middleware/db";
import blogSchema from "@/models/blogSchema";
import UserEmail from "@/models/UserEmail";
import nodemailer from 'nodemailer';

let sendEmail = async (email, slug) => {
    // Create a transporter using an SMTP server (e.g., Gmail)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL,
            pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD
        }
    });

    // Construct the URL using the slug
    const blogUrl = `${process.env.NEXT_PUBLIC_HOST}/blogs/${slug}`;
    
    const htmlMessage = `
    <h2>New Blog Posted!</h2>
    <p>We have posted a new blog that might interest you. Check it out here:</p>
    <p><a href="${blogUrl}">${blogUrl}</a></p>
    `;

    // Define the email options
    const mailOptions = {
        from: process.env.NEXT_PUBLIC_EMAIL,
        to: email,
        subject: 'New Blog Posted on Our Website!',
        html: htmlMessage,
    };

    // Send the email
    return transporter.sendMail(mailOptions);
};

let handler = async (req, res) => {
  // Set CORS headers to allow all origins
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE, PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  try {
    if (req.method === 'POST') {
      const { title, DatePosted, image, orignal_post } = req.body;
      const Slug = title.replace(/ /g, '-');
      console.log(Slug);

      // Save the new blog post to the database
      let blogData = new blogSchema({
        title, DatePosted, image, orignal_post,Slug
      });
      await blogData.save();

      // Fetch user emails and send notifications
      const userEmails = await UserEmail.find({});
      for (let i = 0; i < userEmails.length; i++) {
        await sendEmail(userEmails[i].email, Slug);
      }

      return res.status(200).json({ msg: 'Blog Posted Successfully', success: true });
    } else {
      return res.status(404).json({ msg: "Method Not Allowed. This is a POST request.", success: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error In Posting Blog", success: false });
  }
};

export default connectdb(handler);
