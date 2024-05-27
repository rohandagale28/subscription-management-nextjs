import User from "@/model/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "verify") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000, //expiry 1 hour from now
        },
      });
    } else if (emailType === "reset") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000, //expiry 1 hour from now
        },
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1d383519fd0342",
        pass: "aa720701a684bb",
      },
    });

    const mailOptions = {
      from: "subspace@management.ai",
      to: email,
      subject: emailType === "verify" ? "Subscription Login Verifiaction" : "Subscription Password",
      text: "Hello world?",
      html: `<p>Click <a href='${process.env.NEXT_PUBLIC_DOMAIN}/verifyemail?token=${hashedToken}'>here</a>to ${emailType === "verify" ? "verify your email" : "reset your password"}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
