# Arquitetura

O projeto preserva a separação `app → pages → features`.

- `app` inicializa a aplicação e concentra configurações e estilos globais necessários à identidade visual transversal.
- `pages` faz apenas a composição de tela.
- `features/portfolio-experience` concentra a experiência de navegação, os componentes específicos, dados e hooks do portfólio.

## Estilos

- `app/styles/globals.css` mantém somente tokens, reset e regras de documento.
- `features/portfolio-experience/styles/ExperienceLayout.css` compõe o canvas e a responsividade da experiência.
- Cada componente visual importa seu próprio arquivo co-localizado (`Header.css`, `Slides.css`, `ProjectOverlay.css`, `Ornaments.css` e `MediaFallback.css`).

Os componentes de domínio não são importados por `app` diretamente; a página Home é a fronteira de composição.
