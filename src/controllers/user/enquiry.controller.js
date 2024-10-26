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
                <body style="font-family: 'Acme', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #ffffff;">
                        <h1 style="color: #53624e;">Welcome to Classic Motel</h1>
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

            await sendEmail(email, emailSubject, emailBody);
            res.status(201).json({ success: true, message: "Inquiry received and welcome email sent", data: enquiry });
        } catch (error) {
            console.error("Error in enquiry handler:", error);
            res.status(500).json({ success: false, message: "An error occurred while processing your request" });
        }
    },
};
