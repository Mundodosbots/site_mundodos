import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { LanguageProvider } from './contexts/LanguageContext';
import { SiteSettingsProvider } from './contexts/SiteSettingsContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButtonComponent from './components/WhatsAppButton';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Services from './pages/Services';
import Franchise from './pages/Franchise';
import About from './pages/About';
import Contact from './pages/Contact';
import WorkWithUs from './pages/WorkWithUs';
import SolutionsByObjective from './pages/SolutionsByObjective';
import SolutionsBySector from './pages/SolutionsBySector';
import SolutionsByProduct from './pages/SolutionsByProduct';
import LandingPage from './pages/LandingPage';
import LandingPageTest from './pages/LandingPageTest';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminSettings from './pages/AdminSettings';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';

function App() {
  return (
    <LanguageProvider>
      <SiteSettingsProvider>
        <div className="App">
      <Helmet>
        <title>Mundo dos Bots - Especialistas em Chatbots e Automação</title>
        <meta name="description" content="Transforme sua comunicação com inteligência artificial. Soluções completas em chatbots para WhatsApp, sites e automação de marketing." />
        <meta name="keywords" content="chatbot, automação, WhatsApp, inteligência artificial, marketing digital, atendimento automatizado, franquia digital" />
        <link rel="canonical" href="https://mundodosbots.com.br/2025" />
      </Helmet>
      
      <Routes>
        {/* Rotas do Site Principal */}
        <Route path="/" element={
          <>
            <Header />
            <main>
              <Home />
            </main>
            <Footer />
            <WhatsAppButtonComponent />
          </>
        } />
        
        <Route path="/landing" element={
          <>
            <LandingPage />
          </>
        } />
        
        <Route path="/landing-test" element={
          <>
            <LandingPageTest />
          </>
        } />
        
        <Route path="/blog" element={
          <>
            <Header />
            <main>
              <Blog />
            </main>
            <Footer />
            <WhatsAppButtonComponent />
          </>
        } />
        
        <Route path="/blog/:slug" element={
          <>
            <Header />
            <main>
              <BlogPost />
            </main>
            <Footer />
            <WhatsAppButtonComponent />
          </>
        } />
        
        <Route path="/servicos" element={
          <>
            <Header />
            <main>
              <Services />
            </main>
            <Footer />
            <WhatsAppButtonComponent />
          </>
        } />
        
        <Route path="/franquia" element={
          <>
            <Header />
            <main>
              <Franchise />
            </main>
            <Footer />
            <WhatsAppButtonComponent />
          </>
        } />
        
        <Route path="/quem-somos" element={
          <>
            <Header />
            <main>
              <About />
            </main>
            <Footer />
            <WhatsAppButtonComponent />
          </>
        } />
        
        <Route path="/contato" element={
          <>
            <Header />
            <main>
              <Contact />
            </main>
            <Footer />
            <WhatsAppButtonComponent />
          </>
        } />
        
        <Route path="/politica-privacidade" element={
          <>
            <Header />
            <main>
              <PrivacyPolicy />
            </main>
            <Footer />
            <WhatsAppButtonComponent />
          </>
        } />
        
        <Route path="/termos-uso" element={
          <>
            <Header />
            <main>
              <TermsOfUse />
            </main>
            <Footer />
            <WhatsAppButtonComponent />
          </>
        } />
        
                            <Route path="/trabalhe-conosco" element={
                      <>
                        <Header />
                        <main>
                          <WorkWithUs />
                        </main>
                        <Footer />
                        <WhatsAppButtonComponent />
                      </>
                    } />
                    
                    {/* Rotas para Soluções por Objetivo */}
                    <Route path="/solucoes/aumentar-vendas" element={
                      <>
                        <Header />
                        <main>
                          <SolutionsByObjective objective="aumentar-vendas" />
                        </main>
                        <Footer />
                        <WhatsAppButtonComponent />
                      </>
                    } />
                    <Route path="/solucoes/melhorar-atendimento" element={
                      <>
                        <Header />
                        <main>
                          <SolutionsByObjective objective="melhorar-atendimento" />
                        </main>
                        <Footer />
                        <WhatsAppButtonComponent />
                      </>
                    } />
                    <Route path="/solucoes/automatizar-marketing" element={
                      <>
                        <Header />
                        <main>
                          <SolutionsByObjective objective="automatizar-marketing" />
                        </main>
                        <Footer />
                        <WhatsAppButtonComponent />
                      </>
                    } />
                    <Route path="/solucoes/reduzir-custos" element={
                      <>
                        <Header />
                        <main>
                          <SolutionsByObjective objective="reduzir-custos" />
                        </main>
                        <Footer />
                        <WhatsAppButtonComponent />
                      </>
                    } />
                    
                    {/* Rotas para Soluções por Setor */}
                    <Route path="/solucoes/ecommerce" element={
                      <>
                        <Header />
                        <main>
                          <SolutionsBySector sector="ecommerce" />
                        </main>
                        <Footer />
                        <WhatsAppButtonComponent />
                      </>
                    } />
                    <Route path="/solucoes/imobiliarias" element={
                      <>
                        <Header />
                        <main>
                          <SolutionsBySector sector="imobiliarias" />
                        </main>
                        <Footer />
                        <WhatsAppButtonComponent />
                      </>
                    } />
                    <Route path="/solucoes/clinicas-consultorios" element={
                      <>
                        <Header />
                        <main>
                          <SolutionsBySector sector="clinicas-consultorios" />
                        </main>
                        <Footer />
                        <WhatsAppButtonComponent />
                      </>
                    } />
                    <Route path="/solucoes/educacao" element={
                      <>
                        <Header />
                        <main>
                          <SolutionsBySector sector="educacao" />
                        </main>
                        <Footer />
                        <WhatsAppButtonComponent />
                      </>
                    } />
                    <Route path="/solucoes/industria" element={
                      <>
                        <Header />
                        <main>
                          <SolutionsBySector sector="industria" />
                        </main>
                        <Footer />
                        <WhatsAppButtonComponent />
                      </>
                    } />
                    
                    {/* Rotas para Soluções por Produto */}
                    <Route path="/solucoes/chatbots-whatsapp" element={
                      <>
                        <Header />
                        <main>
                          <SolutionsByProduct product="chatbots-whatsapp" />
                        </main>
                        <Footer />
                        <WhatsAppButtonComponent />
                      </>
                    } />
                    <Route path="/solucoes/chatbots-sites" element={
                      <>
                        <Header />
                        <main>
                          <SolutionsByProduct product="chatbots-sites" />
                        </main>
                        <Footer />
                        <WhatsAppButtonComponent />
                      </>
                    } />
                    <Route path="/solucoes/automacao-agendamentos" element={
                      <>
                        <Header />
                        <main>
                          <SolutionsByProduct product="automacao-agendamentos" />
                        </main>
                        <Footer />
                        <WhatsAppButtonComponent />
                      </>
                    } />
                    <Route path="/solucoes/qualificacao-leads" element={
                      <>
                        <Header />
                        <main>
                          <SolutionsByProduct product="qualificacao-leads" />
                        </main>
                        <Footer />
                        <WhatsAppButtonComponent />
                      </>
                    } />
        
        {/* Rotas Administrativas - Sem Header/Footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/settings" 
          element={
            <ProtectedRoute>
              <AdminSettings />
            </ProtectedRoute>
          } 
        />
      </Routes>
        </div>
      </SiteSettingsProvider>
    </LanguageProvider>
  );
}

export default App;
