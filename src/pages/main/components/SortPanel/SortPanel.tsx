import React from 'react';
import classes from './SortPanel.module.scss';

interface SortPanelProps {
  onChangeSortingDirection?: (isDownDirection: boolean) => void;
  isDownDirection?: boolean;
}

const SortPanel: React.FC<SortPanelProps> = ({ onChangeSortingDirection = () => {}, isDownDirection = true }) => {
  return (
    <div className={classes['sort-panel']}>
      <div className={classes['sort-panel__title']}>SORT BY</div>
      <ul 
        className={classes['sort-panel__options']}
        onClick={() => onChangeSortingDirection(!isDownDirection)}
      >
        <li className={classes['sort-panel__option']}>
          RELEASE DATE     
          <div className={
            classes[isDownDirection ? "sort-panel__arrow-down" : "sort-panel__arrow-up"]
          }></div>
        </li>
      </ul>
    </div>
  );
}

export default SortPanel;
