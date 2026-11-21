# Portfólio Ilustrativo

Experiência interativa com conteúdo demonstrativo em Lorem Ipsum e navegação horizontal por seções.

## Arquitetura

```text
src/
  app/       bootstrap, configurações e estilos globais
  pages/     composição de telas
  features/  domínio do portfólio e sua experiência interativa
  shared/    espaço para capacidades reutilizáveis entre domínios
```

O domínio está isolado em `src/features/portfolio-experience`:

- `components/`: header, slides, ornamentos e painel de projeto;
- `hooks/`: controle da navegação e do painel;
- `data/`: dados de projetos e repertório;
- `PortfolioExperience.tsx`: composição da experiência.

Os tokens e o reset vivem em `src/app/styles/globals.css`; os estilos de cada componente ficam co-localizados na respectiva pasta.

## Comandos

```bash
npm install
npm run dev
npm run build
```
