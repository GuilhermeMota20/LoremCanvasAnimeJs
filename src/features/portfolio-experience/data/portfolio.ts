export type PortfolioProject = {
  client: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  color: string;
};

export const portfolio = {
  navigation: [
    { id: 'inicio', name: 'Início', japanese: '01' },
    { id: 'projetos', name: 'Galeria', japanese: '02' },
    { id: 'sobre', name: 'Sobre', japanese: '03' },
    { id: 'contato', name: 'Contato', japanese: '04' },
  ],
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
      tags: ['Cupidatat', 'Proident', 'Culpa', 'Officia', 'Mollit'],
      color: 'var(--project-05)',
    },
    {
      client: 'Lorem 06',
      title: 'Anim id est laborum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tags: ['Anim', 'Laborum', 'Lorem', 'Ipsum', 'Dolor'],
      color: 'var(--project-06)',
    },
  ] satisfies PortfolioProject[],
  featuredStack: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
  stack: ['Consectetur', 'Adipiscing', 'Elit', 'Tempor', 'Labore'],
} as const;
