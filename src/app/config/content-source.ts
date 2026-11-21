const enabledValues = new Set(['1', 'true', 'yes']);

export const usePrismicContent = enabledValues.has(
  (import.meta.env.VITE_USE_PRISMIC ?? 'false').trim().toLowerCase(),
);

export const prismicRepositoryName = import.meta.env.VITE_PRISMIC_REPOSITORY_NAME?.trim();
