// Algolia instant search (https://www.algolia.com/doc/guides/building-search-ui/installation/react/)
import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, Hits, RefinementList, Configure, Pagination } from 'react-instantsearch-dom';

const searchClient = algoliasearch('4BS5I6EVVD', 'aee681b872d4a9d08647deb20364583e');
const indexName = 'sfccamplienceproduct.blog-posts-production';
const Hit = ({ hit }: {hit: {title: string, description:string, deliveryKey:string, imagePath:string, readTime: number}}) => (
              <div className="blog-card-content">
              <h3><a href={`blog/${hit.deliveryKey}`}>{hit.title}</a></h3>
              <p>{hit.description}</p>
              <div>Read time: {hit.readTime} minutes</div>
              </div>
            );

const Search = () => {
  return (
    <>
      <div className="search-nav">
          <nav>
            <InstantSearch searchClient={searchClient} indexName={indexName}>
              <Configure hitsPerPage={10} />
              <SearchBox />
              <Hits hitComponent={Hit} />
              <h3>Authors</h3>
              <RefinementList attribute="authors" />
              <h3>Tags</h3>
              <RefinementList attribute="_tags" />
              <Pagination />
            </InstantSearch>
          </nav>
        </div>
    </>
  );
};

export default Search;
