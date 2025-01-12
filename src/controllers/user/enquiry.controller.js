import validate from "../../middlewares/joi.validate.js";
import Enquiry from "../../models/enquiry.model.js";
import sendEmail from "../../utils/sendEmail.js";
import Joi from "joi";

export default {
    validator: validate(
        Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            subject: Joi.string().required(),
            message: Joi.string().required(),
        })
    ),
    handler: async (req, res) => {
        try {
            const { name, email, subject, message } = req.body;

            const enquiry = await Enquiry.create({ name, email, subject, message });

            const emailSubject = "Welcome to Classic Motel";
            const emailBody = `
            <html>
                <head>
                    <style>
                        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #53624e; background-color: #f4f4f4; margin: 0; padding: 0; }
                        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
                        .header { background-color: #b99d75; padding: 20px; text-align: center; }
                        .header h1 { color: #ffffff; margin: 0; }
                        .content { padding: 30px;  }
                        .footer { background-color: #b99d75; color: #ffffff; text-align: center; padding: 10px; font-size: 14px; }
                        ul { padding-left: 20px; }
                        .btn { display: inline-block; background-color: #b99d75; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header" style="border: 1px solid #fff; border-radius: 8px 8px 0 0;">
                            <h1>Welcome to Classic Motel</h1>
                        </div>
                        <div class="content" style=" border-left: 1px solid #fff; border-right: 1px solid #fff; ">
                            <p style="color: #53624e;">Dear ${name},</p>
                            <p style="color: #53624e;">Thank you for your inquiry. We're delighted to welcome you to Classic Motel!</p>
                            <p style="color: #53624e;">We have received your message and our team will get back to you as soon as possible.</p>
                            <p style="color: #53624e;">Here's a summary of your inquiry:</p>
                            <ul>
                                <li style="color: #f4f4f4;"><strong>Subject:</strong> ${subject}</li>
                                <li style="color: #f4f4f4;"><strong>Message:</strong> ${message}</li>
                            </ul>
                            <p style="color: #53624e;">If you have any additional questions or concerns, please don't hesitate to contact us.</p>
                            <p style="color: #53624e;">We look forward to serving you and ensuring your stay at Classic Motel is nothing short of exceptional.</p>
                            <a href="https://classicmotel.com" class="btn">Visit Our Website</a>
                        </div>
                        <div class="footer" style="border: 1px solid #fff; border-radius: 0 0 8px 8px;">
                            <p>Best regards,<br>The Classic Motel Team</p>
                        </div>
                    </div>
                </body>
            </html>
            `;

            await sendEmail(email, emailSubject, emailBody);
            res.status(201).json({ success: true, message: "Inquiry received and welcome email sent", data: enquiry });
        } catch (error) {
            console.error("Error in enquiry handler:", error);
            res.status(500).json({ success: false, message: "An error occurred while processing your request" });
        }
    },
};
