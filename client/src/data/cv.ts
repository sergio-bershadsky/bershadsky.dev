export const cvData = {
  personal: {
    name: "Sergey Bershadsky",
    title: "Startup Architect | Product Delivery Expert",
    email: "sergio.bershadsky@gmail.com",
    location: "Lisbon, Portugal",
    phone: "+351 913 543 706",
    summary: "Engineering leader and startup architect with over 15 years of experience scaling products to millions of users in fintech, healthtech, and emerging technologies. Recognized for rapid MVP launches, building high-performing teams, and architecting cloud platforms from scratch."
  },
  skills: {
    languages: ["Python", "JS/TS", "SQL", "Dart", "Go"],
    frameworks: ["Django", "FastAPI", "ReactJS", "Svelte", "Flutter", "Flask", "Wagtail"],
    databases: ["PostgreSQL", "MySQL", "ElasticSearch", "Redis", "MongoDB"],
    devops: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "Pulumi", "GitHub Actions"]
  },
  experience: [
    {
      role: "Architecture Consultant",
      company: "TopTal",
      period: "2019 – Present",
      location: "Remote, USA",
      description: "Project-based external consulting, guaranteeing MVP launches, architecture overhauls, and rapid delivery. Engaged directly with C-level stakeholders.",
      achievements: [
        "Delivered 19 successful projects (>10,000 hours)",
        "Maintained 95% client retention rate",
        "Overhauled MySQL architecture for Ricoh USA (3x user growth)",
        "Refactored data pipelines for Zoetis (+45% accuracy)"
      ]
    },
    {
      role: "Lead Architect & Backend",
      company: "UMIAS",
      period: "2014 – 2019",
      description: "Brought platform transformation to capture market share from 10% to 80%.",
      achievements: [
        "Grew market share from 10% to 80% with zero marketing budget",
        "Handled platform scale to 1.2M MAU",
        "Built robust backend infrastructure with OpenEHR/HL7 compliance"
      ]
    },
    {
      role: "Early Career",
      company: "Various",
      period: "2003 – 2014",
      description: "Progressed from junior developer to leading small engineering teams across government, education, social, and eCommerce sectors.",
      achievements: [
        "Oversaw full lifecycle delivery on 30+ high-traffic platforms",
        "Built and optimized systems with overall 30M MAU"
      ]
    }
  ],
  education: [
    {
      degree: "MBA in Agribusiness",
      school: "MSAU",
      period: "2007 - 2012"
    },
    {
      degree: "Bachelor in Agriculture Engineering",
      school: "MSAU",
      period: "2003 - 2007"
    }
  ]
};

export const blogPosts = [
  {
    id: 1,
    title: "Scaling Microservices in 2025",
    excerpt: "How to handle 1M+ requests without breaking the bank or your sanity.",
    date: "2024-12-10",
    tags: ["Architecture", "DevOps"]
  },
  {
    id: 2,
    title: "The Death of Traditional REST APIs",
    excerpt: "Why RPC and GraphQL are taking over modern startup stacks.",
    date: "2024-11-28",
    tags: ["API", "Opinion"]
  },
  {
    id: 3,
    title: "Building MVPs that Don't Suck",
    excerpt: "A guide to rapid prototyping without accumulating massive tech debt.",
    date: "2024-11-15",
    tags: ["Startup", "Product"]
  }
];