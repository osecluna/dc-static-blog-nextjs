import { NextPage } from 'next';
import Layout from '../layouts/default';
import HeroBanner from '../components/hero-banner/hero-banner';
import { BlogListData } from '../common/interfaces/blog-list.interface';
import BlogList from '../components/blog-list/blog-list';
import HeroCard from '../components/hero-card/hero-card';
import { NextSeo } from 'next-seo';
import getHydratedBlogList from '../common/services/blog-reference-list.service';
import NoBlogPosts from '../components/blog-list/no-blog-posts';
import Search from '../components/search/search';

const Index: NextPage<BlogListData> = ({ title, subTitle, blogPosts }) => {
  const seoParams: { [key: string]: string | boolean } = {
    title,
    description: subTitle
  };

  if (process.env.ROBOTS_META_TAG_NOINDEX === 'true') {
    seoParams.noindex = true;
  }

  return (
    <Layout>
      <NextSeo {...seoParams} />
      <HeroBanner title={title} subTitle={subTitle} />
      {blogPosts.length ? (
        <>
          <Search />
          <HeroCard blogPost={blogPosts[0]} />
          <BlogList blogPosts={blogPosts.slice(1)} />
        </>
      ) : (
        <NoBlogPosts />
      )}

      <style jsx>{`
        :global(footer) {
          margin-top: 120px;
        }
      `}</style>
    </Layout>
  );
};

Index.getInitialProps = async ({ query }): Promise<BlogListData> => {
  const stagingEnvironment = query.vse ? `//${query.vse.toString()}` : undefined;
  const id: string = process.env.DYNAMIC_CONTENT_REFERENCE_ID || '';
  try {
    return getHydratedBlogList(id, stagingEnvironment);
  } catch (err) {
    console.error('Unable to get initial props for Index:', err);
    throw err;
  }
};

export default Index;
