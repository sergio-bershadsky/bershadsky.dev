import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Terminal, Cpu, Network, Code, Briefcase, GraduationCap, Mail, MapPin, Phone, Github, Linkedin, ExternalLink, ArrowLeft } from 'lucide-react';
import { cvData } from '@/data/cv';
import { GlitchText, NeonCard, CyberButton, SectionHeader, NameGlitch } from '@/components/CyberpunkUI';
import { CyberpunkBackground } from '@/components/CyberpunkBackground';
import avatarImage from '@assets/generated_images/cyberpunk_portrait_of_bearded_man_with_glasses.webp';

export default function About() {
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
                  <span key={skill} className="px-2 py-1 bg-primary/10 border border-primary/30 text-xs font-mono text-primary-foreground/80">
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
                  <span key={skill} className="px-2 py-1 bg-secondary/10 border border-secondary/30 text-xs font-mono text-secondary">
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
                  <span key={skill} className="px-2 py-1 bg-accent/10 border border-accent/30 text-xs font-mono text-accent-foreground/80">
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
                  <span key={skill} className="px-2 py-1 bg-white/10 border border-white/30 text-xs font-mono text-white/80">
                    {skill}
                  </span>
                ))}
              </div>
            </NeonCard>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="container mx-auto px-4">
          <SectionHeader title="SYSTEM_LOGS" subtitle="Career History" />

          <div className="space-y-8 relative pl-8 border-l-2 border-white/10 ml-4 md:ml-0">
            {cvData.experience.map((job, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] md:-left-[41px] top-0 w-5 h-5 bg-background border-2 border-accent rounded-full shadow-[0_0_10px_rgba(147,51,234,0.5)]" />
                
                <NeonCard variant={index === 0 ? 'primary' : 'secondary'} className="group">
                  <div className="flex flex-col md:flex-row justify-between md:items-start mb-4 gap-2">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-white group-hover:text-primary transition-colors">
                        {job.role}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground font-mono mt-1">
                        <Briefcase className="w-4 h-4" />
                        <span className="text-lg">{job.company}</span>
                      </div>
                    </div>
                    <div className="text-right font-mono text-sm opacity-70 bg-black/30 px-3 py-1 border border-white/10">
                      {job.period}
                    </div>
                  </div>
                  
                  <p className="text-foreground/80 mb-4 font-light">
                    {job.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-mono text-muted-foreground">
                        <span className="text-primary mt-1">▹</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </NeonCard>
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
              <a href={`mailto:${cvData.personal.email}`} className="flex items-center justify-center gap-3 px-6 py-4 border border-primary/50 hover:bg-primary/10 transition-colors group">
                <Mail className="w-5 h-5 text-primary group-hover:text-white" />
                <span className="font-mono text-lg">{cvData.personal.email}</span>
              </a>
              <div className="flex items-center justify-center gap-3 px-6 py-4 border border-secondary/50 hover:bg-secondary/10 transition-colors group">
                <MapPin className="w-5 h-5 text-secondary group-hover:text-white" />
                <span className="font-mono text-lg">{cvData.personal.location}</span>
              </div>
            </div>

            <CyberButton size="lg" className="w-full md:w-auto px-16 text-xl">
              HIRE_ME_NOW
            </CyberButton>
            
            <div className="mt-12 flex justify-center gap-8 opacity-50">
               <Github className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
               <Linkedin className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
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