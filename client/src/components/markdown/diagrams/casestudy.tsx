import React from 'react';
import { Smartphone, Globe, Server, Database, Container, Activity, Shield, Zap, ArrowDown, ArrowRight, Users, Clock, TrendingUp, CheckCircle, Crown, Target, Lock, Gauge, Box, Layers } from 'lucide-react';
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
  { id: 'tech-lead-role', detect: isTechLeadRole, component: TechLeadRoleCard },
  { id: 'umias-architecture', detect: isUMIASArchitecture, component: UMIASArchitectureDiagram },
  { id: 'umias-results', detect: isUMIASResults, component: UMIASResultsDiagram },
  { id: 'umias-transformation', detect: isUMIASTransformation, component: UMIASTransformationDiagram },
];
