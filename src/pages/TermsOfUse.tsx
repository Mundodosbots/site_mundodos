import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const TermsContainer = styled.div`
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

const TermsOfUse: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Termos de Uso - Mundo dos Bots</title>
        <meta name="description" content="Termos de Uso da Mundo dos Bots. Conheça as condições e regras para utilização de nossos serviços." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <TermsContainer>
        <ContentWrapper>
          <Header>
            <Title>Termos de Uso</Title>
            <Subtitle>Mundo dos Bots</Subtitle>
            <LastUpdated>Última atualização: 17 de outubro de 2025</LastUpdated>
          </Header>

          <Content>
            <Section>
              <SectionTitle>1. Aceitação dos Termos</SectionTitle>
              <Paragraph>
                Estes Termos de Uso ("Termos") regem o uso dos serviços oferecidos pela Mundo dos Bots ("Empresa", "nós", "nosso" ou "nos"). Ao acessar ou utilizar nossos serviços, você concorda em cumprir e estar vinculado a estes Termos.
              </Paragraph>
              <Paragraph>
                Se você não concordar com qualquer parte destes Termos, não deve utilizar nossos serviços.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>2. Descrição dos Serviços</SectionTitle>
              <Paragraph>
                A Mundo dos Bots oferece serviços de desenvolvimento e implementação de chatbots inteligentes, automação de processos, soluções de atendimento ao cliente e ferramentas de marketing digital, incluindo:
              </Paragraph>
              <List>
                <ListItem>Chatbots para WhatsApp, sites e aplicativos</ListItem>
                <ListItem>Automação de atendimento ao cliente</ListItem>
                <ListItem>Qualificação e captura de leads</ListItem>
                <ListItem>Automação de marketing digital</ListItem>
                <ListItem>Integração com sistemas existentes</ListItem>
                <ListItem>Consultoria em automação de processos</ListItem>
                <ListItem>Suporte técnico e manutenção</ListItem>
              </List>
            </Section>

            <Section>
              <SectionTitle>3. Elegibilidade</SectionTitle>
              <Paragraph>
                Para utilizar nossos serviços, você deve:
              </Paragraph>
              <List>
                <ListItem>Ter pelo menos 18 anos de idade</ListItem>
                <ListItem>Ter capacidade legal para celebrar contratos</ListItem>
                <ListItem>Fornecer informações verdadeiras e precisas</ListItem>
                <ListItem>Manter a confidencialidade de suas credenciais de acesso</ListItem>
                <ListItem>Cumprir todas as leis e regulamentos aplicáveis</ListItem>
              </List>
            </Section>

            <Section>
              <SectionTitle>4. Conta do Usuário</SectionTitle>
              <SectionSubtitle>4.1 Criação de Conta</SectionSubtitle>
              <Paragraph>
                Para acessar certos serviços, você pode precisar criar uma conta. Você é responsável por:
              </Paragraph>
              <List>
                <ListItem>Fornecer informações precisas e atualizadas</ListItem>
                <ListItem>Manter a segurança de sua senha</ListItem>
                <ListItem>Notificar-nos imediatamente sobre qualquer uso não autorizado</ListItem>
                <ListItem>Ser responsável por todas as atividades em sua conta</ListItem>
              </List>

              <SectionSubtitle>4.2 Suspensão e Encerramento</SectionSubtitle>
              <Paragraph>
                Reservamo-nos o direito de suspender ou encerrar sua conta a qualquer momento, com ou sem aviso prévio, por violação destes Termos ou por qualquer outro motivo a nosso critério.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>5. Uso Aceitável</SectionTitle>
              <Paragraph>Você concorda em usar nossos serviços apenas para fins legais e de acordo com estes Termos. É proibido:</Paragraph>
              <List>
                <ListItem>Usar os serviços para atividades ilegais ou não autorizadas</ListItem>
                <ListItem>Interferir com o funcionamento dos serviços</ListItem>
                <ListItem>Tentar acessar contas de outros usuários</ListItem>
                <ListItem>Transmitir vírus, malware ou código malicioso</ListItem>
                <ListItem>Fazer engenharia reversa dos nossos sistemas</ListItem>
                <ListItem>Usar os serviços para spam ou comunicações não solicitadas</ListItem>
                <ListItem>Violar direitos de propriedade intelectual</ListItem>
                <ListItem>Coletar informações de outros usuários sem autorização</ListItem>
              </List>
            </Section>

            <Section>
              <SectionTitle>6. Propriedade Intelectual</SectionTitle>
              <SectionSubtitle>6.1 Nossa Propriedade</SectionSubtitle>
              <Paragraph>
                Todos os direitos de propriedade intelectual relacionados aos nossos serviços, incluindo software, algoritmos, designs, textos, gráficos e marcas, são de nossa propriedade ou licenciados para nós.
              </Paragraph>

              <SectionSubtitle>6.2 Sua Propriedade</SectionSubtitle>
              <Paragraph>
                Você mantém a propriedade de todo o conteúdo que fornece através dos nossos serviços. Ao usar nossos serviços, você nos concede uma licença limitada para usar, processar e armazenar seu conteúdo conforme necessário para fornecer os serviços.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>7. Pagamentos e Faturamento</SectionTitle>
              <SectionSubtitle>7.1 Preços</SectionSubtitle>
              <Paragraph>
                Os preços dos nossos serviços estão disponíveis em nosso site e podem ser alterados a qualquer momento. Alterações de preços não afetarão contratos existentes durante o período de vigência.
              </Paragraph>

              <SectionSubtitle>7.2 Pagamento</SectionSubtitle>
              <Paragraph>
                Os pagamentos devem ser feitos conforme acordado no contrato de serviço. Atrasos no pagamento podem resultar na suspensão dos serviços.
              </Paragraph>

              <SectionSubtitle>7.3 Reembolsos</SectionSubtitle>
              <Paragraph>
                Políticas de reembolso são definidas em cada contrato de serviço específico e podem variar conforme o tipo de serviço contratado.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>8. Limitação de Responsabilidade</SectionTitle>
              <Paragraph>
                Na máxima extensão permitida por lei, a Mundo dos Bots não será responsável por:
              </Paragraph>
              <List>
                <ListItem>Danos indiretos, incidentais ou consequenciais</ListItem>
                <ListItem>Perda de lucros, dados ou oportunidades de negócio</ListItem>
                <ListItem>Interrupções temporárias dos serviços</ListItem>
                <ListItem>Ações de terceiros ou falhas de sistemas externos</ListItem>
                <ListItem>Uso inadequado dos serviços pelo cliente</ListItem>
              </List>

              <HighlightBox>
                <strong>Importante:</strong> Nossa responsabilidade total não excederá o valor pago pelos serviços nos 12 meses anteriores ao evento que deu origem à reivindicação.
              </HighlightBox>
            </Section>

            <Section>
              <SectionTitle>9. Garantias e Disponibilidade</SectionTitle>
              <SectionSubtitle>9.1 Disponibilidade do Serviço</SectionSubtitle>
              <Paragraph>
                Embora nos esforcemos para manter nossos serviços disponíveis 24/7, não garantimos disponibilidade ininterrupta. Podemos realizar manutenções programadas e não programadas.
              </Paragraph>

              <SectionSubtitle>9.2 Garantias</SectionSubtitle>
              <Paragraph>
                Nossos serviços são fornecidos "como estão" e "conforme disponível". Não oferecemos garantias expressas ou implícitas, exceto aquelas especificamente mencionadas em contratos de serviço.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>10. Privacidade e Proteção de Dados</SectionTitle>
              <Paragraph>
                O tratamento de dados pessoais é regido por nossa Política de Privacidade, que faz parte integrante destes Termos. Ao usar nossos serviços, você concorda com o tratamento de seus dados conforme descrito na Política de Privacidade.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>11. Modificações dos Termos</SectionTitle>
              <Paragraph>
                Reservamo-nos o direito de modificar estes Termos a qualquer momento. Modificações significativas serão comunicadas através de nosso site ou por e-mail. O uso continuado dos serviços após as modificações constitui aceitação dos novos Termos.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>12. Rescisão</SectionTitle>
              <SectionSubtitle>12.1 Rescisão pelo Usuário</SectionSubtitle>
              <Paragraph>
                Você pode encerrar sua conta e parar de usar nossos serviços a qualquer momento, seguindo os procedimentos estabelecidos em seu contrato de serviço.
              </Paragraph>

              <SectionSubtitle>12.2 Rescisão pela Empresa</SectionSubtitle>
              <Paragraph>
                Podemos suspender ou encerrar seus serviços imediatamente, sem aviso prévio, em caso de violação destes Termos ou por motivos de segurança.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>13. Lei Aplicável e Jurisdição</SectionTitle>
              <Paragraph>
                Estes Termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos tribunais competentes do Brasil, com jurisdição na cidade onde a empresa tem sua sede.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>14. Disposições Gerais</SectionTitle>
              <SectionSubtitle>14.1 Integralidade</SectionSubtitle>
              <Paragraph>
                Estes Termos, juntamente com nossa Política de Privacidade e contratos de serviço específicos, constituem o acordo integral entre você e a Mundo dos Bots.
              </Paragraph>

              <SectionSubtitle>14.2 Divisibilidade</SectionSubtitle>
              <Paragraph>
                Se qualquer disposição destes Termos for considerada inválida ou inaplicável, as demais disposições permanecerão em pleno vigor.
              </Paragraph>

              <SectionSubtitle>14.3 Renúncia</SectionSubtitle>
              <Paragraph>
                A falha em fazer cumprir qualquer disposição destes Termos não constituirá renúncia a tal disposição.
              </Paragraph>
            </Section>

            <ContactInfo>
              <ContactTitle>Entre em Contato</ContactTitle>
              <Paragraph>
                Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
              </Paragraph>
              <ContactItem><strong>E-mail:</strong> legal@mundodosbots.com.br</ContactItem>
              <ContactItem><strong>Telefone:</strong> +55 66 98444-3050</ContactItem>
              <ContactItem><strong>WhatsApp:</strong> +55 66 98444-3050</ContactItem>
              <ContactItem><strong>Endereço:</strong> Mundo dos Bots, Brasil</ContactItem>
            </ContactInfo>
          </Content>
        </ContentWrapper>
      </TermsContainer>
    </>
  );
};

export default TermsOfUse;
