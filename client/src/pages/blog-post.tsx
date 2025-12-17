import React from 'react';
import { motion } from 'framer-motion';
import { useRoute } from "wouter";
import { ArrowLeft, Clock, Calendar, Hash, Share2, Copy, Check, ExternalLink } from 'lucide-react';
import { NeonCard, CyberButton, SectionHeader } from '@/components/CyberpunkUI';
import { CyberpunkBackground } from '@/components/CyberpunkBackground';
import blogVideo from '@assets/generated_videos/cyberpunk_digital_interface_with_code_scrolling_and_data_visualization.mp4';
import { blogPosts } from '@/data/cv';

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:id");
  const [copied, setCopied] = React.useState(false);
  
  // Mock full content since we only have excerpts in the CV data
  const post = blogPosts.find(p => p.id === Number(params?.id)) || blogPosts[0];

  const copyCode = () => {
    navigator.clipboard.writeText(`// Microservices scaling example
const scaleService = async (serviceId: string) => {
  const metrics = await getMetrics(serviceId);
  if (metrics.cpu > 80 || metrics.memory > 75) {
    await orchestrator.scale(serviceId, { replicas: '+1' });
    console.log(\`Scaling up service \${serviceId}\`);
  }
};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen text-foreground relative overflow-x-hidden">
      <CyberpunkBackground />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-display font-bold">RETURN_TO_BASE</span>
          </a>
          <div className="font-mono text-xs text-muted-foreground hidden md:block">
            READING_MODE: ACTIVE // ID: {String(post.id).padStart(3, '0')}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-20">
        <article className="max-w-4xl mx-auto">
          {/* Header Video Section */}
          <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(236,72,153,0.2)] mb-10 group">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <video 
              src={blogVideo} 
              autoPlay 
              loop 
              muted 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />
            
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
              <div className="flex flex-wrap gap-4 mb-4 text-xs font-mono">
                <span className="flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1 rounded border border-white/10 text-primary">
                  <Calendar className="w-3 h-3" /> {post.date}
                </span>
                <span className="flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1 rounded border border-white/10 text-secondary">
                  <Clock className="w-3 h-3" /> 8 MIN READ
                </span>
                {post.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1 rounded border border-white/10 text-muted-foreground">
                    <Hash className="w-3 h-3" /> {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-4 drop-shadow-lg">
                {post.title}
              </h1>
              <p className="text-xl text-white/80 max-w-2xl font-light">
                {post.excerpt}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-[1fr_250px] gap-10">
            <div className="space-y-8">
              {/* Introduction */}
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-xl leading-relaxed text-foreground/90 font-light first-letter:text-5xl first-letter:font-display first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                  In the rapidly evolving landscape of distributed systems, the challenge isn't just building microservices—it's orchestrating them at scale without creating a maintenance nightmare. As we move into 2025, the old paradigms of manual scaling and static provisioning are dead.
                </p>
                <p>
                  Today, we're seeing a shift towards autonomous, event-driven architectures that react to system pressure in real-time. This article explores the architectural patterns that are defining the next generation of scalable platforms.
                </p>
              </div>

              {/* Diagram Section */}
              <NeonCard variant="secondary" className="my-10 p-8">
                <div className="text-xs font-mono text-secondary mb-4 flex justify-between">
                  <span>FIG 1.0 // ARCHITECTURE_DIAGRAM</span>
                  <span>STATUS: LIVE</span>
                </div>
                <div className="relative h-64 border border-dashed border-white/20 rounded bg-black/40 flex items-center justify-center p-4">
                  {/* CSS-only flowchart diagram */}
                  <div className="flex items-center gap-4 w-full justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-24 h-12 border border-primary bg-primary/10 flex items-center justify-center text-xs font-mono rounded">CLIENT</div>
                      <div className="h-8 w-[1px] bg-white/20"></div>
                      <div className="w-24 h-12 border border-accent bg-accent/10 flex items-center justify-center text-xs font-mono rounded">API GATEWAY</div>
                    </div>
                    <div className="h-[1px] w-8 bg-white/20"></div>
                    <div className="flex flex-col gap-4">
                      <div className="w-32 h-10 border border-secondary bg-secondary/10 flex items-center justify-center text-xs font-mono rounded">AUTH SERVICE</div>
                      <div className="w-32 h-10 border border-secondary bg-secondary/10 flex items-center justify-center text-xs font-mono rounded">DATA SERVICE</div>
                      <div className="w-32 h-10 border border-secondary bg-secondary/10 flex items-center justify-center text-xs font-mono rounded">ANALYTICS</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 font-mono text-center">
                  // Distributed Event Mesh Architecture with Auto-scaling capabilities
                </p>
              </NeonCard>

              {/* Code Example */}
              <div className="relative group">
                <div className="absolute -top-3 left-4 bg-background px-2 text-xs font-mono text-primary border border-primary/30 rounded z-10">
                  SCALING_LOGIC.TS
                </div>
                <div className="bg-[#0d1117] rounded-lg border border-white/10 overflow-hidden shadow-2xl">
                  <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                    </div>
                    <button 
                      onClick={copyCode}
                      className="text-xs font-mono flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'COPIED' : 'COPY_SOURCE'}
                    </button>
                  </div>
                  <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed">
                    <code className="text-gray-300">
                      <span className="text-purple-400">// Microservices scaling example</span>{'\n'}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">scaleService</span> = <span className="text-blue-400">async</span> (<span className="text-orange-300">serviceId</span>: <span className="text-green-400">string</span>) ={'>'} {'{'}{'\n'}
                      {'  '}<span className="text-blue-400">const</span> metrics = <span className="text-blue-400">await</span> <span className="text-yellow-300">getMetrics</span>(serviceId);{'\n'}
                      {'  '}<span className="text-pink-400">if</span> (metrics.cpu {'>'} <span className="text-blue-300">80</span> || metrics.memory {'>'} <span className="text-blue-300">75</span>) {'{'}{'\n'}
                      {'    '}<span className="text-blue-400">await</span> orchestrator.<span className="text-yellow-300">scale</span>(serviceId, {'{'}{'\n'}
                      {'      '}replicas: <span className="text-green-300">'+1'</span>{'\n'}
                      {'    '}{'}'});{'\n'}
                      {'    '}console.<span className="text-yellow-300">log</span>(<span className="text-green-300">`Scaling up service </span><span className="text-blue-300">${'{serviceId}'}</span><span className="text-green-300">`</span>);{'\n'}
                      {'  '}{'}'}{'\n'}
                      {'}'};
                    </code>
                  </pre>
                </div>
              </div>

              <div className="prose prose-invert prose-lg max-w-none">
                <h3 className="text-2xl font-display text-white mt-8 mb-4">The Implementation Strategy</h3>
                <p>
                  Implementing this pattern requires a robust observability stack. You cannot scale what you cannot measure. We recommend starting with Prometheus for metrics collection and Grafana for visualization, but the real magic happens when you couple these with an automated decision engine.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground marker:text-primary">
                  <li>Define clear SLIs and SLOs before writing scaling rules</li>
                  <li>Implement circuit breakers to prevent cascading failures</li>
                  <li>Use idempotent operations to ensure data consistency</li>
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              <div className="sticky top-24 space-y-8">
                <NeonCard variant="primary" className="p-6">
                  <h4 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-widest">About Author</h4>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                      <img src="@assets/avatar-big_1765956076319.png" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold font-display">Sergey Bershadsky</div>
                      <div className="text-xs text-muted-foreground">Architect</div>
                    </div>
                  </div>
                  <CyberButton size="sm" className="w-full text-xs">FOLLOW_UPDATES</CyberButton>
                </NeonCard>

                <div className="border border-white/10 rounded bg-black/20 p-6">
                  <h4 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-widest">Share Protocol</h4>
                  <div className="flex gap-2">
                    <button className="p-2 border border-white/10 rounded hover:bg-white/5 hover:border-primary/50 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 border border-white/10 rounded hover:bg-white/5 hover:border-secondary/50 transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="border border-white/10 rounded bg-black/20 p-6">
                  <h4 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-widest">Table of Contents</h4>
                  <ul className="space-y-2 text-sm font-light text-muted-foreground">
                    <li className="hover:text-primary cursor-pointer transition-colors">▹ Introduction</li>
                    <li className="hover:text-primary cursor-pointer transition-colors">▹ Architecture Overview</li>
                    <li className="hover:text-primary cursor-pointer transition-colors">▹ Code Implementation</li>
                    <li className="hover:text-primary cursor-pointer transition-colors">▹ Strategy & Conclusion</li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </article>

        {/* Read Next */}
        <div className="max-w-4xl mx-auto mt-20 pt-10 border-t border-white/10">
          <SectionHeader title="RELATED_DATA" subtitle="Continue Reading" />
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.filter(p => p.id !== post.id).slice(0, 2).map(related => (
               <NeonCard key={related.id} variant="accent" className="cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-display font-bold text-lg group-hover:text-accent transition-colors">{related.title}</h4>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground">{related.excerpt}</p>
               </NeonCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
