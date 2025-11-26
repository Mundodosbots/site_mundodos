import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const PrivacyContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fffe 0%, #e8f5f3 100%);
  padding: 2rem 0;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 0;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const LastUpdated = styled.p`
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
`;

const Content = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  line-height: 1.8;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-weight: 600;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
`;

const SectionSubtitle = styled.h3`
  font-size: 1.4rem;
  color: var(--text-primary);
  margin: 1.5rem 0 1rem 0;
  font-weight: 600;
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  text-align: justify;
`;

const List = styled.ul`
  margin: 1rem 0;
  padding-left: 2rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.8rem;
  color: var(--text-primary);
`;

const HighlightBox = styled.div`
  background: #f0f9ff;
  border-left: 4px solid var(--primary-color);
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 0 10px 10px 0;
`;

const ContactInfo = styled.div`
  background: var(--primary-color);
  color: white;
  padding: 2rem;
  border-radius: 15px;
  margin-top: 3rem;
  text-align: center;
`;

const ContactTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ContactItem = styled.p`
  margin: 0.5rem 0;
  font-size: 1.1rem;
`;

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidade - Mundo dos Bots</title>
        <meta name="description" content="Política de Privacidade da Mundo dos Bots. Saiba como coletamos, usamos e protegemos seus dados pessoais." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <PrivacyContainer>
        <ContentWrapper>
          <Header>
            <Title>Política de Privacidade</Title>
            <Subtitle>Mundo dos Bots</Subtitle>
            <LastUpdated>Última atualização: 17 de outubro de 2025</LastUpdated>
          </Header>

          <Content>
            <Section>
              <SectionTitle>1. Introdução</SectionTitle>
              <Paragraph>
                A Mundo dos Bots ("nós", "nosso" ou "empresa") está comprometida com a proteção da privacidade e dos dados pessoais de nossos usuários, clientes e visitantes. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você utiliza nossos serviços, acessa nosso site ou interage conosco.
              </Paragraph>
              <Paragraph>
                Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e outras legislações aplicáveis de proteção de dados.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>2. Informações que Coletamos</SectionTitle>
              
              <SectionSubtitle>2.1 Informações Fornecidas Diretamente</SectionSubtitle>
              <Paragraph>Coletamos informações que você nos fornece voluntariamente, incluindo:</Paragraph>
              <List>
                <ListItem>Nome completo</ListItem>
                <ListItem>Endereço de e-mail</ListItem>
                <ListItem>Número de telefone/WhatsApp</ListItem>
                <ListItem>Nome da empresa</ListItem>
                <ListItem>Informações sobre investimento disponível</ListItem>
                <ListItem>Mensagens e comunicações</ListItem>
                <ListItem>Informações de conta e perfil</ListItem>
              </List>

              <SectionSubtitle>2.2 Informações Coletadas Automaticamente</SectionSubtitle>
              <Paragraph>Quando você visita nosso site, coletamos automaticamente:</Paragraph>
              <List>
                <ListItem>Endereço IP</ListItem>
                <ListItem>Tipo de navegador e versão</ListItem>
                <ListItem>Sistema operacional</ListItem>
                <ListItem>Páginas visitadas e tempo de permanência</ListItem>
                <ListItem>Data e hora de acesso</ListItem>
                <ListItem>Referrer (site de origem)</ListItem>
                <ListItem>Cookies e tecnologias similares</ListItem>
              </List>

              <SectionSubtitle>2.3 Cookies e Tecnologias de Rastreamento</SectionSubtitle>
              <Paragraph>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso do site e personalizar conteúdo. Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>3. Como Utilizamos suas Informações</SectionTitle>
              <Paragraph>Utilizamos suas informações pessoais para:</Paragraph>
              <List>
                <ListItem>Fornecer e melhorar nossos serviços de chatbots e automação</ListItem>
                <ListItem>Processar solicitações e responder a consultas</ListItem>
                <ListItem>Enviar comunicações relacionadas aos serviços</ListItem>
                <ListItem>Personalizar sua experiência em nosso site</ListItem>
                <ListItem>Analisar o uso de nossos serviços</ListItem>
                <ListItem>Detectar e prevenir fraudes e abusos</ListItem>
                <ListItem>Cumprir obrigações legais e regulamentares</ListItem>
                <ListItem>Desenvolver novos produtos e serviços</ListItem>
              </List>
            </Section>

            <Section>
              <SectionTitle>4. Base Legal para o Tratamento</SectionTitle>
              <Paragraph>Tratamos seus dados pessoais com base nas seguintes bases legais:</Paragraph>
              <List>
                <ListItem><strong>Consentimento:</strong> Quando você nos dá permissão explícita</ListItem>
                <ListItem><strong>Execução de Contrato:</strong> Para cumprir obrigações contratuais</ListItem>
                <ListItem><strong>Interesse Legítimo:</strong> Para melhorar nossos serviços e segurança</ListItem>
                <ListItem><strong>Obrigação Legal:</strong> Para cumprir requisitos legais</ListItem>
              </List>
            </Section>

            <Section>
              <SectionTitle>5. Compartilhamento de Informações</SectionTitle>
              <Paragraph>Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto nas seguintes situações:</Paragraph>
              <List>
                <ListItem>Com seu consentimento explícito</ListItem>
                <ListItem>Para cumprir obrigações legais</ListItem>
                <ListItem>Com prestadores de serviços que nos auxiliam (sob acordos de confidencialidade)</ListItem>
                <ListItem>Em caso de fusão, aquisição ou reestruturação da empresa</ListItem>
                <ListItem>Para proteger nossos direitos legais ou segurança</ListItem>
              </List>

              <HighlightBox>
                <strong>Prestadores de Serviços:</strong> Utilizamos serviços terceirizados como EmailJS para envio de e-mails, Google Analytics para análise de tráfego, e provedores de hospedagem. Todos esses prestadores são obrigados a manter a confidencialidade de seus dados.
              </HighlightBox>
            </Section>

            <Section>
              <SectionTitle>6. Segurança dos Dados</SectionTitle>
              <Paragraph>
                Implementamos medidas de segurança técnicas, administrativas e físicas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição, incluindo:
              </Paragraph>
              <List>
                <ListItem>Criptografia de dados em trânsito e em repouso</ListItem>
                <ListItem>Controles de acesso rigorosos</ListItem>
                <ListItem>Monitoramento de segurança contínuo</ListItem>
                <ListItem>Treinamento regular da equipe em proteção de dados</ListItem>
                <ListItem>Backup seguro e recuperação de dados</ListItem>
                <ListItem>Auditorias regulares de segurança</ListItem>
              </List>
            </Section>

            <Section>
              <SectionTitle>7. Retenção de Dados</SectionTitle>
              <Paragraph>
                Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período de retenção mais longo seja exigido ou permitido por lei. Os critérios para determinar os períodos de retenção incluem:
              </Paragraph>
              <List>
                <ListItem>Duração do relacionamento comercial</ListItem>
                <ListItem>Obrigações legais e regulamentares</ListItem>
                <ListItem>Necessidade de resolver disputas</ListItem>
                <ListItem>Prevenção de fraudes e abusos</ListItem>
              </List>
            </Section>

            <Section>
              <SectionTitle>8. Seus Direitos</SectionTitle>
              <Paragraph>De acordo com a LGPD, você tem os seguintes direitos:</Paragraph>
              <List>
                <ListItem><strong>Acesso:</strong> Solicitar informações sobre seus dados pessoais</ListItem>
                <ListItem><strong>Correção:</strong> Corrigir dados incompletos, inexatos ou desatualizados</ListItem>
                <ListItem><strong>Exclusão:</strong> Solicitar a exclusão de dados desnecessários</ListItem>
                <ListItem><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</ListItem>
                <ListItem><strong>Revogação:</strong> Retirar seu consentimento a qualquer momento</ListItem>
                <ListItem><strong>Oposição:</strong> Opor-se ao tratamento de seus dados</ListItem>
                <ListItem><strong>Informação:</strong> Obter informações sobre o tratamento de seus dados</ListItem>
              </List>
            </Section>

            <Section>
              <SectionTitle>9. Transferência Internacional</SectionTitle>
              <Paragraph>
                Alguns de nossos prestadores de serviços podem estar localizados fora do Brasil. Quando transferimos dados pessoais internacionalmente, garantimos que tais transferências sejam feitas com proteções adequadas, incluindo cláusulas contratuais padrão aprovadas pela Autoridade Nacional de Proteção de Dados (ANPD).
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>10. Menores de Idade</SectionTitle>
              <Paragraph>
                Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente informações pessoais de menores. Se tomarmos conhecimento de que coletamos dados de um menor, tomaremos medidas para excluir essas informações de nossos sistemas.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>11. Alterações nesta Política</SectionTitle>
              <Paragraph>
                Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas ou por outros motivos operacionais, legais ou regulamentares. Notificaremos sobre mudanças significativas através de nosso site ou por e-mail.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>12. Autoridade Nacional de Proteção de Dados</SectionTitle>
              <Paragraph>
                Você tem o direito de apresentar uma reclamação à Autoridade Nacional de Proteção de Dados (ANPD) se considerar que o tratamento de seus dados pessoais viola a legislação aplicável.
              </Paragraph>
            </Section>

            <ContactInfo>
              <ContactTitle>Entre em Contato</ContactTitle>
              <Paragraph>
                Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos seus dados pessoais, entre em contato conosco:
              </Paragraph>
              <ContactItem><strong>E-mail:</strong> privacidade@mundodosbots.com.br</ContactItem>
              <ContactItem><strong>Telefone:</strong> +55 66 98444-3050</ContactItem>
              <ContactItem><strong>WhatsApp:</strong> +55 66 98444-3050</ContactItem>
              <ContactItem><strong>Endereço:</strong> Mundo dos Bots, Brasil</ContactItem>
            </ContactInfo>
          </Content>
        </ContentWrapper>
      </PrivacyContainer>
    </>
  );
};

export default PrivacyPolicy;
