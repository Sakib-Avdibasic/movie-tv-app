import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Error from './Error';
import { Media } from '../App';
import {fetchData} from '../utils';
import {apiKey} from '../axios';
import './DetailsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const DetailsPage: FC = () => {
  const [details, setDetails] = useState<Media>({} as Media);
  const [trailerUrl, setTrailerUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const {type, id} = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
    if(location.state !== null) setDetails(location.state.media)
    else {
      const {isSuccess, data, errMsg} = await fetchData(`/${type}/${id}?api_key=${apiKey}`);
      if(isSuccess) setDetails(data);
      else setError(errMsg)
    }
    })();

    (async () => {
      let {isSuccess, data} = await fetchData(`/${type}/${id}/videos?api_key=${apiKey}`);
      if(isSuccess) {
        data = data.results;
        const trailerIdx = data.findIndex((r:any) => r.type === 'Trailer');
        if(trailerIdx !== -1) setTrailerUrl(`https://www.youtube.com/embed/${data[trailerIdx].key}`);
      }
      // No need to set error here because we still have cover image
    })();
  }, [])

  const title = details.title || details.name;
  return <>
      <button id="back-button" onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faChevronLeft} />&nbsp;
        Back
      </button>
      { error ? <Error message={error} /> :
        <section id="details-container">
          {trailerUrl ? 
          <iframe src={trailerUrl} title={`${title} trailer`} allowFullScreen />
          : <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${details.poster_path}`} alt={`${title} poster`}/>}
          <h2>{title}</h2>
          <h3>
            <span>
              {new Date(details.release_date || details.first_air_date).toLocaleDateString('en-EN', {month: 'short', day: 'numeric', year: 'numeric'})}&nbsp;
              </span>
            <span>  
              <FontAwesomeIcon icon={faStar} color='#c39400'/>&nbsp;
              {details.vote_average?.toFixed(1)}
            </span>
          </h3>
          <p className='summary'>{details.overview || 'No description'}</p>
        </section>
      }
    </>
};

export default DetailsPage;
