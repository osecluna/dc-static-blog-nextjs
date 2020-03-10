import React from 'react';
import theme from '../../common/styles/default/theme';
import Logo from '../logo/logo';
import StaticLink from '../static-link/static-link';
import { useRouter } from 'next/router';

// Algolia instant search (https://www.algolia.com/doc/guides/building-search-ui/installation/react/)
import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, Hits, RefinementList, Configure } from 'react-instantsearch-dom';
const searchClient = algoliasearch('MB93T4YY9A', '4377783a28adfbeef3d5aa6476672b7a');

const Hit = ({ hit }: {hit: {title: string}}) => <p>{hit.title}</p>;

const Header = ({ title }: { title: string }) => {
  const router = useRouter();
  const { vse } = router.query;

  const headerLink = vse ? `/?vse=${vse}` : '/';
  return (
    <>
      <section>
        <header>
          <StaticLink href={headerLink}>
            <Logo darkMode={true} />
          </StaticLink>
          <h1>{title}</h1>
        </header>
      </section>
      <section>
        <InstantSearch searchClient={searchClient} indexName="nextjsblogwebhook">
          <Configure facetingAfterDistinct={true} />
          <SearchBox searchAsYouType={false} />
          <Hits hitComponent={Hit} />
          <RefinementList attribute="authorName" />
        </InstantSearch>
      </section>

      <style jsx>{`
        section {
          display: flex;
          flex: 1 0 auto;
          justify-content: center;
          background-color: ${theme.colors.mirage};
          color:#cccccc
        }
        header {
          display: flex;
          align-items: center;
          min-height: 75px;
          width: ${theme.layout.widePageWidth};
          margin: 0 12px;
        }
        h1 {
          font-size: ${theme.fonts.size.large};
          font-weight: ${theme.fonts.weight.medium};
          text-transform: uppercase;
          color: white;
          border-left: 1px solid ${theme.colors.dustyGray};
          margin-left: 18px;
          padding-left: 18px;
        }
        @media (max-width: ${theme.layout.narrowPageWidth}) {
          h1 {
            font-size: ${theme.fonts.size.small};
          }

          header {
            min-height: 60px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
