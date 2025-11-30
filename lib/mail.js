// Fichier: lib/mail.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// --- TEMPLATE DE BASE AVEC DESIGN MODERNE ---
const emailTemplate = (content, bgColor = '#1B3A5F') => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, ${bgColor} 0%, #2d5a8f 100%); padding: 40px 30px; text-align: center; }
    .logo { font-size: 28px; font-weight: bold; color: #F4B223; margin-bottom: 10px; letter-spacing: 1px; text-shadow: 2px 2px 4px rgba(0,0,0,0.2); }
    .header-subtitle { color: white; font-size: 14px; opacity: 0.9; }
    .content { padding: 40px 30px; }
    .badge { display: inline-block; background: #F4B223; color: #1B3A5F; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 20px; }
    .title { color: #1B3A5F; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
    .info-box { background: #f8f9fa; border-left: 4px solid #F4B223; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .info-row { display: flex; margin-bottom: 12px; align-items: flex-start; }
    .info-label { font-weight: bold; color: #1B3A5F; min-width: 120px; }
    .info-value { color: #333; flex: 1; }
    .details-box { background: #1B3A5F; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; font-size: 14px; line-height: 1.6; }
    .button { display: inline-block; background: linear-gradient(135deg, #F4B223 0%, #e6a520 100%); color: #1B3A5F; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; box-shadow: 0 4px 15px rgba(244, 178, 35, 0.3); transition: transform 0.2s; }
    .button:hover { transform: translateY(-2px); }
    .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #666; font-size: 13px; border-top: 1px solid #e0e0e0; }
    .footer-logo { color: #1B3A5F; font-weight: bold; margin-bottom: 10px; }
    .divider { height: 1px; background: linear-gradient(to right, transparent, #e0e0e0, transparent); margin: 30px 0; }
    @media only screen and (max-width: 600px) {
      .container { margin: 20px; }
      .content { padding: 30px 20px; }
      .info-row { flex-direction: column; }
      .info-label { margin-bottom: 5px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🚀 LE LIVREUR 2.0</div>
      <div class="header-subtitle">Votre partenaire logistique de confiance</div>
    </div>
    ${content}
    <div class="footer">
      <div class="footer-logo">LE LIVREUR 2.0</div>
      <p>📍 Cotonou, Bénin | 📞 +229 01 47 04 28 15 | 📧 contact@lelivreur2.0.com</p>
      <p style="margin-top: 15px; font-size: 11px; color: #999;">
        Cet email a été généré automatiquement, merci de ne pas y répondre directement.
      </p>
    </div>
  </div>
</body>
</html>
`;

// --- FONCTION EXISTANTE (POUR L'ADMIN) ---
export async function sendAdminNotification(type, data) {
  try {
    let subject = "";
    let content = "";

    if (type === 'devis') {
      subject = `🚀 NOUVEAU DEVIS : ${data.name}`;
      content = `
        <div class="content">
          <span class="badge">🎯 DEMANDE DE DEVIS</span>
          <h1 class="title">Nouvelle demande reçue !</h1>
          
          <div class="info-box">
            <div class="info-row">
              <span class="info-label">👤 Client :</span>
              <span class="info-value">${data.name}</span>
            </div>
            <div class="info-row">
              <span class="info-label">📞 Téléphone :</span>
              <span class="info-value"><a href="tel:${data.phone}" style="color: #F4B223; text-decoration: none; font-weight: bold;">${data.phone}</a></span>
            </div>
            <div class="info-row">
              <span class="info-label">🚚 Service :</span>
              <span class="info-value"><strong style="color: #F4B223;">${data.serviceType.toUpperCase()}</strong></span>
            </div>
          </div>

          <div class="divider"></div>

          <h3 style="color: #1B3A5F; margin-bottom: 15px;">📋 Détails de la demande :</h3>
          <div class="details-box">${data.details.replace(/\n/g, '<br>')}</div>

          <center>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/devis" class="button">
              📊 Ouvrir le Panneau Admin
            </a>
          </center>

          <p style="color: #666; font-size: 13px; margin-top: 30px; text-align: center;">
            ⏰ Demande reçue le ${new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      `;
    } else if (type === 'contact') {
      subject = `📩 MESSAGE CONTACT : ${data.subject}`;
      content = `
        <div class="content">
          <span class="badge">💬 MESSAGE CONTACT</span>
          <h1 class="title">Nouveau message reçu</h1>
          
          <div class="info-box">
            <div class="info-row">
              <span class="info-label">👤 Nom :</span>
              <span class="info-value">${data.name}</span>
            </div>
            <div class="info-row">
              <span class="info-label">📧 Email :</span>
              <span class="info-value"><a href="mailto:${data.email}" style="color: #F4B223; text-decoration: none;">${data.email}</a></span>
            </div>
            <div class="info-row">
              <span class="info-label">📌 Sujet :</span>
              <span class="info-value"><strong>${data.subject}</strong></span>
            </div>
          </div>

          <div class="divider"></div>

          <h3 style="color: #1B3A5F; margin-bottom: 15px;">💭 Message :</h3>
          <div class="details-box">${data.message.replace(/\n/g, '<br>')}</div>

          <center>
            <a href="mailto:${data.email}" class="button">
              ✉️ Répondre au Client
            </a>
          </center>
        </div>
      `;
    } else if (type === 'recrutement') {
      subject = `👔 NOUVELLE CANDIDATURE`;
      content = `
        <div class="content">
          <span class="badge">🎓 CANDIDATURE</span>
          <h1 class="title">Nouvelle candidature reçue</h1>
          
          <div class="info-box">
            <div class="info-row">
              <span class="info-label">👤 Candidat :</span>
              <span class="info-value">${data.name}</span>
            </div>
            <div class="info-row">
              <span class="info-label">📧 Email :</span>
              <span class="info-value"><a href="mailto:${data.email}" style="color: #F4B223; text-decoration: none;">${data.email}</a></span>
            </div>
            <div class="info-row">
              <span class="info-label">💼 CV :</span>
              <span class="info-value"><strong style="color: #F4B223;">${data.cv_url}</strong></span>
            </div>
          </div>

          <div class="divider"></div>

          <h3 style="color: #1B3A5F; margin-bottom: 15px;">📝 Lettre de motivation :</h3>
          <div class="details-box">${data.motivation.replace(/\n/g, '<br>')}</div>

          <center>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/candidatures" class="button">
              📂 Voir toutes les candidatures
            </a>
          </center>

          <p style="color: #666; font-size: 13px; margin-top: 30px; text-align: center;">
            💡 <strong>Astuce :</strong> Pensez à consulter le CV en pièce jointe
          </p>
        </div>
      `;
    }

    await transporter.sendMail({
      from: `"LE LIVREUR 2.0 Bot" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: subject,
      html: emailTemplate(content),
    });

    console.log(`✅ Notification email (${type}) envoyée à l'admin.`);
    return true;
  } catch (error) {
    console.error("❌ Erreur envoi email:", error);
    return false;
  }
}
