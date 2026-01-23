import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Terminal, Cpu, Network, Code, Briefcase, GraduationCap, Mail, MapPin, Phone, Github, Linkedin, ExternalLink, ArrowLeft, Award, Heart, Users, HeartPulse, Package, Server, Building2, Rocket, Globe, Database, Cloud, Container, Boxes, Workflow, Zap, FileCode, Layers, Search, Flame, Bird, Box, Settings, HardDrive, Instagram, X, Clock } from 'lucide-react';

const ToptalBadge = () => (
  <div className="w-[140px]" style={{ fontFamily: 'proxima-nova, Arial, sans-serif' }}>
    <style>{`@import"https://use.typekit.net/kmj5qkr.css";`}</style>
    <div className="inline-block bg-[#25a9ef] p-[4px]" style={{ clipPath: 'polygon(50% 0, 100% 24%, 100% 76%, 50% 100%, 0 76%, 0 24%)' }}>
      <div 
        className="w-[132px] py-4 pb-6 flex flex-col items-center gap-1.5 text-white text-center"
        style={{ 
          background: 'linear-gradient(153deg, #0667ff 18%, #204ecf 40%, #0f256e 80%)',
          clipPath: 'polygon(50% 0, 100% 24%, 100% 76%, 50% 100%, 0 76%, 0 24%)',
          boxShadow: '0 28px 50px rgba(6,30,96,.35)'
        }}
      >
        <svg width={44} viewBox="0 0 60 17" xmlns="http://www.w3.org/2000/svg">
          <path d="m20.85 6.38 6.06-.89 2.72-5.49 2.71 5.49 6.06.89-4.39 4.28 1.04 6.03-5.42-2.85-5.43 2.85 1.04-6.03zm33.06 7.17 1.85-.27.82-1.67.83 1.67 1.84.27-1.33 1.31.31 1.83-1.65-.87-1.66.87.32-1.83zm-3.38-3.01-3.61-.52-1.61-3.26-1.62 3.26-3.6.52 2.6 2.55-.61 3.59 3.23-1.69 3.21 1.69-.61-3.59zm-45.19 3.01-1.85-.27-.82-1.67-.83 1.67-1.84.27 1.33 1.31-.31 1.83 1.65-.87 1.65.87-.31-1.83zm3.38-3.01 3.61-.52 1.61-3.26 1.61 3.26 3.61.52-2.6 2.55.61 3.59-3.23-1.69-3.22 1.69.62-3.59z" fill="#fff"/>
        </svg>
        <h3 className="m-0 text-[13px] font-bold leading-tight">TOP 3% TALENT</h3>
        <div className="w-16 h-px bg-[#25a9ef]"></div>
        <span className="text-[11px] opacity-80 -mb-1">Vetted by</span>
        <svg viewBox="0 0 108 30" width={70} xmlns="http://www.w3.org/2000/svg">
          <g clipRule="evenodd" fill="#fff" fillRule="evenodd">
            <path d="m8.11 0 6.71 6.7c.05.05.09.1.15.15l5.85 5.85-9.51 9.46 4.35 4.36-2.91 2.89-6.66-6.66c-.08-.07-.16-.15-.24-.23l-5.85-5.84 9.48-9.43-4.32-4.31zm4.25 10.5c-.09-.02-.18-.02-.26 0-.09.03-.16.07-.32.22l-5.41 5.39c-.16.16-.2.23-.22.31-.03.09-.03.18 0 .26.02.09.07.17.22.32l1.72 1.72c.15.15.22.19.31.22.09.02.17.02.26 0 .08-.03.16-.07.31-.22l5.41-5.39c.15-.16.2-.23.22-.32.02-.08.02-.17 0-.26-.03-.08-.07-.16-.22-.31l-1.72-1.72c-.15-.15-.23-.2-.31-.22z"/>
            <path d="m46.27 7.45h-6.41v3.9h5.65v3.41h-5.65v5.31h-4.11v-16.04h10.52zm2.03 12.62v-16.04h4.12v12.63h6.06v3.41zm16.65.27c-4.72 0-7.49-3.25-7.49-8.3 0-5.04 2.77-8.3 7.49-8.3s7.49 3.25 7.49 8.3c0 5.04-2.77 8.3-7.49 8.3zm0-3.42c2.08 0 3.35-1.69 3.35-4.88 0-3.2-1.27-4.88-3.35-4.88s-3.35 1.68-3.35 4.88c0 3.19 1.27 4.88 3.35 4.88zm22.64 3.15-2.39-9.37-2.39 9.37h-4.33l-4.11-16.04h4.15l2.36 10.41 2.67-10.41h3.28l2.66 10.41 2.36-10.41h4.15l-4.11 16.04zm-51.92-16.04v3.37h-4.2v12.67h-4.12v-12.67h-4.2v-3.37zm65.71 0h4.11v16.04h-4.11z"/>
          </g>
        </svg>
      </div>
    </div>
  </div>
);

const getTechIcon = (tech: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'Python': <Flame className="w-3.5 h-3.5" />,
    'JavaScript': <FileCode className="w-3.5 h-3.5" />,
    'GO': <Zap className="w-3.5 h-3.5" />,
    'SQL': <Database className="w-3.5 h-3.5" />,
    'Dart': <Bird className="w-3.5 h-3.5" />,
    'Django': <Layers className="w-3.5 h-3.5" />,
    'FastAPI': <Zap className="w-3.5 h-3.5" />,
    'Flask': <Flame className="w-3.5 h-3.5" />,
    'Scrapy': <Search className="w-3.5 h-3.5" />,
    'React': <Workflow className="w-3.5 h-3.5" />,
    'Svelte': <Zap className="w-3.5 h-3.5" />,
    'Flutter': <Bird className="w-3.5 h-3.5" />,
    'PostgreSQL': <Database className="w-3.5 h-3.5" />,
    'MySQL': <Database className="w-3.5 h-3.5" />,
    'ElasticSearch': <Search className="w-3.5 h-3.5" />,
    'Redis': <Zap className="w-3.5 h-3.5" />,
    'MongoDB': <HardDrive className="w-3.5 h-3.5" />,
    'AWS': <Cloud className="w-3.5 h-3.5" />,
    'GCP': <Cloud className="w-3.5 h-3.5" />,
    'Kubernetes': <Boxes className="w-3.5 h-3.5" />,
    'Terraform': <Settings className="w-3.5 h-3.5" />,
    'Ansible': <Settings className="w-3.5 h-3.5" />,
    'HELM': <Box className="w-3.5 h-3.5" />,
    'Docker': <Container className="w-3.5 h-3.5" />,
  };
  return iconMap[tech] || <Code className="w-3.5 h-3.5" />;
};
import { cvData } from '@/data/cv';
import { GlitchText, NeonCard, CyberButton, SectionHeader, NameGlitch } from '@/components/CyberpunkUI';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { CyberpunkBackground } from '@/components/CyberpunkBackground';
const avatarImage = '/images/cyberpunk_portrait_of_bearded_man_with_glasses.webp';

export default function About() {
  const [showHirePopup, setShowHirePopup] = useState(false);

  useEffect(() => {
    document.title = 'Sergey Bershadsky | Tech Lead & Solution Architect | Python Django Expert';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const descriptionContent = 'Sergey Bershadsky - Tech Lead and Solution Architect with 20+ years of experience. Expert in Python, Django, AWS, MedTech, and ERP systems. Available for consulting and technical leadership roles.';
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptionContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descriptionContent;
      document.head.appendChild(meta);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const keywordsContent = 'Sergey Bershadsky, Bershadsky, Tech Lead, Solution Architect, Python Developer, Django Expert, AWS, MedTech, ERP, Toptal, Software Engineer, CTO, Startup Architect';
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywordsContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = keywordsContent;
      document.head.appendChild(meta);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Sergey Bershadsky | Tech Lead & Solution Architect');
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', descriptionContent);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', 'Sergey Bershadsky | Tech Lead & Solution Architect');

    const existingSchema = document.querySelector('script[type="application/ld+json"]');
    if (existingSchema) existingSchema.remove();
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Sergey Bershadsky",
      "alternateName": ["Sergey", "Bershadsky", "Sergio Bershadsky"],
      "jobTitle": "Tech Lead & Solution Architect",
      "description": descriptionContent,
      "url": "https://bershadsky.dev/about",
      "email": "sergio.bershadsky@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lisbon",
        "addressCountry": "Portugal"
      },
      "sameAs": [
        "https://github.com/sergio-bershadsky/ai",
        "https://linkedin.com/in/bershadsky",
        "https://instagram.com/bershadsky.dev",
        "https://talent.toptal.com/resume/developers/sergey-nikitin"
      ],
      "knowsAbout": ["Python", "Django", "FastAPI", "AWS", "PostgreSQL", "Kubernetes", "MedTech", "ERP", "Solution Architecture"],
      "worksFor": {
        "@type": "Organization",
        "name": "Toptal"
      }
    };
    
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.textContent = JSON.stringify(schema);
    document.head.appendChild(scriptTag);

    return () => {
      const schemaScript = document.querySelector('script[type="application/ld+json"]');
      if (schemaScript) schemaScript.remove();
    };
  }, []);

  return (
    <div className="min-h-screen text-foreground relative overflow-x-hidden">
      <CyberpunkBackground />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-display font-bold">RETURN_TO_BASE</span>
          </Link>
          <div className="font-mono text-xs text-muted-foreground hidden md:block">
            SECTOR: PROFILE // ID: SERGEY_B
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-20">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block px-3 py-1 border border-secondary/50 text-secondary font-mono text-sm bg-secondary/5 backdrop-blur-sm">
              SYSTEM_READY_V2.0.25
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-tight">
              <NameGlitch />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                BERSHADSKY
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground font-mono whitespace-nowrap">
              &lt; {cvData.personal.title} /&gt;
            </p>
            {cvData.personal.subtitle && (
              <a 
                href={cvData.personal.toptalUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-mono text-secondary hover:text-primary transition-colors group"
              >
                <span className="px-3 py-1 border border-secondary/50 bg-secondary/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
                  {cvData.personal.subtitle}
                </span>
                <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
              </a>
            )}
            <p className="text-lg max-w-xl text-foreground/80 leading-relaxed">
              {cvData.personal.summary}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <CyberButton size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                INITIATE_CONTACT
              </CyberButton>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-[spin_10s_linear_infinite]" />
              <div className="absolute -inset-4 rounded-full border border-secondary/20 animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-accent/50 shadow-[0_0_50px_rgba(147,51,234,0.3)]">
                 <img 
                  src={avatarImage} 
                  alt="Cyberpunk Avatar" 
                  className="w-full h-full object-cover filter contrast-125 hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Floating Tech Badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -right-8 top-10 bg-card/90 border border-secondary p-3 backdrop-blur-md"
              >
                <Cpu className="w-6 h-6 text-secondary" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -left-8 bottom-20 bg-card/90 border border-primary p-3 backdrop-blur-md"
              >
                <Network className="w-6 h-6 text-primary" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-background/50 border-y border-white/5">
        <div className="container mx-auto px-4">
          <SectionHeader title="CORE_MODULES" subtitle="Technical Competencies" />
          
          <div className="grid md:grid-cols-4 gap-6">
            <NeonCard variant="primary">
              <Code className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3 font-display">LANGUAGES</h3>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.languages.map(skill => (
                  <span key={skill} className="inline-flex items-center gap-1.5 px-2 py-1 bg-primary/10 border border-primary/30 text-xs font-mono text-primary-foreground/80">
                    {getTechIcon(skill)}
                    {skill}
                  </span>
                ))}
              </div>
            </NeonCard>
            
            <NeonCard variant="secondary">
              <Terminal className="w-8 h-8 text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-3 font-display">FRAMEWORKS</h3>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.frameworks.map(skill => (
                  <span key={skill} className="inline-flex items-center gap-1.5 px-2 py-1 bg-secondary/10 border border-secondary/30 text-xs font-mono text-secondary">
                    {getTechIcon(skill)}
                    {skill}
                  </span>
                ))}
              </div>
            </NeonCard>

            <NeonCard variant="accent">
              <Network className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-3 font-display">DEVOPS</h3>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.devops.map(skill => (
                  <span key={skill} className="inline-flex items-center gap-1.5 px-2 py-1 bg-accent/10 border border-accent/30 text-xs font-mono text-accent-foreground/80">
                    {getTechIcon(skill)}
                    {skill}
                  </span>
                ))}
              </div>
            </NeonCard>

            <NeonCard variant="primary">
              <Cpu className="w-8 h-8 text-white mb-4" />
              <h3 className="text-xl font-bold mb-3 font-display">DATA</h3>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.databases.map(skill => (
                  <span key={skill} className="inline-flex items-center gap-1.5 px-2 py-1 bg-white/10 border border-white/30 text-xs font-mono text-white/80">
                    {getTechIcon(skill)}
                    {skill}
                  </span>
                ))}
              </div>
            </NeonCard>
          </div>
        </div>
      </section>

      {/* Journey Section - Pinterest Waterfall */}
      <section id="experience" className="py-20 relative">
        <div className="container mx-auto px-4">
          <SectionHeader title="THE_JOURNEY" subtitle="My Story" />

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {cvData.journey.map((chapter, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="break-inside-avoid"
              >
                <div className={`group relative p-5 border rounded-lg bg-black/40 backdrop-blur-sm transition-all duration-300 hover:bg-black/60 ${
                  chapter.color === 'primary' ? 'border-primary/30 hover:border-primary/60 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]' :
                  chapter.color === 'secondary' ? 'border-secondary/30 hover:border-secondary/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]' :
                  'border-accent/30 hover:border-accent/60 hover:shadow-[0_0_30px_rgba(147,51,234,0.15)]'
                }`}>
                  {/* Chapter Title */}
                  <h3 className={`text-lg font-display font-bold mb-3 flex items-center gap-2 ${
                    chapter.color === 'primary' ? 'text-primary' :
                    chapter.color === 'secondary' ? 'text-secondary' :
                    'text-accent'
                  }`}>
                    {chapter.icon === 'heart-pulse' && <HeartPulse className="w-5 h-5" />}
                    {chapter.icon === 'package' && <Package className="w-5 h-5" />}
                    {chapter.chapter}
                  </h3>

                  {/* Companies & Tech - Same size tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {chapter.companies.map((company, i) => (
                      <span key={`c-${i}`} className="text-xs font-mono px-2 py-1 bg-white/10 border border-white/20 text-white">
                        {company}
                      </span>
                    ))}
                    {chapter.via && (
                      <span className="text-xs font-mono px-2 py-1 bg-primary/10 border border-primary/30 text-primary">
                        {chapter.via}
                      </span>
                    )}
                    {chapter.clients?.map((client, i) => (
                      <span key={`cl-${i}`} className="text-xs font-mono px-2 py-1 bg-white/5 border border-white/10 text-white/60">
                        {client}
                      </span>
                    ))}
                    {chapter.tech?.map((t, i) => (
                      <span key={`t-${i}`} className={`text-xs font-mono px-2 py-1 ${
                        chapter.color === 'primary' ? 'bg-primary/5 border border-primary/20 text-primary/80' :
                        chapter.color === 'secondary' ? 'bg-secondary/5 border border-secondary/20 text-secondary/80' :
                        'bg-accent/5 border border-accent/20 text-accent/80'
                      }`}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Story */}
                  <p className="text-[#d1d5db] text-solid text-sm leading-relaxed mb-3">
                    {chapter.story}
                  </p>

                  {/* Highlight */}
                  <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono font-bold ${
                    chapter.color === 'primary' ? 'bg-primary/20 text-primary' :
                    chapter.color === 'secondary' ? 'bg-secondary/20 text-secondary' :
                    'bg-accent/20 text-accent'
                  }`}>
                    {chapter.highlight}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       {/* Education Section */}
      <section className="py-20 bg-background/50 border-y border-white/5">
        <div className="container mx-auto px-4">
          <SectionHeader title="DATA_UPLOAD" subtitle="Education" />
          <div className="grid md:grid-cols-2 gap-6">
            {cvData.education.map((edu, index) => (
              <NeonCard key={index} variant="secondary">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 rounded border border-secondary/30">
                    <GraduationCap className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">{edu.degree}</h3>
                    <p className="text-secondary font-mono">{edu.school}</p>
                    <p className="text-sm text-muted-foreground mt-1">{edu.period}</p>
                  </div>
                </div>
              </NeonCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <SectionHeader title="SIGNAL_RECEIVED" subtitle="What Others Say" />
          <TestimonialsCarousel testimonials={cvData.testimonials} />
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-background/50 border-y border-white/5">
        <div className="container mx-auto px-4">
          <SectionHeader title="VERIFIED_CREDENTIALS" subtitle="Certifications" />
          <div className="grid md:grid-cols-3 gap-6">
            {cvData.certifications.map((cert, index) => (
              <NeonCard key={index} variant="accent">
                <div className="flex flex-col items-center text-center">
                  {cert.issuer === 'TopTal' ? (
                    <div className="mb-4">
                      <ToptalBadge />
                    </div>
                  ) : (
                    <div className="p-4 bg-accent/10 rounded-full border border-accent/30 mb-4">
                      <Award className="w-8 h-8 text-accent" />
                    </div>
                  )}
                  <h3 className="text-lg font-bold font-display text-white mb-2">{cert.name}</h3>
                  <p className="text-accent font-mono text-sm">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
                </div>
              </NeonCard>
            ))}
          </div>
        </div>
      </section>

      {/* Non-Profit Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <SectionHeader title="COMMUNITY_IMPACT" subtitle="Non-Profit & Community" />
          <div className="grid md:grid-cols-2 gap-8">
            {cvData.nonProfit.map((org, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <NeonCard variant={index === 0 ? 'primary' : 'secondary'} className="h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded border ${index === 0 ? 'bg-primary/10 border-primary/30' : 'bg-secondary/10 border-secondary/30'}`}>
                      {index === 0 ? <Users className="w-6 h-6 text-primary" /> : <Heart className="w-6 h-6 text-secondary" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display text-white">{org.name}</h3>
                      <p className={`font-mono text-sm ${index === 0 ? 'text-primary' : 'text-secondary'}`}>{org.role}</p>
                    </div>
                  </div>
                  <p className="text-foreground/80 leading-relaxed">{org.description}</p>
                </NeonCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <NeonCard className="p-10 md:p-16 text-center bg-black/60">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
              READY_TO_DEPLOY?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Available for architectural consultation, high-stakes MVP delivery, and technical leadership roles.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
              <a href="https://github.com/sergio-bershadsky/ai" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 py-4 border border-primary/50 hover:bg-primary/10 transition-colors group">
                <Github className="w-5 h-5 text-primary group-hover:text-white" />
                <span className="font-mono text-lg">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/bershadsky" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 py-4 border border-secondary/50 hover:bg-secondary/10 transition-colors group">
                <Linkedin className="w-5 h-5 text-secondary group-hover:text-white" />
                <span className="font-mono text-lg">LinkedIn</span>
              </a>
              <a href="https://instagram.com/bershadsky.dev" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 py-4 border border-accent/50 hover:bg-accent/10 transition-colors group">
                <Instagram className="w-5 h-5 text-accent group-hover:text-white" />
                <span className="font-mono text-lg">Instagram</span>
              </a>
            </div>

            <CyberButton size="lg" className="w-full md:w-auto px-16 text-xl" onClick={() => {
              // Track goal in Google Analytics
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'hire_button_click', {
                  event_category: 'engagement',
                  event_label: 'HIRE_ME_NOW',
                  value: 1
                });
              }
              setShowHirePopup(true);
            }}>
              HIRE_ME_NOW
            </CyberButton>

            {showHirePopup && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                onClick={() => setShowHirePopup(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-w-md mx-4 p-8 bg-black border border-primary/50 rounded-lg shadow-[0_0_50px_rgba(236,72,153,0.3)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setShowHirePopup(false)}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="text-center">
                    <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-display font-bold text-white mb-4">
                      AVAILABILITY_STATUS
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      Appreciate you reaching out! I can currently take on up to <span className="text-primary font-bold">8 hours per week</span>. To reserve a spot, please request the waitlist on LinkedIn.
                    </p>
                    <a 
                      href="https://linkedin.com/in/bershadsky" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/20 border border-secondary/50 text-secondary hover:bg-secondary/30 transition-colors font-mono"
                    >
                      <Linkedin className="w-5 h-5" />
                      JOIN_WAITLIST
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
            
            <div className="mt-12 flex justify-center gap-4 text-muted-foreground">
              <MapPin className="w-5 h-5" />
              <span className="font-mono">{cvData.personal.location}</span>
            </div>
          </NeonCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-muted-foreground font-mono text-sm">
        <p>© 2025 SERGEY_BERSHADSKY // SYSTEM_ONLINE</p>
      </footer>
    </div>
  );
}