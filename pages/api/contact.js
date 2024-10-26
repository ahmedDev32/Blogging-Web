import nodemailer from 'nodemailer'

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
       if(req.method==='POST'){
        let { Name, Email, Question } = req.body
        
        // Create a transporter using an SMTP server (e.g., Gmail)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL,
                pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD
            }
        });

        const htmlMessage = `
        <h2>New Inquiry from ${Name}</h2>
        <p><strong>Name:</strong> ${Name}</p>
        <p><strong>Email:</strong> <a href="mailto:${Email}">${Email}</a></p>
        <p><strong>Question:</strong></p>
        <p>${Question}</p>
        `;

        // Define the email options
        const mailOptions = {
            from: Email,
            to: process.env.NEXT_PUBLIC_EMAIL,
            subject: 'Contact Query From Blogging Website!',
            html: htmlMessage,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            return res.status(404).json({msg:"Error While Sending Email",success:false})
            } else {
            return res.status(200).json({msg:"Email Sent SuccessFully",success:true})
            }
        });
       }else{
        return res.status(404).json({msg:"Such Method Not Allowed",success:false})
       }

    } catch (error) {
        return res.status(500).json({ msg: "Error Occured InterNally", success: false })
    }
}

export default handler;