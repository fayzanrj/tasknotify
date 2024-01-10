const nodemailer = require("nodemailer");

export const SendReminderEmail = async (
  name: string,
  email: string,
  taskTitle: string,
  taskDesc: string,
  taskId: string,
  url: string | null,
  status: string
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

    const urlValue = url === null || url === "" ? "N/A" : url;

    const emailSent = await transporter.sendMail({
      from: `"Task Notify" <${process.env.EMAIL}>`,
      to: email,
      subject: "Task Reminder",
      html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
        </head>
        <body>
          <div style="font-family: sans-serif">
            <div style="font-weight: bold; font-weight: 500; font-size: 1.25rem">
              <p>task<span style="color: #19fa9a">notify</span></p>
            </div>
      
            <p
              style="
                margin-top: 5px;
                margin-bottom: 2rem;
                font-weight: 500;
                font-size: 1.1rem;
              "
            >
              Hi ${name}, hope you are doing great. You are recieving this email as a
              reminder for your task that you added in your tasks list. Details of the
              task are as below
            </p>
      
            <p
              style="
                width: fit-content;
                margin: 5px auto 5px auto;
                font-size: 2rem;
                font-weight: bold;
              "
            >
              ${taskTitle}
            </p>
      
            <p style="margin-top: 2rem; font-weight: bold; font-size: 1.1rem">
              Task description : <span style="font-weight: 500">${taskDesc}</span>
            </p>
            <p style="margin-top: 2rem; font-weight: bold; font-size: 1.1rem">
              Current Status : <span style="font-weight: 500">${status}</span>
            </p>
      
            <p style="margin-top: 5px; font-weight: bold; font-size: 1.1rem">
              Attached link:
              <span style="font-weight: 500"> <a href="${
                urlValue === "N/A" ? "" : url
              }">${urlValue}</a> </span>
            </p>
      
            <a href="${process.env.HOST}/dashboard/tasks/taskdetail/${taskId}" >
              <button
                style="
                  padding: .75rem 1.5rem;
                  font-size: 1rem;
                  border: none;
                  border-radius: 0.5rem;
                  background-color: #19fa9a;
                  margin: 1rem 0 1rem 0;
                  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                  color : black
                "
              >
                See task details
              </button>
            </a>
      
            <p style="margin-top: 10px; font-weight: bold; font-size: 0.8rem">
              Note:
              <span style="font-weight: 500; font-size: 0.7rem "
                >If you did not schedule this task, kindly change your password ASAP.
                If you face any issue feel free to reply us on this email</span
              >
            </p>
            <p>Regards,</p>
            <p>taskNotify</p>
          </div>
        </body>
      </html>
      `,
    });
    console.log(emailSent);

    return emailSent;
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};
