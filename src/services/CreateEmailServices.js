export const companyRegisterEmail = (name,email,password) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f7;
              margin: 0;
              padding: 0;
              -webkit-text-size-adjust: none;
              width: 100%;
            }
            .container {
              background-color: #ffffff;
              margin: 0 auto;
              padding: 40px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              max-width: 600px;
              text-align: center;
            }
            h1 {
              color: #333333;
              font-size: 24px;
              margin-bottom: 20px;
            }
            p {
              color: #666666;
              font-size: 16px;
              margin-bottom: 20px;
              line-height: 1.6;
            }
            .details {
              font-size: 18px;
              font-weight: bold;
              color: #007bff;
              margin: 20px 0;
              text-align: left;
            }
            .footer {
              margin-top: 30px;
              font-size: 14px;
              color: #999999;
            }
            @media (max-width: 600px) {
              .container {
                padding: 20px;
              }
              h1 {
                font-size: 20px;
              }
              .details {
                font-size: 16px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Register Successful!</h1>
            <p>Hello ${name},</p>
            <p>We’re excited to inform you that your company is  successfully register.</p>
            <div class="details">
              <p><strong>Your Email:</strong> ${email}</p>
              <p><strong>Your Password:</strong> ${password}</p>
            </div>
            <p>Please login to Your Account.</p>
            <a href="${process.env.WEBSITE_URL}company/login" style="text-decoration: none;">
  <button type="button">Login</button>
</a>

          </div>
        </body>
      </html>
    `;
  };
  