import validate from "../../middlewares/joi.validate.js";
import Enquiry from "../../models/enquiry.model.js";
import sendEmail from "../../utils/sendEmail.js";
import Joi from "joi";

export default {
    validator: validate(
        Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            subject: Joi.string().required(),
            message: Joi.string().required(),
        })
    ),
    handler: async (req, res) => {
        const { name, email, subject, message } = req.body;

        const findEmail = await Enquiry.findOne({ email });
        const enquiry = await Enquiry.create({ name, email, subject, message });
    
        // Send welcome email
        const emailSubject = "Welcome to Classic Motel";
        const emailBody = `
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                    <h1 style="color: #4a4a4a;">Welcome to Classic Motel</h1>
                    <p>Dear ${name},</p>
                    <p>Thank you for your inquiry. We're delighted to welcome you to Classic Motel!</p>
                    <p>We have received your message and our team will get back to you as soon as possible.</p>
                    <p>Here's a summary of your inquiry:</p>
                    <ul>
                        <li><strong>Subject:</strong> ${subject}</li>
                        <li><strong>Message:</strong> ${message}</li>
                    </ul>
                    <p>If you have any additional questions or concerns, please don't hesitate to contact us.</p>
                    <p>We look forward to serving you and ensuring your stay at Classic Motel is nothing short of exceptional.</p>
                    <p>Best regards,<br>The Classic Motel Team</p>
                </div>
            </body>
        </html>
        `;
        try {
            await sendEmail(email, emailSubject, emailBody); 
            res.status(201).json({ enquiry, message: "Inquiry received and welcome email sent" });
        } catch (error) {
            console.error("Error sending welcome email:", error);
            // Log the error details for debugging
            console.error("Error details:", JSON.stringify(error, null, 2));
            res.status(500).json({ enquiry, message: "Inquiry received, but there was an error sending the welcome email" });
        }
    },
};
