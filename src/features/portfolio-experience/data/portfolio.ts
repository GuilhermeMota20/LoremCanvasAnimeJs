export type PortfolioProject = {
  client: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  imageUrl?: string;
  color: string;
};

export type PortfolioMedia = {
  alt: string;
  imageUrl?: string;
};

export type PortfolioAction = {
  label: string;
  href?: string;
};

export type PortfolioContent = {
  meta: { productName: string };
  header: {
    brand: { primary: string; accent: string };
    navigation: { id: string; name: string; number: string; icon: string }[];
    navigationLabel: string;
    previousLabel: string;
    nextLabel: string;
    contactLabel: string;
  };
  hero: {
    title: string[][];
    description: { before: string; emphasis: string; after: string };
    galleryLabel: string;
    contactLabel: string;
    projectsLabel: string;
    badgeLabel: string;
    media: PortfolioMedia;
  };
  marquee: string[];
  gallery: { eyebrow: string; title: string; description: string; viewMoreLabel: string };
  about: {
    eyebrow: string;
    title: string;
    media: PortfolioMedia;
    stickerLabel: string;
    lead: { before: string; emphasis: string; after: string };
    description: string;
    points: { emphasis: string; text: string }[];
    stackLabel: string;
    featuredStack: string[];
    stack: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: PortfolioAction;
    secondaryAction: PortfolioAction;
    backToTopLabel: string;
    footerCredit: string;
  };
  overlay: {
    dialogLabel: string;
    closeLabel: string;
    browserFallbackUrl: string;
    media: PortfolioMedia;
    visitProjectLabel: string;
    privateProjectLabel: string;
  };
  projects: PortfolioProject[];
};

export const portfolio: PortfolioContent = {
  meta: { productName: 'Lorem Ipsum | Portfólio Ilustrativo' },
  header: {
    brand: { primary: 'Lorem', accent: '.ipsum' },
    navigation: [
      { id: 'inicio', name: 'Início', number: '01', icon: 'fa-house' },
      { id: 'galeria', name: 'Galeria', number: '02', icon: 'fa-grip' },
      { id: 'sobre', name: 'Sobre', number: '03', icon: 'fa-user' },
      { id: 'contato', name: 'Contato', number: '04', icon: 'fa-envelope' },
    ],
    navigationLabel: 'Principal',
    previousLabel: 'Aba anterior',
    nextLabel: 'Próxima aba',
    contactLabel: 'Contato',
  },
  hero: {
    title: [['Lorem', 'Ipsum'], ['Dolor', 'Sit'], ['Amet!']],
    description: {
      before: 'Lorem ipsum dolor sit amet, ',
      emphasis: 'consectetur',
      after: ' adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.',
    },
    galleryLabel: 'Ver galeria',
    contactLabel: 'Lorem ipsum',
    projectsLabel: 'Ver projetos',
    badgeLabel: 'VER GALERIA',
    media: { alt: 'Lorem ipsum dolor sit amet' },
  },
  marquee: ['Lorem', 'Ipsum', 'Dolor', 'Sit amet', 'Consectetur', 'Adipiscing', 'Elit'],
  gallery: {
    eyebrow: '02',
    title: 'Galeria',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    viewMoreLabel: 'Ver mais',
  },
  about: {
    eyebrow: '03',
    title: 'Lorem ipsum',
    media: { alt: 'Lorem ipsum dolor sit amet' },
    stickerLabel: 'Lorem ipsum',
    lead: {
      before: 'Lorem ipsum ',
      emphasis: 'dolor sit amet',
      after: ', consectetur adipiscing elit.',
    },
    description:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    points: [
      { emphasis: 'Lorem ipsum', text: ', dolor sit amet consectetur.' },
      { emphasis: 'Dolor sit amet', text: ', adipiscing elit sed do eiusmod.' },
      { emphasis: 'Consectetur elit', text: ', tempor incididunt ut labore.' },
    ],
    stackLabel: 'Stack',
    featuredStack: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
    stack: ['Consectetur', 'Adipiscing', 'Elit', 'Tempor', 'Labore'],
  },
  contact: {
    eyebrow: '04',
    title: 'Lorem ipsum dolor sit amet?',
    description:
      'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
    primaryAction: { label: 'Lorem ipsum' },
    secondaryAction: { label: 'Dolor sit amet' },
    backToTopLabel: 'Voltar ao início',
    footerCredit: 'Feito por Guilherme Mota',
  },
  overlay: {
    dialogLabel: 'Detalhes do projeto',
    closeLabel: 'Fechar',
    browserFallbackUrl: 'lorem-ipsum.example',
    media: { alt: 'Lorem ipsum dolor' },
    visitProjectLabel: 'Visitar projeto ↗',
    privateProjectLabel: 'Lorem ipsum dolor sit amet.',
  },
  projects: [
    {
      client: 'Lorem 01',
      title: 'Lorem ipsum dolor sit amet',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tags: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
      color: 'var(--project-01)',
    },
    {
      client: 'Lorem 02',
      title: 'Consectetur adipiscing elit',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore.',
      tags: ['Sed', 'Eiusmod', 'Tempor', 'Labore', 'Dolore'],
      color: 'var(--project-02)',
    },
    {
      client: 'Lorem 03',
      title: 'Ut enim ad minim veniam',
      description: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip.',
      tags: ['Quis', 'Nostrud', 'Ullamco', 'Laboris', 'Aliquip'],
      color: 'var(--project-03)',
    },
    {
      client: 'Lorem 04',
      title: 'Duis aute irure dolor',
      description: 'In reprehenderit in voluptate velit esse cillum dolore.',
      tags: ['Duis', 'Aute', 'Irure', 'Velit', 'Cillum'],
      color: 'var(--project-04)',
    },
    {
      client: 'Lorem 05',
      title: 'Excepteur sint occaecat',
      description: 'Cupidatat non proident sunt in culpa qui officia.',
      tags: ['Cupidatat', 'Proident', 'Sunt', 'Culpa', 'Mollit'],
      color: 'var(--project-05)',
    },
    {
      client: 'Lorem 06',
      title: 'Anim id est laborum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tags: ['Anim', 'Laborum', 'Lorem', 'Ipsum', 'Dolor'],
      color: 'var(--project-06)',
    },
  ],
};
