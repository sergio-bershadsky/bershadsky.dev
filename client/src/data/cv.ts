export const cvData = {
  personal: {
    name: "Sergey Bershadsky",
    title: "Tech Lead & Solution Architect",
    subtitle: "12 years of experience • 11 years at Toptal",
    email: "sergio.bershadsky@gmail.com",
    location: "Lisbon, Portugal",
    phone: "+351 913 543 706",
    toptalUrl: "https://talent.toptal.com/resume/developers/sergey-nikitin",
    summary: "Boasting over a decade of Python and Django expertise, I now specialize in consulting, focusing on optimizing Django's impact on your business. From DevOps to architecture and APIs, I'm here to enhance your project's efficiency. Beyond problem-solving, I offer team training to master Django, aiming to cut costs and empower teams for seamless management across AWS, GCP, or Kubernetes platforms. Let's unlock your project's full potential together."
  },
  skills: {
    languages: ["Python", "JavaScript", "GO", "SQL", "Dart"],
    frameworks: ["Django", "FastAPI", "Flask", "Scrapy", "React", "Svelte", "Flutter"],
    databases: ["PostgreSQL", "MySQL", "ElasticSearch", "Redis", "MongoDB"],
    devops: ["AWS", "GCP", "Kubernetes", "Terraform", "Ansible", "HELM", "Docker"]
  },
  journey: [
    {
      chapter: "Enterprise Scale",
      companies: ["Ricoh", "Zoetis"],
      via: "Toptal",
      tech: ["Python", "MySQL", "AWS", "Pydantic", "EventBridge"],
      story: "Optimizing database architectures and building event-driven systems for Fortune 500 companies. From MySQL performance tuning to AWS serverless patterns.",
      highlight: "1,200+ recommendations delivered",
      color: "primary"
    },
    {
      chapter: "Startup Leadership",
      companies: ["Truely eSIM"],
      tech: ["Django", "GraphQL", "React", "Flutter", "PostgreSQL"],
      story: "Built a global telecom platform from zero. Led 14 engineers, integrated 12+ eSIM providers, shipped Django + React + Flutter stack.",
      highlight: "CTO • 14 engineers",
      color: "secondary"
    },
    {
      chapter: "Consulting Practice",
      companies: ["DjangoHeads"],
      tech: ["Django", "FastAPI", "Docker", "Kubernetes", "Terraform"],
      story: "Founded a boutique Python consultancy. Helping startups ship faster with Django expertise, DevOps automation, and team mentoring.",
      highlight: "10+ clients served",
      color: "accent"
    },
    {
      chapter: "Healthcare Revolution",
      companies: ["UMIAS"],
      tech: ["Python", "PostgreSQL", "OpenEHR", "HL7", "Redis"],
      story: "Transformed a healthcare platform from 10% to 80% market share. Scaled to 1.2M monthly users with zero marketing budget.",
      highlight: "1.2M users • 80% market",
      color: "primary"
    },
    {
      chapter: "The Foundation",
      companies: ["Early Career"],
      tech: ["PHP", "MySQL", "JavaScript", "Linux", "Apache"],
      story: "From junior developer to tech lead across government, education, and eCommerce. 30+ platforms, 30M+ users.",
      highlight: "30M+ users reached",
      color: "secondary"
    }
  ],
  education: [
    {
      degree: "Master's Degree in Economics & Management",
      school: "Moscow State Agricultural University (MSAU)",
      period: "2007 - 2012"
    },
    {
      degree: "Bachelor's Degree in Engineering",
      school: "Moscow State Agricultural University (MSAU)",
      period: "2003 - 2007"
    }
  ],
  certifications: [
    {
      name: "ODOO 18 Functional Certification",
      issuer: "Odoo S.A.",
      date: "June 2025",
      id: "0000655848"
    },
    {
      name: "10,000+ Hours Core Developer",
      issuer: "TopTal",
      date: "2024"
    },
    {
      name: "AWS Certifications",
      issuer: "Amazon Web Services",
      date: "Various"
    },
    {
      name: "WebApp Security",
      issuer: "Security Training",
      date: "Various"
    }
  ],
  nonProfit: [
    {
      name: "IT-Sochi",
      role: "Founder & Organizer",
      description: "Founded and developed an IT community in Sochi, Russia. Organized meetups and attracted partners and external speakers. Grew from 0 to 1,300+ members in three years. Organized 30+ meetups and 2 large-scale conferences with 150+ average attendance, featuring companies like Tinkoff, Yandex, Sberbank, and Alfa-Bank."
    },
    {
      name: "Fondation Beyeler",
      role: "Developer",
      description: "Development of an official website for a Swiss charity organization."
    }
  ],
  testimonials: [
    {
      name: "Jennifer Hinton-Likins",
      role: "Advisory Architect – Product Owner",
      company: "Ricoh USA",
      quote: "It has been a pleasure working with Sergey as a backend engineer on our Scrum team. His deep expertise in database architecture, performance tuning, and data integrity has been instrumental in the success of our projects. Sergey consistently delivered scalable and optimized solutions, whether designing complex schemas, writing efficient code, or implementing robust data strategies. His departure is a loss to our team, but I have no doubt he will continue to excel and have a positive impact wherever he goes.",
      date: "June 2025"
    },
    {
      name: "Philip Zerull",
      role: "Senior Full-Stack Software Engineer",
      company: "Zoetis",
      quote: "Sergey was a huge help to our organization and played a key role in several strategic initiatives. His thoughtfulness, commitment to excellence, attention to detail, and deep knowledge of the Django web framework's internals resulted in meaningful and highly impactful improvements to our systems. Working with Sergey was a great pleasure. I would highly recommend him for any software project involving Python and/or Django.",
      date: "2023"
    },
    {
      name: "Geraint Evans",
      role: "Senior IP and Project Manager",
      company: "PatentSeekers Ltd",
      quote: "Sergey has been a pleasure to work with, has been very forthcoming with ideas and has helped advance the project in many ways. He has exceptional technical skills and has been keen and quick to learn and adapt when needed. When we decided to move to AWS, Sergey proactively learned about various aspects of its operation and was quick to adapt and transfer our system over. I would highly recommend Sergey for any DevOps or similar position.",
      date: "October 2020"
    },
    {
      name: "Pavel Shum",
      role: "Regional Center Director",
      company: "Tinkoff Development Center",
      quote: "I have the honor of recommending Sergey Bershadsky, with whom we began collaborating in 2019, creating the IT Sochi community. Under Sergey's leadership, we organized over 30 meetups and 2 large-scale conferences with an average attendance of 150 people. IT Sochi has become one of the largest communities in the region, attracting over 1,000 participants. Sergey is a born philanthropist who has invested significant personal resources into community development. He is punctual, responsible, and always shows initiative.",
      date: "February 2021"
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
