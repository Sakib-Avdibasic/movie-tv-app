import {FC} from 'react'
import './Error.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

type ErrorProps = {
  message: string
}

const Error:FC<ErrorProps> = ({message}) => {
  return <article className='err-msg'>
    <FontAwesomeIcon icon={faExclamationTriangle} color='red' fontSize={'1.5em'}/>
    <p>{message}</p>
    </article>
}

export default Error;