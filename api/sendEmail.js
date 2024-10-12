import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body;

    // Configurar transporte de nodemailer
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // Correo electrónico
        pass: process.env.PASSWORD // Contraseña o token
      }
    });

    // Configurar el contenido del correo
    let mailOptions = {
      from: process.env.EMAIL,
      to: "sergiorojascreaciones@gmail.com", // Reemplaza con tu correo electrónico
      subject: `Cliente consulta: ${subject}`,
      text: `Nombre: ${name}\nCorreo electrónico: ${email}\nAsunto: ${subject}\n\nMensaje:\n${message}`
    };

    try {
      // Enviar el correo
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Correo enviado con éxito.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al enviar el correo.' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
