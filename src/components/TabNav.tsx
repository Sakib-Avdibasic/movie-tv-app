import { FC, useContext } from "react";
import { TabOption } from "./SearchPage";
import './TabNav.css';
import FilterContext from "../FilterContext";

interface TabNavProps {
  tabs: TabOption[],
}

const TabNav: FC<TabNavProps> = ({tabs}) => {
  const filterContext = useContext(FilterContext);
  return <ul id="tab-menu">
    {tabs.map((t, idx) =>
      <li key={idx}>
        <button onClick={() => filterContext.setChosenTab(idx)} className={filterContext.chosenTab === idx ? 'active-tab': ''}>{t.name}</button>
      </li>)
    }
    </ul>
} 

export default TabNav;