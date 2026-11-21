import { createClient } from '@prismicio/client';
import { prismicRepositoryName } from '@/app/config/content-source';
import type { PortfolioContent } from '@/features/portfolio-experience/data/portfolio';

const documentType = 'portfolio_content';

function isPortfolioContent(value: unknown): value is PortfolioContent {
  if (!value || typeof value !== 'object') return false;
  const content = value as Partial<PortfolioContent>;
  return Boolean(
    content.meta &&
    content.header &&
    content.hero &&
    content.gallery &&
    content.about &&
    content.contact &&
    content.overlay &&
    Array.isArray(content.projects),
  );
}

/**
 * Busca o Single Type `portfolio_content` no Prismic.
 *
 * O tipo deve conter o campo Key Text `content_json` com o JSON que segue o
 * contrato PortfolioContent. Essa estratégia mantém o front-end independente
 * do formato de edição do CMS e permite evoluir o modelo sem alterar a UI.
 */
export async function getPrismicPortfolioContent(): Promise<PortfolioContent> {
  if (!prismicRepositoryName) {
    throw new Error('VITE_PRISMIC_REPOSITORY_NAME deve ser definido para usar o Prismic.');
  }

  const client = createClient(prismicRepositoryName);
  const document = await client.getSingle(documentType);
  const rawContent = document.data.content_json;

  if (typeof rawContent !== 'string') {
    throw new Error('O campo content_json do Prismic deve conter um JSON válido.');
  }

  let content: unknown;
  try {
    content = JSON.parse(rawContent);
  } catch {
    throw new Error('O campo content_json do Prismic não contém JSON válido.');
  }

  if (!isPortfolioContent(content)) {
    throw new Error('O conteúdo do Prismic não segue o contrato PortfolioContent.');
  }

  return content;
}
