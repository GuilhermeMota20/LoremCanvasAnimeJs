import { useEffect, useState } from 'react';
import { usePrismicContent } from '@/app/config/content-source';
import { portfolio, type PortfolioContent } from '@/features/portfolio-experience/data/portfolio';
import { getPrismicPortfolioContent } from '@/features/portfolio-experience/data/prismic';

export function usePortfolioContent(): PortfolioContent {
  const [content, setContent] = useState<PortfolioContent>(portfolio);

  useEffect(() => {
    if (!usePrismicContent) return;

    let active = true;
    getPrismicPortfolioContent()
      .then((nextContent) => {
        if (active) setContent(nextContent);
      })
      .catch((error: unknown) => {
        console.error(
          'Não foi possível carregar o conteúdo do Prismic. Usando o fallback local.',
          error,
        );
      });

    return () => {
      active = false;
    };
  }, []);

  return content;
}
