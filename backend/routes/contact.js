const express = require('express');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Criar transporter do nodemailer
const createTransporter = () => {
  // Verificar se as configurações SMTP estão disponíveis
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('⚠️ Configurações SMTP não encontradas. Email não será enviado.');
    return null;
  }

  const isDevelopment = process.env.NODE_ENV === 'development';
  const isGmail = process.env.SMTP_HOST === 'smtp.gmail.com';
  
  // Para Gmail, usar configuração similar ao Python que funciona
  if (isGmail) {
    console.log('📧 Configurando transporte Gmail (porta 587 com STARTTLS)...');
    console.log('📧 SMTP_USER:', process.env.SMTP_USER);
    
    // Configuração exata como no Python: smtp.gmail.com:587 com STARTTLS
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // false = usa STARTTLS (como no Python)
      requireTLS: true, // Requer STARTTLS (equivalente ao starttls() do Python)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false // Aceitar certificados
      }
    });
  }
  
  // Para outros servidores SMTP
  const port = parseInt(process.env.SMTP_PORT) || 587;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: port,
    secure: port === 465, // true para 465, false para outras portas
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    // Configurações de conexão e timeout
    connectionTimeout: 60000, // 60 segundos
    greetingTimeout: 30000, // 30 segundos
    socketTimeout: 60000, // 60 segundos
    // Configurações TLS
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Rota para envio de email da landing page
router.post('/landing', [
  body('nome').trim().isLength({ min: 2 }).withMessage('Nome deve ter pelo menos 2 caracteres'),
  body('email').isEmail().withMessage('Email inválido'),
  body('telefone').trim().isLength({ min: 10 }).withMessage('Telefone inválido'),
  body('empresa').trim().optional(),
  body('investimento').trim().optional()
], async (req, res) => {
  try {
    // Validar dados
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: errors.array()
      });
    }

    const { nome, email, telefone, empresa, investimento } = req.body;
    const contactEmail = process.env.CONTACT_EMAIL || 'gelson@mundodosbots.com.br';
    const emailFrom = process.env.EMAIL_FROM || process.env.SMTP_USER || 'noreply@mundodosbots.com.br';

    console.log('📧 Iniciando envio de email...');
    console.log('📧 Variáveis SMTP:', {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USER: process.env.SMTP_USER ? '***configurado***' : 'NÃO CONFIGURADO',
      SMTP_PASS: process.env.SMTP_PASS ? '***configurado***' : 'NÃO CONFIGURADO'
    });

    // Criar transporter
    const transporter = createTransporter();
    console.log('📧 Transporter criado:', transporter ? 'OK' : 'NULL');
    
    if (!transporter) {
      // Em desenvolvimento, apenas logar os dados
      console.log('📧 [DEV MODE] Email que seria enviado:');
      console.log('Para:', contactEmail);
      console.log('De:', emailFrom);
      console.log('Assunto: Nova Solicitação de Chatbot - Landing Page');
      console.log('Dados:', { nome, email, telefone, empresa, investimento });
      
      return res.json({
        success: true,
        message: 'Dados recebidos com sucesso (modo desenvolvimento - email não enviado)',
        data: { nome, email, telefone, empresa, investimento }
      });
    }

    // Preparar conteúdo do email
    const emailHtml = `
      <h2>Nova Solicitação de Chatbot - Landing Page</h2>
      <p>Uma nova solicitação foi enviada através da landing page:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Nome:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${nome}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Email:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Telefone:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${telefone}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Empresa:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${empresa || 'Não informado'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Investimento disponível:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${investimento || 'Não informado'}</td>
        </tr>
      </table>
      
      <p style="margin-top: 20px;">O interessado quer saber mais sobre os planos e como começar.</p>
    `;

    const emailText = `
Nova solicitação de chatbot através da landing page:

Nome: ${nome}
Email: ${email}
Telefone: ${telefone}
Empresa: ${empresa || 'Não informado'}
Investimento disponível: ${investimento || 'Não informado'}

O interessado quer saber mais sobre os planos e como começar.
    `;

    // Configurar opções do email
    const mailOptions = {
      from: `"Mundo dos Bots" <${emailFrom}>`,
      to: contactEmail,
      replyTo: email, // Permitir responder diretamente para o cliente
      subject: 'Nova Solicitação de Chatbot - Landing Page',
      text: emailText,
      html: emailHtml
    };

    // Pular verificação e tentar enviar diretamente (verificação pode estar causando timeout)
    console.log('📧 Enviando email diretamente (sem verificação prévia)...');
    console.log('📧 MailOptions:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email enviado com sucesso:', info.messageId);

    res.json({
      success: true,
      message: 'Email enviado com sucesso! Entraremos em contato em breve.',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    console.error('❌ Stack trace:', error.stack);
    
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar email. Por favor, tente novamente ou entre em contato pelo WhatsApp.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;

