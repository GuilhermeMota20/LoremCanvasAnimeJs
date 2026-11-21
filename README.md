<div align="center">

# Lorem Canvas AnimeJs

### Portfólio interativo em React

[![React](https://img.shields.io/badge/React-19-0c2b22?logo=react&logoColor=edf6e9)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3d8c5a?logo=typescript&logoColor=edf6e9)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-82c99a?logo=vite&logoColor=0c2b22)](https://vite.dev/)
[![Anime.js](https://img.shields.io/badge/Anime.js-4.5-4e705d?logo=javascript&logoColor=edf6e9)](https://animejs.com/)
[![Prismic](https://img.shields.io/badge/Prismic-CMS-3d8c5a?logo=prismic&logoColor=edf6e9)](https://prismic.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-82c99a?logo=tailwindcss&logoColor=0c2b22)](https://tailwindcss.com/)

![Mockup editorial do portfólio Lorem Ipsum](docs/assets/portfolio-mockup.png)

</div>

> Uma experiência de portfólio ilustrativa com navegação horizontal, galeria de projetos e visual editorial em tons verdes.

## Objetivo

Explorar uma interface de portfólio com navegação por seções, transições visuais e interação contextual para apresentar projetos de forma mais dinâmica do que uma landing page convencional. O **Anime.js** orquestra as entradas dos conteúdos por seção, criando uma experiência mais fluida, intuitiva e personalizada sem comprometer a preferência de redução de movimento do sistema. A arquitetura também está preparada para integrar o **Prismic CMS**, permitindo atualizar textos, imagens e links externos sem alterar os componentes da interface.

## Recursos

- Navegação entre início, galeria, sobre e contato.
- Cards de projeto com prévia por hover e modal de detalhes.
- Layout responsivo: modal central no desktop e painel inferior no mobile.
- Entradas sequenciadas com Anime.js, parallax e tokens de tema para uma identidade visual consistente.
- Navegação por teclado, swipe e suporte a `prefers-reduced-motion`.

## Arquitetura

A aplicação é organizada por domínio para separar composição de tela, regras de interação e interface. A página inicial apenas monta a feature principal; a experiência do portfólio concentra seus componentes, dados, hooks e estilos co-localizados.

```text
src/
├── app/        # Configuração, estilos globais e bootstrap
├── pages/      # Composição das telas
└── features/
    └── portfolio-experience/
        ├── components/  # Header, slides, modal, mídia e ornamentos
        ├── hooks/       # Navegação, parallax, modal e animações
        ├── data/        # Dados tipados dos projetos
        └── styles/      # Layout e responsividade
```

O Tailwind CSS v4 fornece a base de utilitários e expõe os tokens semânticos da paleta para os componentes. O CSS co-localizado permanece responsável pelos detalhes autorais — máscaras, ruído, keyframes e composições decorativas — sem espalhar valores estáticos. Anime.js orquestra as entradas, enquanto CSS sustenta animações contínuas de baixo custo.

## Tecnologias e skills

`React 19` · `TypeScript` · `Vite` · `Tailwind CSS` · `Anime.js` · `Prismic CMS` · `Font Awesome`

## Conteúdo

O portfólio renderiza os dados locais de `data/portfolio.ts` por padrão. Todo texto, mídia e redirecionamento da interface compartilha o mesmo contrato de conteúdo, permitindo migrar para o CMS sem alterar os componentes.

### Prismic CMS

A integração opcional com Prismic CMS está pronta para buscar o Single Type `portfolio_content`.

```dotenv
VITE_USE_PRISMIC=true
VITE_PRISMIC_REPOSITORY_NAME=nome-do-seu-repositorio
```

Sem essas configurações — ou em caso de erro na API — a aplicação mantém automaticamente os dados locais como fallback. Veja o [guia de configuração do Prismic](docs/PRISMIC.md) para o contrato de conteúdo, mídias e links externos.

## Executar

```bash
npm install
npm run dev
```
