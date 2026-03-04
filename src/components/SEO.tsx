import React from 'react';
import { Helmet } from 'react-helmet-async';
import { lightTheme } from '../themes/theme';

type StructuredData = Record<string, unknown> | Array<Record<string, unknown>>;

const SEO: React.FC<{
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  canonical?: string;
  noIndex?: boolean;
  structuredData?: StructuredData;
  type?: 'website' | 'article';
  disableTitleTemplate?: boolean;
}> = ({
  title = lightTheme.meta.title,
  description = lightTheme.meta.description,
  image = lightTheme.meta.image,
  keywords = lightTheme.meta.keywords,
  canonical = lightTheme.meta.url,
  noIndex = false,
  structuredData,
  type = 'website',
  disableTitleTemplate = true,
}) => {
  const siteUrl = lightTheme.meta.url.replace(/\/$/, '');
  const canonicalUrl = canonical.startsWith('http')
    ? canonical
    : `${siteUrl}${canonical.startsWith('/') ? canonical : `/${canonical}`}`;
  const imageUrl = image.startsWith('http')
    ? image
    : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`;
  const useTitleTemplate = !disableTitleTemplate && title !== lightTheme.meta.title;

  return (
    <Helmet
      title={title}
      titleTemplate={useTitleTemplate ? `%s | ${lightTheme.meta.title}` : undefined}
      defaultTitle={lightTheme.meta.title}
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          name: 'keywords',
          content: keywords.join(', '),
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:site_name',
          content: lightTheme.meta.title,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:image',
          content: imageUrl,
        },
        {
          property: 'og:url',
          content: canonicalUrl,
        },
        {
          property: 'og:type',
          content: type,
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: description,
        },
        {
          name: 'twitter:image',
          content: imageUrl,
        },
        {
          name: 'twitter:url',
          content: canonicalUrl,
        },
        {
          name: 'robots',
          content: noIndex ? 'noindex, nofollow' : 'index, follow',
        },
      ]}
      link={[{
        rel: 'canonical',
        href: canonicalUrl,
      }]}
    >
      {structuredData ? (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      ) : null}
    </Helmet>
  );
};

export default SEO;
