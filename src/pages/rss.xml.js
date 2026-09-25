import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const allArticles = await getCollection('articles');
  const articles = allArticles
    .filter((a) => !a.data.draft)
    .sort((a, b) => new Date(b.data.publishedDate) - new Date(a.data.publishedDate));

  return rss({
    title: 'EduGlossary',
    description: 'Technology terms and articles, explained clearly.',
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishedDate,
      link: `/articles/${article.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
