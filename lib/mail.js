// Fichier: lib/mail.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// --- FONCTION EXISTANTE (POUR L'ADMIN) ---
export async function sendAdminNotification(type, data) {
  try {
    let subject = "";
    let html = "";

    if (type === 'devis') {
      subject = `🚀 NOUVEAU DEVIS : ${data.name}`;
      html = `
        <div style="font-family: sans-serif; color: #1B3A5F;">
          <h2>Nouvelle demande de devis reçue !</h2>
          <p><strong>Client :</strong> ${data.name}</p>
          <p><strong>Téléphone :</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
          <p><strong>Service :</strong> ${data.serviceType.toUpperCase()}</p>
          <hr />
          <h3>Détails de la demande :</h3>
          <pre style="background: #f4f4f4; padding: 15px; border-radius: 5px; font-size: 14px;">${data.details}</pre>
          <br />
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/devis" style="background: #F4B223; color: #1B3A5F; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Ouvrir le dossier Admin
          </a>
        </div>
      `;
    } else if (type === 'contact') {
      subject = `📩 MESSAGE CONTACT : ${data.subject}`;
      html = `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Nouveau message de contact</h2>
          <p><strong>De :</strong> ${data.name} (${data.email})</p>
          <p><strong>Sujet :</strong> ${data.subject}</p>
          <hr />
          <p>${data.message}</p>
        </div>
      `;
    }

    await transporter.sendMail({
      from: `"LE LIVREUR 2.0 Bot" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: subject,
      html: html,
    });

    console.log(`✅ Notification email (${type}) envoyée à l'admin.`);
    return true;

  } catch (error) {
    console.error("❌ Erreur envoi email:", error);
    return false;
  }
}

// --- NOUVELLE FONCTION (POUR LE CANDIDAT) ---
export async function sendCandidateEmail(to, subject, htmlContent) {
  try {
    await transporter.sendMail({
      from: `"LE LIVREUR 2.0 RH" <${process.env.GMAIL_USER}>`, // Nom d'expéditeur Pro
      to: to, // L'adresse du candidat
      subject: subject,
      html: htmlContent,
    });

    console.log(`✅ Email envoyé au candidat : ${to}`);
    return true;
  } catch (error) {
    console.error("❌ Erreur envoi candidat:", error);
    throw new Error(error.message); // On renvoie l'erreur pour que l'API le sache
  }
}