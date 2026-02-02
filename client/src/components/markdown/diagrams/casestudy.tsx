import React from 'react';
import { Smartphone, Globe, Server, Database, Container, Activity, Shield, Zap, ArrowDown, ArrowRight, Users, Clock, TrendingUp, CheckCircle, Crown, Target, Lock, Gauge, Box, Layers, GitBranch, AlertTriangle, XCircle, FileCode } from 'lucide-react';
import { DiagramEntry } from '../diagramRegistry';

export const TechLeadRoleCard = () => (
  <div className="my-8 border border-cyan-500/40 rounded-lg bg-gradient-to-br from-black/60 via-cyan-950/20 to-black/60 p-6 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
    
    <div className="relative z-10">
      <div className="text-sm font-mono text-cyan-400 mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Crown className="w-4 h-4" />
          <span>MY ROLE // TECH_LEAD</span>
        </div>
        <span className="text-xs text-muted-foreground px-2 py-0.5 border border-cyan-500/30 rounded">LEADERSHIP</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-3 border border-cyan-500/30 rounded-lg bg-black/40 text-center group hover:border-cyan-400/60 transition-colors">
          <Users className="w-6 h-6 mx-auto mb-2 text-cyan-400 group-hover:scale-110 transition-transform" />
          <div className="font-mono text-2xl text-white font-bold">8-10</div>
          <div className="text-xs text-gray-400 mt-1">ENGINEERS</div>
        </div>
        <div className="p-3 border border-primary/30 rounded-lg bg-black/40 text-center group hover:border-primary/60 transition-colors">
          <Target className="w-6 h-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
          <div className="font-mono text-lg text-white font-bold">DIRECT</div>
          <div className="text-xs text-gray-400 mt-1">TO STAKEHOLDERS</div>
        </div>
        <div className="p-3 border border-accent/30 rounded-lg bg-black/40 text-center group hover:border-accent/60 transition-colors">
          <Layers className="w-6 h-6 mx-auto mb-2 text-accent group-hover:scale-110 transition-transform" />
          <div className="font-mono text-lg text-white font-bold">FULL</div>
          <div className="text-xs text-gray-400 mt-1">TECH OWNERSHIP</div>
        </div>
        <div className="p-3 border border-orange-500/30 rounded-lg bg-black/40 text-center group hover:border-orange-500/60 transition-colors">
          <Gauge className="w-6 h-6 mx-auto mb-2 text-orange-400 group-hover:scale-110 transition-transform" />
          <div className="font-mono text-lg text-white font-bold">3 YRS</div>
          <div className="text-xs text-gray-400 mt-1">DURATION</div>
        </div>
      </div>
      
      <div className="border-t border-cyan-500/20 pt-4">
        <div className="text-xs font-mono text-cyan-400 mb-3 flex items-center gap-2">
          <Zap className="w-3 h-3" />
          TECHNICAL INNOVATIONS
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start gap-3 p-3 rounded bg-gradient-to-r from-cyan-500/10 to-transparent border-l-2 border-cyan-400">
            <Box className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm text-white font-medium">Early Docker Adoption</div>
              <div className="text-xs text-gray-400">Containerization before mainstream</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded bg-gradient-to-r from-primary/10 to-transparent border-l-2 border-primary">
            <Container className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm text-white font-medium">Custom Docker Cluster</div>
              <div className="text-xs text-gray-400">Built on HashiCorp Consul</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded bg-gradient-to-r from-accent/10 to-transparent border-l-2 border-accent">
            <Gauge className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm text-white font-medium">Smart Server Caching</div>
              <div className="text-xs text-gray-400">Reduced backend pressure 10x</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded bg-gradient-to-r from-green-500/10 to-transparent border-l-2 border-green-400">
            <Lock className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm text-white font-medium">Encrypted Data Vaults</div>
              <div className="text-xs text-gray-400">Secure personal data storage</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const UMIASArchitectureDiagram = () => (
  <div className="my-8 border border-orange-500/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-orange-400 mb-4 flex justify-between">
      <span>FIG 1.0 // UMIAS_ARCHITECTURE</span>
      <span className="text-xs text-muted-foreground">SYSTEM DESIGN</span>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="p-3 border border-cyan-500/40 rounded bg-cyan-500/10 text-center">
        <Globe className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
        <div className="font-mono text-xs text-cyan-400 font-bold">WEB PORTAL</div>
        <div className="text-xs text-gray-400 mt-1">ReactJS</div>
      </div>
      <div className="p-3 border border-cyan-500/40 rounded bg-cyan-500/10 text-center">
        <Smartphone className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
        <div className="font-mono text-xs text-cyan-400 font-bold">MOBILE APPS</div>
        <div className="text-xs text-gray-400 mt-1">ReactNative</div>
      </div>
      <div className="p-3 border border-cyan-500/40 rounded bg-cyan-500/10 text-center">
        <Globe className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
        <div className="font-mono text-xs text-cyan-400 font-bold">ADAPTIVE WEB</div>
        <div className="text-xs text-gray-400 mt-1">Mobile-First</div>
      </div>
    </div>
    
    <div className="flex justify-center mb-3">
      <ArrowDown className="w-4 h-4 text-orange-400" />
    </div>
    
    <div className="p-4 border border-orange-500/40 rounded-lg bg-orange-500/10 mb-4">
      <div className="flex items-center justify-center gap-3 mb-3">
        <Shield className="w-5 h-5 text-orange-400" />
        <span className="font-mono text-sm text-orange-400 font-bold">API GATEWAY (TYK)</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-400">
        <div>Rate Limiting</div>
        <div>Authentication</div>
        <div>Analytics</div>
      </div>
    </div>
    
    <div className="flex justify-center mb-3">
      <ArrowDown className="w-4 h-4 text-orange-400" />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="p-3 border border-primary/40 rounded bg-primary/10">
        <div className="flex items-center gap-2 mb-2">
          <Server className="w-4 h-4 text-primary" />
          <span className="font-mono text-xs text-primary font-bold">PYTHON BACKEND</span>
        </div>
        <div className="text-xs text-gray-400 space-y-1">
          <div>Django API Services</div>
          <div>Celery Background Tasks</div>
          <div>Consul Service Discovery</div>
        </div>
      </div>
      <div className="p-3 border border-accent/40 rounded bg-accent/10">
        <div className="flex items-center gap-2 mb-2">
          <Container className="w-4 h-4 text-accent" />
          <span className="font-mono text-xs text-accent font-bold">INFRASTRUCTURE</span>
        </div>
        <div className="text-xs text-gray-400 space-y-1">
          <div>Docker Containers</div>
          <div>Jenkins CI/CD</div>
          <div>Auto-Scaling</div>
        </div>
      </div>
    </div>
    
    <div className="flex justify-center mb-3">
      <ArrowDown className="w-4 h-4 text-orange-400" />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="p-2 border border-secondary/40 rounded bg-secondary/10 text-center">
        <Activity className="w-4 h-4 mx-auto mb-1 text-secondary" />
        <div className="font-mono text-xs text-secondary">MONITORING</div>
        <div className="text-xs text-gray-500">ELK + Zabbix</div>
      </div>
      <div className="p-2 border border-secondary/40 rounded bg-secondary/10 text-center">
        <Zap className="w-4 h-4 mx-auto mb-1 text-secondary" />
        <div className="font-mono text-xs text-secondary">ERRORS</div>
        <div className="text-xs text-gray-500">Sentry</div>
      </div>
      <div className="p-2 border border-secondary/40 rounded bg-secondary/10 text-center">
        <TrendingUp className="w-4 h-4 mx-auto mb-1 text-secondary" />
        <div className="font-mono text-xs text-secondary">ANALYTICS</div>
        <div className="text-xs text-gray-500">Google Analytics</div>
      </div>
    </div>
  </div>
);

export const UMIASResultsDiagram = () => (
  <div className="my-8 border border-green-500/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-green-400 mb-4 flex justify-between">
      <span>FIG 2.0 // TRANSFORMATION_RESULTS</span>
      <span className="text-xs text-muted-foreground">2015 → 2018</span>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-3">
        <div className="text-xs font-mono text-gray-500 text-center mb-2">BEFORE (2015)</div>
        <div className="p-3 border border-red-500/30 rounded bg-red-500/10 text-center">
          <Users className="w-4 h-4 mx-auto mb-1 text-red-400" />
          <div className="font-mono text-lg text-red-400">~2,000</div>
          <div className="text-xs text-gray-500">Monthly Users</div>
        </div>
        <div className="p-3 border border-red-500/30 rounded bg-red-500/10 text-center">
          <Smartphone className="w-4 h-4 mx-auto mb-1 text-red-400" />
          <div className="font-mono text-lg text-red-400">0</div>
          <div className="text-xs text-gray-500">App Installs</div>
        </div>
        <div className="p-3 border border-red-500/30 rounded bg-red-500/10 text-center">
          <Clock className="w-4 h-4 mx-auto mb-1 text-red-400" />
          <div className="font-mono text-lg text-red-400">Minimal</div>
          <div className="text-xs text-gray-500">Appointments</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="text-xs font-mono text-gray-500 text-center mb-2">AFTER (2018)</div>
        <div className="p-3 border border-green-500/30 rounded bg-green-500/10 text-center">
          <Users className="w-4 h-4 mx-auto mb-1 text-green-400" />
          <div className="font-mono text-lg text-green-400">&gt;1,000,000</div>
          <div className="text-xs text-gray-500">Monthly Users</div>
        </div>
        <div className="p-3 border border-green-500/30 rounded bg-green-500/10 text-center">
          <Smartphone className="w-4 h-4 mx-auto mb-1 text-green-400" />
          <div className="font-mono text-lg text-green-400">1,600,000</div>
          <div className="text-xs text-gray-500">App Installs</div>
        </div>
        <div className="p-3 border border-green-500/30 rounded bg-green-500/10 text-center">
          <Clock className="w-4 h-4 mx-auto mb-1 text-green-400" />
          <div className="font-mono text-lg text-green-400">2,000,000</div>
          <div className="text-xs text-gray-500">Monthly Appointments</div>
        </div>
      </div>
    </div>
    
    <div className="mt-4 p-3 border border-green-500/40 rounded bg-green-500/10 text-center">
      <CheckCircle className="w-5 h-5 mx-auto mb-1 text-green-400" />
      <div className="font-mono text-sm text-green-400">#1 APP STORE RANKING • NPS &gt;80</div>
    </div>
  </div>
);

export const UMIASTransformationDiagram = () => (
  <div className="my-8 border border-primary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-primary mb-4 flex justify-between">
      <span>FIG 0.5 // TRANSFORMATION_JOURNEY</span>
      <span className="text-xs text-muted-foreground">TIMELINE</span>
    </div>
    
    <div className="flex flex-col md:flex-row items-center gap-4">
      <div className="flex-1 p-4 border border-red-500/30 rounded bg-red-500/10 text-center">
        <div className="font-mono text-xs text-red-400 mb-2">2015</div>
        <div className="font-display text-lg text-white mb-1">NEWS PORTAL</div>
        <div className="text-xs text-gray-400">1-2K visitors/month</div>
        <div className="text-xs text-gray-500 mt-1">Dying project</div>
      </div>
      
      <ArrowRight className="w-6 h-6 text-primary hidden md:block" />
      <ArrowDown className="w-6 h-6 text-primary md:hidden" />
      
      <div className="flex-1 p-4 border border-orange-500/30 rounded bg-orange-500/10 text-center">
        <div className="font-mono text-xs text-orange-400 mb-2">2016</div>
        <div className="font-display text-lg text-white mb-1">SERVICE PIVOT</div>
        <div className="text-xs text-gray-400">One-click booking</div>
        <div className="text-xs text-gray-500 mt-1">Mobile apps launch</div>
      </div>
      
      <ArrowRight className="w-6 h-6 text-primary hidden md:block" />
      <ArrowDown className="w-6 h-6 text-primary md:hidden" />
      
      <div className="flex-1 p-4 border border-green-500/30 rounded bg-green-500/10 text-center">
        <div className="font-mono text-xs text-green-400 mb-2">2018</div>
        <div className="font-display text-lg text-white mb-1">MARKET LEADER</div>
        <div className="text-xs text-gray-400">2M appointments/month</div>
        <div className="text-xs text-gray-500 mt-1">#1 in App Stores</div>
      </div>
    </div>
  </div>
);

export const TeamFeedbackSection = () => (
  <div className="my-8 border border-primary/30 rounded-lg bg-gradient-to-br from-black/60 via-primary/5 to-black/60 p-6">
    <div className="text-sm font-mono text-primary mb-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4" />
        <span>TEAM FEEDBACK // COLLEAGUES</span>
      </div>
      <span className="text-xs text-muted-foreground px-2 py-0.5 border border-primary/30 rounded">VERIFIED</span>
    </div>
    
    <div className="space-y-6">
      <div className="p-4 border border-cyan-500/30 rounded-lg bg-black/40 relative">
        <div className="absolute -top-3 left-4 px-2 bg-black text-cyan-400 text-xs font-mono">ALEKSANDR MOSPAN</div>
        <p className="text-gray-300 text-sm leading-relaxed italic mb-4">
          "Sergio is an exceptional professional developer and mentor. He is always focused on delivering products that best fulfil customer needs. He can independently manage IT product infrastructure, as well as scale and lead a team. I would highly recommend him as either an individual contributor or a development team leader."
        </p>
        <a href="https://www.linkedin.com/in/aleksandr-mospan-87432069/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          View on LinkedIn
        </a>
      </div>
      
      <div className="p-4 border border-primary/30 rounded-lg bg-black/40 relative">
        <div className="absolute -top-3 left-4 px-2 bg-black text-primary text-xs font-mono">DMITRY GRECHKIN</div>
        <p className="text-gray-300 text-sm leading-relaxed italic mb-4">
          "I had the pleasure of working with Sergio on multiple projects, including EMIAS.info — one of the largest digital healthcare platforms, where he was the Lead Architect and technical owner. Sergio is one of the smartest and most technically skilled people I know. He thinks strategically, builds strong and scalable systems, and always keeps long-term architecture in mind. He combines deep engineering expertise with the ability to move fast and deliver real results. From backend development and DevOps to databases, CI/CD, and cloud infrastructure — Sergio does it all at a very high level. He is extremely reliable — if Sergio is leading the project, you can be sure that it will be delivered, and done well."
        </p>
        <a href="https://www.linkedin.com/in/dgrechkin/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-primary/80 transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          View on LinkedIn
        </a>
      </div>
      
      <div className="p-4 border border-accent/30 rounded-lg bg-black/40 relative">
        <div className="absolute -top-3 left-4 px-2 bg-black text-accent text-xs font-mono">ALEXANDER VAKULOV</div>
        <p className="text-gray-300 text-sm leading-relaxed italic mb-4">
          "I had the pleasure of working alongside Sergey at EMIAS, where he served as our team lead. Sergey's expertise in DevOps and backend development is second to none, and from day one, he played a critical role in modernizing our processes. He quickly introduced the most up-to-date technologies, setting our team up for success within the very first year. Sergey stands out not only for his technical skills but also for his leadership and mentorship. He has an incredible ability to guide and support his team, always offering clear, long-term solutions. I highly recommend Sergey to any organization looking for a strong technical leader who can drive innovation and inspire those around him."
        </p>
        <a href="https://www.linkedin.com/in/vakuloff/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-accent hover:text-accent/80 transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          View on LinkedIn
        </a>
      </div>
    </div>
  </div>
);

export const IDAFractionalRoleCard = () => (
  <div className="my-8 border border-orange-500/40 rounded-lg bg-gradient-to-br from-black/60 via-orange-950/20 to-black/60 p-6 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl" />
    
    <div className="relative z-10">
      <div className="text-sm font-mono text-orange-400 mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Crown className="w-4 h-4" />
          <span>MY ROLE // FRACTIONAL TECH LEAD</span>
        </div>
        <span className="text-xs px-2 py-0.5 border border-orange-500/30 rounded bg-orange-500/10">PART-TIME</span>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="p-3 border border-cyan-500/30 rounded bg-black/40">
          <div className="text-xs font-mono text-cyan-400 mb-2 flex items-center gap-2">
            <Users className="w-3 h-3" />
            DIRECT MANAGEMENT
          </div>
          <div className="space-y-1 text-xs text-gray-300">
            <div className="flex items-center gap-2"><span className="text-cyan-400">2</span> Frontend Developers</div>
            <div className="flex items-center gap-2"><span className="text-cyan-400">2</span> Backend Developers</div>
            <div className="flex items-center gap-2"><span className="text-cyan-400">1</span> UX/UI Designer</div>
          </div>
        </div>
        
        <div className="p-3 border border-primary/30 rounded bg-black/40">
          <div className="text-xs font-mono text-primary mb-2 flex items-center gap-2">
            <Target className="w-3 h-3" />
            REPORTED TO
          </div>
          <div className="space-y-1 text-xs text-gray-300">
            <div>Stakeholder</div>
            <div>Product Owner</div>
          </div>
          <div className="mt-2 pt-2 border-t border-primary/20 text-xs text-gray-400">
            <Clock className="w-3 h-3 inline mr-1" /> 2 year engagement
          </div>
        </div>
      </div>
      
      <div className="p-3 border border-accent/30 rounded bg-black/40">
        <div className="text-xs font-mono text-accent mb-2 flex items-center gap-2">
          <Zap className="w-3 h-3" />
          KEY INNOVATIONS
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
          <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Jenkins CI/CD Pipeline</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Docker Containerization</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Terraform IaC</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> ECS → Kubernetes Migration</div>
        </div>
      </div>
      
      <div className="mt-4 p-3 border border-orange-500/30 rounded bg-orange-500/5">
        <div className="text-xs font-mono text-orange-400 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-3 h-3" />
          KEY CHALLENGES TACKLED
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-300">
          <div className="flex items-center gap-2"><Database className="w-3 h-3 text-cyan-400" /> Database Optimization</div>
          <div className="flex items-center gap-2"><Layers className="w-3 h-3 text-primary" /> Django 3.x → 5.x Upgrade</div>
          <div className="flex items-center gap-2"><Users className="w-3 h-3 text-accent" /> Team Mentoring</div>
        </div>
      </div>
    </div>
  </div>
);

export const IDAPipelineDiagram = () => (
  <div className="my-8 border border-cyan-500/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-cyan-400 mb-4 flex justify-between">
      <div className="flex items-center gap-2">
        <GitBranch className="w-4 h-4" />
        <span>FIG 1.2 // PIPELINE TRANSFORMATION</span>
      </div>
      <span className="text-xs text-muted-foreground">DEVOPS</span>
    </div>
    
    <div className="grid md:grid-cols-2 gap-4">
      <div className="p-4 border border-red-500/30 rounded-lg bg-red-500/5">
        <div className="text-xs font-mono text-red-400 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-3 h-3" />
          BEFORE (2021)
        </div>
        <div className="space-y-2 text-xs text-gray-400">
          <div className="flex items-center gap-2"><XCircle className="w-3 h-3 text-red-400" /> Manual deployments via SSH</div>
          <div className="flex items-center gap-2"><XCircle className="w-3 h-3 text-red-400" /> No automated testing</div>
          <div className="flex items-center gap-2"><XCircle className="w-3 h-3 text-red-400" /> Configs mixed in code</div>
          <div className="flex items-center gap-2"><XCircle className="w-3 h-3 text-red-400" /> "Restore and pray" rollbacks</div>
          <div className="mt-3 pt-3 border-t border-red-500/20 text-red-300 font-mono">Deploy time: 45+ min</div>
        </div>
      </div>
      
      <div className="p-4 border border-green-500/30 rounded-lg bg-green-500/5">
        <div className="text-xs font-mono text-green-400 mb-3 flex items-center gap-2">
          <CheckCircle className="w-3 h-3" />
          AFTER (2023)
        </div>
        <div className="space-y-2 text-xs text-gray-400">
          <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Automated CI/CD with Jenkins</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Full test suite on every commit</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Terraform-managed configs</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> One-click versioned rollbacks</div>
          <div className="mt-3 pt-3 border-t border-green-500/20 text-green-300 font-mono">Deploy time: 8 min</div>
        </div>
      </div>
    </div>
  </div>
);

export const IDAInfrastructureDiagram = () => (
  <div className="my-8 border border-accent/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-accent mb-4 flex justify-between">
      <div className="flex items-center gap-2">
        <Server className="w-4 h-4" />
        <span>FIG 1.3 // AWS + KUBERNETES ARCHITECTURE</span>
      </div>
      <span className="text-xs text-muted-foreground">CLOUD</span>
    </div>
    
    <div className="flex flex-col items-center gap-3">
      <div className="px-4 py-2 border border-cyan-500/40 rounded bg-cyan-500/10 text-cyan-400 text-xs font-mono flex items-center gap-2">
        <Globe className="w-4 h-4" />
        CloudFront CDN
      </div>
      
      <ArrowDown className="w-4 h-4 text-gray-500" />
      
      <div className="px-4 py-2 border border-primary/40 rounded bg-primary/10 text-primary text-xs font-mono flex items-center gap-2">
        <Layers className="w-4 h-4" />
        Application Load Balancer
      </div>
      
      <ArrowDown className="w-4 h-4 text-gray-500" />
      
      <div className="p-3 border border-blue-500/40 rounded bg-blue-500/10">
        <div className="text-xs font-mono text-blue-400 mb-2 text-center">Kubernetes Cluster (EKS)</div>
        <div className="flex gap-3">
          <div className="px-3 py-2 border border-accent/40 rounded bg-accent/10 text-accent text-xs font-mono flex items-center gap-2">
            <Box className="w-3 h-3" />
            Pod
          </div>
          <div className="px-3 py-2 border border-accent/40 rounded bg-accent/10 text-accent text-xs font-mono flex items-center gap-2">
            <Box className="w-3 h-3" />
            Pod
          </div>
          <div className="px-3 py-2 border border-accent/40 rounded bg-accent/10 text-accent text-xs font-mono flex items-center gap-2">
            <Box className="w-3 h-3" />
            Pod
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-2 text-center">Migrated from ECS</div>
      </div>
      
      <ArrowDown className="w-4 h-4 text-gray-500" />
      
      <div className="px-4 py-2 border border-green-500/40 rounded bg-green-500/10 text-green-400 text-xs font-mono flex items-center gap-2">
        <Database className="w-4 h-4" />
        RDS PostgreSQL (Optimized)
      </div>
    </div>
    
    <div className="mt-4 pt-4 border-t border-accent/20 flex justify-center gap-4 text-xs text-gray-500">
      <span className="flex items-center gap-1"><Box className="w-3 h-3 text-accent" /> Django 5.x + Wagtail</span>
      <span className="flex items-center gap-1"><Container className="w-3 h-3 text-cyan-400" /> Docker</span>
      <span className="flex items-center gap-1"><FileCode className="w-3 h-3 text-primary" /> Terraform</span>
    </div>
  </div>
);

export const IDAMetricsDiagram = () => (
  <div className="my-8 border border-green-500/30 rounded-lg bg-gradient-to-br from-black/60 via-green-500/5 to-black/60 p-5">
    <div className="text-sm font-mono text-green-400 mb-4 flex justify-between">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4" />
        <span>FIG 1.4 // TRANSFORMATION RESULTS</span>
      </div>
      <span className="text-xs text-muted-foreground">DASHBOARD</span>
    </div>
    
    <div className="grid md:grid-cols-2 gap-4">
      <div className="p-4 border border-green-500/20 rounded-lg bg-black/40">
        <div className="text-xs font-mono text-gray-400 mb-2">DEPLOYMENT FAILURES</div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="h-3 bg-red-500/30 rounded-full mb-1">
              <div className="h-3 bg-red-500 rounded-full" style={{width: '100%'}}></div>
            </div>
            <div className="h-3 bg-green-500/30 rounded-full">
              <div className="h-3 bg-green-500 rounded-full" style={{width: '10%'}}></div>
            </div>
          </div>
          <div className="text-2xl font-bold text-green-400">-90%</div>
        </div>
      </div>
      
      <div className="p-4 border border-cyan-500/20 rounded-lg bg-black/40">
        <div className="text-xs font-mono text-gray-400 mb-2">DEPLOYMENT SPEED</div>
        <div className="flex items-center justify-between">
          <div className="text-gray-500 line-through">45 min</div>
          <ArrowRight className="w-4 h-4 text-cyan-400" />
          <div className="text-xl font-bold text-cyan-400">8 min</div>
        </div>
        <div className="text-xs text-cyan-400/70 mt-1">82% faster</div>
      </div>
      
      <div className="p-4 border border-primary/20 rounded-lg bg-black/40">
        <div className="text-xs font-mono text-gray-400 mb-2">APPLICATION UPTIME</div>
        <div className="flex items-center justify-between">
          <div className="text-gray-500">~95%</div>
          <ArrowRight className="w-4 h-4 text-primary" />
          <div className="text-xl font-bold text-primary">99.9%</div>
        </div>
        <div className="text-xs text-primary/70 mt-1">Near-perfect availability</div>
      </div>
      
      <div className="p-4 border border-accent/20 rounded-lg bg-black/40">
        <div className="text-xs font-mono text-gray-400 mb-2">INCIDENT RESOLUTION</div>
        <div className="flex items-center justify-between">
          <div className="text-gray-500">Hours</div>
          <ArrowRight className="w-4 h-4 text-accent" />
          <div className="text-xl font-bold text-accent">Minutes</div>
        </div>
        <div className="text-xs text-accent/70 mt-1">80% faster MTTR</div>
      </div>
    </div>
  </div>
);

export const IDATeamFeedbackSection = () => (
  <div className="my-8 border border-orange-500/30 rounded-lg bg-gradient-to-br from-black/60 via-orange-500/5 to-black/60 p-6">
    <div className="text-sm font-mono text-orange-400 mb-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4" />
        <span>TEAM FEEDBACK // IDA COLLEAGUES</span>
      </div>
      <span className="text-xs text-muted-foreground px-2 py-0.5 border border-orange-500/30 rounded">VERIFIED</span>
    </div>
    
    <div className="space-y-6">
      <div className="p-4 border border-green-500/30 rounded-lg bg-black/40 relative">
        <div className="absolute -top-3 left-4 px-2 bg-black text-green-400 text-xs font-mono">JEAN PATRICK BISSON</div>
        <div className="text-xs text-green-400/70 mb-2">Founder & CEO</div>
        <p className="text-gray-300 text-sm leading-relaxed italic mb-4">
          "As we expanded from a few employees to more than 100, we needed a partner who could help us scale our technology. He had the experience to understand where we were going, while also meeting us where we were—working with our current tech stack, supporting it, and helping us significantly improve our infrastructure. Sergey and his entire team have been outstanding and consistently willing to help."
        </p>
        <a href="https://www.linkedin.com/in/jean-patrick-bisson/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-green-400 hover:text-green-300 transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          View on LinkedIn
        </a>
      </div>
      
      <div className="p-4 border border-cyan-500/30 rounded-lg bg-black/40 relative">
        <div className="absolute -top-3 left-4 px-2 bg-black text-cyan-400 text-xs font-mono">DMITRY STEBUKOV</div>
        <div className="text-xs text-cyan-400/70 mb-2">DevOps Engineer</div>
        <p className="text-gray-300 text-sm leading-relaxed italic mb-4">
          "Working with Sergio means being confident in the outcome. He has a deep understanding of system architecture and can scale solutions to handle any load. He combines strategic thinking with strong technical expertise. He knows how to build effective teams and inspire those around him. A reliable leader who always supports execution and brings confidence to the team."
        </p>
        <a href="https://www.linkedin.com/in/dmitry-stebukov-55a7721b2/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          View on LinkedIn
        </a>
      </div>
      
      <div className="p-4 border border-primary/30 rounded-lg bg-black/40 relative">
        <div className="absolute -top-3 left-4 px-2 bg-black text-primary text-xs font-mono">YURI KUSHENKO</div>
        <div className="text-xs text-primary/70 mb-2">UX/UI Engineer</div>
        <p className="text-gray-300 text-sm leading-relaxed italic mb-4">
          "I had the pleasure of working with Sergio for several years, and I can confidently say that he is one of the most outstanding professionals I've encountered. His ability to solve problems with clarity and precision set a high standard for everyone around him. Beyond his technical skills, Sergey stood out as a natural leader — thoughtful, decisive, and deeply supportive of his team. He leads not by authority, but by example, inspiring trust and motivation in those who work with him."
        </p>
        <a href="https://www.linkedin.com/in/kushenkoyuri/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-primary/80 transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          View on LinkedIn
        </a>
      </div>
    </div>
  </div>
);

function isIDATeamFeedback(code: string): boolean {
  return code.includes('IDA TEAM FEEDBACK') && code.includes('IDA COLLEAGUES') && code.includes('DMITRY') && code.includes('YURI');
}

function isIDAFractionalRole(code: string): boolean {
  return code.includes('IDA ROLE') && code.includes('FRACTIONAL_TECH_LEAD') && code.includes('DIRECT MANAGEMENT');
}

function isIDAPipeline(code: string): boolean {
  return code.includes('IDA PIPELINE') && code.includes('BEFORE vs AFTER') && code.includes('Manual deployments via SSH');
}

function isIDAInfrastructure(code: string): boolean {
  return code.includes('IDA INFRASTRUCTURE') && code.includes('AWS ARCHITECTURE') && code.includes('CloudFront') && code.includes('ECS Task');
}

function isIDAMetrics(code: string): boolean {
  return code.includes('IDA METRICS') && code.includes('TRANSFORMATION RESULTS') && code.includes('DEPLOYMENT FAILURES') && code.includes('DASHBOARD');
}

function isTeamFeedback(code: string): boolean {
  return code.includes('TEAM FEEDBACK') && code.includes('COLLEAGUES') && code.includes('ALEKSANDR') && code.includes('DMITRY');
}

function isTechLeadRole(code: string): boolean {
  return code.includes('TECH_LEAD') && code.includes('ENGINEERS') && code.includes('STAKEHOLDERS') && code.includes('INNOVATIONS');
}

function isUMIASArchitecture(code: string): boolean {
  return code.includes('WEB PORTAL') && code.includes('MOBILE APPS') && code.includes('API GATEWAY') && code.includes('PYTHON BACKEND');
}

function isUMIASResults(code: string): boolean {
  return code.includes('BEFORE (2015)') && code.includes('AFTER (2018)') && code.includes('Monthly Users') && code.includes('App Installs');
}

function isUMIASTransformation(code: string): boolean {
  return code.includes('NEWS PORTAL') && code.includes('SERVICE PIVOT') && code.includes('MARKET LEADER') && code.includes('2015') && code.includes('2018');
}

export const caseStudyDiagrams: DiagramEntry[] = [
  { id: 'ida-team-feedback', detect: isIDATeamFeedback, component: IDATeamFeedbackSection },
  { id: 'ida-fractional-role', detect: isIDAFractionalRole, component: IDAFractionalRoleCard },
  { id: 'ida-pipeline', detect: isIDAPipeline, component: IDAPipelineDiagram },
  { id: 'ida-infrastructure', detect: isIDAInfrastructure, component: IDAInfrastructureDiagram },
  { id: 'ida-metrics', detect: isIDAMetrics, component: IDAMetricsDiagram },
  { id: 'team-feedback', detect: isTeamFeedback, component: TeamFeedbackSection },
  { id: 'tech-lead-role', detect: isTechLeadRole, component: TechLeadRoleCard },
  { id: 'umias-architecture', detect: isUMIASArchitecture, component: UMIASArchitectureDiagram },
  { id: 'umias-results', detect: isUMIASResults, component: UMIASResultsDiagram },
  { id: 'umias-transformation', detect: isUMIASTransformation, component: UMIASTransformationDiagram },
];
