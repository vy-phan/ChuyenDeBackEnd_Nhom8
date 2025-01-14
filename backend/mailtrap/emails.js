import transporter, { emailConfig } from "./mailtrap.config.js";

const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Xác Thực Email Của Bạn</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Xác Thực Email Của Bạn</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Xin chào,</p>
    <p>Cảm ơn bạn đã đăng ký! Mã xác thực của bạn là:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Vui lòng nhập mã này vào trang xác thực để hoàn tất đăng ký.</p>
    <p>Mã này sẽ hết hạn sau 15 phút vì lý do bảo mật.</p>
    <p>Nếu bạn không tạo tài khoản với chúng tôi, vui lòng bỏ qua email này.</p>
    <p><br>Website NetTrom</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Đây là tin nhắn tự động, vui lòng không trả lời email này.</p>
  </div>
</body>
</html>
`;

export const sendVerificationEmail = async (email, verificationToken) => {
  if (!email || !verificationToken) {
      throw new Error('Email and verification token are required');
  }

  try {
      const mailOptions = {
          from: `${emailConfig.from.name} <${emailConfig.from.email}>`,
          to: email,
          subject: "Xác thực email của bạn",
          html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);
      return info;
  } catch (error) {
      console.error("Error sending verification email:", error);
      throw new Error(`Failed to send verification email: ${error.message}`);
  }
};