import React from 'react';
import { Helmet } from 'react-helmet-async';
import { lightTheme } from '../themes/theme';

const SEO: React.FC<{
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  canonical?: string;
}> = ({
  title = lightTheme.meta.title,
  description = lightTheme.meta.description,
  image = lightTheme.meta.image,
  keywords = lightTheme.meta.keywords,
  canonical = lightTheme.meta.url,
}) => {
  return (
    <Helmet
      title={title}
      titleTemplate={`%s | ${lightTheme.meta.title}`}
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
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:image',
          content: image,
        },
        {
          property: 'og:url',
          content: canonical,
        },
        {
          property: 'og:type',
          content: 'website',
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
          content: image,
        },
      ]}
      link={[{
        rel: 'canonical',
        href: canonical,
      }]}
    />
  );
};

export default SEO;
