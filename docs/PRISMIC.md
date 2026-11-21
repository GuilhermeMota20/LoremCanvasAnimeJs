# Prismic CMS

## Modelo Prismic obrigatório

Crie um **Single Type** com os seguintes valores:

| Configuração | Valor               |
| ------------ | ------------------- |
| Nome         | `Portfolio Content` |
| API ID       | `portfolio_content` |
| Aba          | `Main`              |

Na aba `Main`, crie exatamente este campo:

| Rótulo no Prismic     | API ID         | Tipo Prismic | Obrigatório |
| --------------------- | -------------- | ------------ | ----------- |
| Conteúdo do portfólio | `content_json` | **Key Text** | Sim         |

> A integração atual usa um único campo JSON para garantir que o front-end e o CMS compartilhem o mesmo contrato, incluindo arrays, mídia, links e todos os textos. Não crie campos separados com outros API IDs: eles não serão lidos pelo projeto.

## Hierarquia do `content_json`

Cole um JSON válido no campo `content_json` seguindo exatamente a estrutura abaixo. Campos marcados com `?` são opcionais.

```text
PortfolioContent
├── meta
│   └── productName: string
├── header
│   ├── brand
│   │   ├── primary: string
│   │   └── accent: string
│   ├── navigation: NavigationItem[]
│   │   └── item
│   │       ├── id: string
│   │       ├── name: string
│   │       ├── number: string
│   │       └── icon: string
│   ├── navigationLabel: string
│   ├── previousLabel: string
│   ├── nextLabel: string
│   └── contactLabel: string
├── hero
│   ├── title: string[][]
│   ├── description
│   │   ├── before: string
│   │   ├── emphasis: string
│   │   └── after: string
│   ├── galleryLabel: string
│   ├── contactLabel: string
│   ├── projectsLabel: string
│   ├── badgeLabel: string
│   └── media
│       ├── alt: string
│       └── imageUrl?: string (URL absoluta da imagem)
├── marquee: string[]
├── gallery
│   ├── eyebrow: string
│   ├── title: string
│   ├── description: string
│   └── viewMoreLabel: string
├── about
│   ├── eyebrow: string
│   ├── title: string
│   ├── media
│   │   ├── alt: string
│   │   └── imageUrl?: string (URL absoluta da imagem)
│   ├── stickerLabel: string
│   ├── lead
│   │   ├── before: string
│   │   ├── emphasis: string
│   │   └── after: string
│   ├── description: string
│   ├── points: AboutPoint[]
│   │   └── item
│   │       ├── emphasis: string
│   │       └── text: string
│   ├── stackLabel: string
│   ├── featuredStack: string[]
│   └── stack: string[]
├── contact
│   ├── eyebrow: string
│   ├── title: string
│   ├── description: string
│   ├── primaryAction
│   │   ├── label: string
│   │   └── href?: string (URL absoluta de redirecionamento)
│   ├── secondaryAction
│   │   ├── label: string
│   │   └── href?: string (URL absoluta de redirecionamento)
│   ├── backToTopLabel: string
│   └── footerCredit: string
├── overlay
│   ├── dialogLabel: string
│   ├── closeLabel: string
│   ├── browserFallbackUrl: string
│   ├── media
│   │   ├── alt: string
│   │   └── imageUrl?: string (fallback visual do modal)
│   ├── visitProjectLabel: string
│   └── privateProjectLabel: string
└── projects: PortfolioProject[]
    └── item
        ├── client: string
        ├── title: string
        ├── description: string
        ├── tags: string[]
        ├── color: string (token CSS, ex.: "var(--project-01)")
        ├── imageUrl?: string (URL absoluta da capa)
        └── url?: string (URL absoluta de redirecionamento)
```

## Exemplo mínimo de mídia e links

```json
{
  "hero": {
    "media": {
      "alt": "Ilustração principal do portfólio",
      "imageUrl": "https://images.prismic.io/seu-repo/hero.jpg"
    }
  },
  "contact": {
    "primaryAction": {
      "label": "Falar no WhatsApp",
      "href": "https://wa.me/5511999999999"
    }
  },
  "projects": [
    {
      "client": "Projeto 01",
      "imageUrl": "https://images.prismic.io/seu-repo/projeto-01.jpg",
      "url": "https://exemplo.com"
    }
  ]
}
```

O exemplo acima mostra somente os campos relacionados a mídia e links; o documento real deve conter **toda** a hierarquia obrigatória.

## Ativação local

Crie `.env.local` com:

```dotenv
VITE_USE_PRISMIC=true
VITE_PRISMIC_REPOSITORY_NAME=nome-do-seu-repositorio
```

Com `VITE_USE_PRISMIC=false` — valor padrão de `.env.example` — a aplicação usa `src/features/portfolio-experience/data/portfolio.ts`. Se a configuração, a publicação ou o JSON estiverem inválidos, o conteúdo local permanece como fallback.

> O cliente do Prismic é executado no navegador. Use um repositório público para este modo; conteúdo privado deve ser consultado por uma camada de servidor para não expor credenciais no bundle.
