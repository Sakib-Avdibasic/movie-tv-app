import { useEffect, useState, useContext, FC } from "react";
import { Link } from "react-router-dom";
import TabNav from "./TabNav";
import MediaCard from "./MediaCard";
import Error from "./Error";
import { Media } from "../App";
import FilterContext from "../FilterContext";
import {fetchData} from "../utils";
import {apiKey} from '../axios';
import './SearchPage.css';

export type TabOption = {
  name: string,
  code: string
}
const tabs:TabOption[] = [{name: 'movies', code: 'movie'}, {name: 'TV shows', code: 'tv'}];
type MediaCache = {
  code: string,
  items: Media[]
}

const SearchPage: FC = () => {
  const [cachedMedia, setCachedMedia] = useState<MediaCache[]>(
    JSON.parse(sessionStorage.getItem('cachedMedia') || '[]')
  ); 
  const [displayedMedia, setDisplayedMedia] = useState<Media[] | null>(null);
  const [error, setError] = useState<string>('');
  const {query, setQuery, chosenTab} = useContext(FilterContext);

  useEffect(() => {
    let timer1: ReturnType<typeof setTimeout>;
    const isQuery = query.length >= 3;
    timer1 = setTimeout(async () => {
      const code = `${tabs[chosenTab].code}${isQuery ? query.toLowerCase(): ''}`;
      const idx = cachedMedia.findIndex(m => m.code === code);
      if(idx > -1) setDisplayedMedia(cachedMedia[idx].items);
      else {
        let {isSuccess, data, errMsg} = await fetchData(isQuery ? `/search/${tabs[chosenTab].code}?api_key=${apiKey}&query=${query}` : `/${code}/top_rated?api_key=${apiKey}`);
        if(isSuccess) {
          data = data.results.slice(0,10);
          setDisplayedMedia(data);
          setCachedMedia([...cachedMedia, {code: code, items: data }]);
        } else setError(errMsg);
      }
      }, isQuery && displayedMedia ? 1000 : 0)
    return () => clearTimeout(timer1);
  }, [query, chosenTab])

  useEffect(() => {
    sessionStorage.setItem('cachedMedia', JSON.stringify(cachedMedia));
    if(cachedMedia.length > tabs.length * 2) {
      const newCache = JSON.parse(JSON.stringify(cachedMedia));
      newCache.splice(newCache.findIndex((x:MediaCache) => {
        const cacheCode = x.code;
        const tabCode = tabs[chosenTab].code;
        return cacheCode.includes(tabCode) && cacheCode.length > tabCode.length;
      }), 1);
      setCachedMedia(newCache);
    }
  }, [cachedMedia])


  return <>
      <TabNav tabs={tabs}/>
      <input type="search" name="movie-title" id="movie-title" placeholder={`Search ${tabs[chosenTab].name}...`} autoFocus value={query} onChange={e => setQuery(e.target.value)}/>
      {error ? <Error message={error} />:
        <section id="results-container">
              {displayedMedia?.length === 0 ? <p>No results</p> : 
              displayedMedia?.map((media, idx) => 
              <Link to={`${tabs[chosenTab].code}/${media.id}`} state={{media: media}} key={idx}>
                <MediaCard media={media}/>
              </Link>)}
        </section>
      } 
    </>
}

export default SearchPage;