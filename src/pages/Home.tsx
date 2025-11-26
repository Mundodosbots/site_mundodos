import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMessageCircle, FiSmartphone, FiTrendingUp, FiStar } from 'react-icons/fi';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 120px 0 80px;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--secondary-color);
  color: white;
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: var(--transition);
  box-shadow: var(--shadow-medium);
  
  &:hover {
    background: #e55a2b;
    transform: translateY(-3px);
    box-shadow: var(--shadow-heavy);
    color: white;
  }
`;

const ServicesSection = styled.section`
  padding: 80px 0;
  background: var(--background-gray);
`;

const ServiceCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  text-align: center;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-medium);
  }
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  
  svg {
    font-size: 2rem;
    color: white;
  }
`;

const BlogSection = styled.section`
  padding: 80px 0;
`;

const BlogCard = styled(motion.div)`
  background: white;
  border-radius: var(--border-radius-large);
  overflow: hidden;
  box-shadow: var(--shadow-light);
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-medium);
  }
`;

const BlogImage = styled.div`
  height: 200px;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>');
  }
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogCategory = styled.span`
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const BlogDate = styled.span`
  color: var(--text-light);
  font-size: 0.9rem;
  margin-left: 1rem;
`;

const TestimonialsSection = styled.section`
  padding: 80px 0;
  background: var(--background-gray);
`;

const TestimonialCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  text-align: center;
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 4rem;
    color: var(--primary-color);
    font-family: serif;
  }
`;

const Stars = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
  
  svg {
    color: #ffd700;
  }
`;

const CTASection = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  text-align: center;
`;

const CTACard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  padding: 3rem;
  border-radius: var(--border-radius-large);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;



const Home: React.FC = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: <FiMessageCircle />,
      title: t('home.services.chatbots.title'),
      description: t('home.services.chatbots.description')
    },
    {
      icon: <FiSmartphone />,
      title: t('home.services.marketing.title'),
      description: t('home.services.marketing.description')
    },
    {
      icon: <FiTrendingUp />,
      title: t('home.services.leads.title'),
      description: t('home.services.leads.description')
    }
  ];

  const blogPosts = [
    {
      title: t('home.blog.posts.post1.title'),
      category: t('home.blog.posts.post1.category'),
      date: t('home.blog.posts.post1.date'),
      excerpt: t('home.blog.posts.post1.excerpt')
    },
    {
      title: t('home.blog.posts.post2.title'),
      category: t('home.blog.posts.post2.category'),
      date: t('home.blog.posts.post2.date'),
      excerpt: t('home.blog.posts.post2.excerpt')
    },
    {
      title: t('home.blog.posts.post3.title'),
      category: t('home.blog.posts.post3.category'),
      date: t('home.blog.posts.post3.date'),
      excerpt: t('home.blog.posts.post3.excerpt')
    }
  ];

  const testimonials = [
    {
      name: t('home.testimonials.testimonial1.name'),
      company: t('home.testimonials.testimonial1.company'),
      text: t('home.testimonials.testimonial1.text'),
      rating: 5
    },
    {
      name: t('home.testimonials.testimonial2.name'),
      company: t('home.testimonials.testimonial2.company'),
      text: t('home.testimonials.testimonial2.text'),
      rating: 5
    },
    {
      name: t('home.testimonials.testimonial3.name'),
      company: t('home.testimonials.testimonial3.company'),
      text: t('home.testimonials.testimonial3.text'),
      rating: 5
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('home.meta.title')}</title>
        <meta name="description" content={t('home.meta.description')} />
      </Helmet>

      <HeroSection>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>
              {t('home.hero.title')}
            </HeroTitle>
            <HeroSubtitle>
              {t('home.hero.subtitle')}
            </HeroSubtitle>
            <CTAButton to="/contato">
              {t('home.hero.cta')}
              <FiArrowRight />
            </CTAButton>
          </motion.div>
        </HeroContent>
      </HeroSection>

      <ServicesSection>
        <div className="container">
          <div className="section-title">
            <h2>{t('home.services.title')}</h2>
            <p>{t('home.services.subtitle')}</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <ServiceIcon>
                  {service.icon}
                </ServiceIcon>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </ServiceCard>
            ))}
          </div>
        </div>
      </ServicesSection>

      <BlogSection>
        <div className="container">
          <div className="section-title">
            <h2>{t('home.blog.title')}</h2>
            <p>{t('home.blog.subtitle')}</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {blogPosts.map((post, index) => (
              <BlogCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <BlogImage />
                <BlogContent>
                  <div style={{ marginBottom: '1rem' }}>
                    <BlogCategory>{post.category}</BlogCategory>
                    <BlogDate>{post.date}</BlogDate>
                  </div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>{post.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    {post.excerpt}
                  </p>
                  <Link to="/blog" style={{ color: 'var(--primary-color)', fontWeight: '500' }}>
                    {t('home.blog.readMore')} <FiArrowRight style={{ display: 'inline', marginLeft: '0.5rem' }} />
                  </Link>
                </BlogContent>
              </BlogCard>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <CTAButton to="/blog">
              {t('home.blog.viewAll')}
              <FiArrowRight />
            </CTAButton>
          </div>
        </div>
      </BlogSection>

      <TestimonialsSection>
        <div className="container">
          <div className="section-title">
            <h2>{t('home.testimonials.title')}</h2>
            <p>{t('home.testimonials.subtitle')}</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Stars>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} />
                  ))}
                </Stars>
                <p style={{ marginBottom: '1.5rem', fontStyle: 'italic' }}>{testimonial.text}</p>
                <div>
                  <strong>{testimonial.name}</strong>
                  <br />
                  <span style={{ color: 'var(--text-light)' }}>{testimonial.company}</span>
                </div>
              </TestimonialCard>
            ))}
          </div>
        </div>
      </TestimonialsSection>

      <CTASection>
        <div className="container">
          <CTACard
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'white' }}>
              {t('home.franchise.title')}
            </h2>
            <p style={{ marginBottom: '2rem', fontSize: '1.1rem', opacity: 0.9 }}>
              {t('home.franchise.subtitle')}
            </p>
            <CTAButton to="/franquia" style={{ background: 'var(--secondary-color)' }}>
              {t('home.franchise.cta')}
              <FiArrowRight />
            </CTAButton>
          </CTACard>
        </div>
      </CTASection>

    </>
  );
};

export default Home;
