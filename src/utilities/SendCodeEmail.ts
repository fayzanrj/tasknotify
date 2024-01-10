const nodemailer = require("nodemailer");

export const SendCodeEmail = async (
  email: string,
  name: string,
  subject: string,
  code: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });


    const emailSent = await transporter.sendMail({
      from: `"Task Notify" <${process.env.EMAIL}>`,
      to: email,
      subject: subject,
      html: ` <div style="font-family:sans-serif">
      <div
        style="font-weight: bold; font-weight: 500; letter-spacing: 0.1rem; font-size: 1.25rem"
      >
        <p>task<span style="color: #19fa9a">notify</span></p>
      </div>

      <p style="margin-top: 5px; margin-bottom: 2rem;  font-weight: 500;font-size: 1.1rem">
        Hi ${name}, hope you are doing great. Here is your verification code.
      </p>

      <p
        style="
          letter-spacing: 0.5rem;
          width: fit-content;
          margin: 5px auto 5px auto;
          font-size: 3.75rem;
          font-weight: bold;
        "
      >
        ${code}
      </p>

      <p style="margin-top: 2rem; font-weight: 500; font-size: 1.1rem">
        Please keep in mind, without verifying your account you will not be able
        to get email notifications of your scheduled tasks.
      </p>

      <p style="margin-top: 5px; font-weight: bold; font-size: 1.1rem">
        Note:
        <span style="font-weight: 500;">
          If you have not requested this code, reply us back on this email ASAP.
        </span>
      </p>
    </div>`,
    });

    return emailSent;
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};
