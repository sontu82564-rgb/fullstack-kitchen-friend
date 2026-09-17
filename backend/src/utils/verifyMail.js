import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const verifyMail = async (token, email) => {
  const verificationUrl = `http://localhost:5173/verify/${token}`;

  // Debug logs
  console.log("\n========== EMAIL DEBUG ==========");
  console.log("Generated Token:");
  console.log(token);
  console.log("\nVerification URL:");
  console.log(verificationUrl);
  console.log("=================================\n");

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your Account",
    html: `
      <h2>Verify Your Email</h2>

      <p>Click the button below to verify your account.</p>

      <a
        href="${verificationUrl}"
        style="
          display:inline-block;
          padding:12px 20px;
          background:#28a745;
          color:#ffffff;
          text-decoration:none;
          border-radius:6px;
          font-weight:bold;
        "
      >
        Verify Your self
      </a>

      <p>This link will expire in 10 minutes</p>

      <p>Or copy and paste this link into your browser:</p>

      <p>${verificationUrl}</p>
    `,
  });

  console.log(" sent successfully to:", email);
};