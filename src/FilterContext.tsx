import {createContext, Dispatch, SetStateAction} from 'react';

type FilterContextType = {
     query: string,
     setQuery: Dispatch<SetStateAction<string>>,
     chosenTab: number,
     setChosenTab: Dispatch<SetStateAction<number>>
 }

const FilterContext = createContext<FilterContextType>({} as FilterContextType);

export default FilterContext;






