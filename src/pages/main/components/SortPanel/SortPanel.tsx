import React, { useCallback, useState } from 'react';
import classes from './SortPanel.module.scss';

interface SortPanelProps {
  onChangeSortingDirection?: (isDownDirection: boolean) => void;
}

const SortPanel: React.FC<SortPanelProps> = ({ onChangeSortingDirection = () => {} }) => {
  const [isDown, changeDirection] = useState(true);

  const onChangeDirection = useCallback((isDown: boolean) => {
    changeDirection(!isDown);
    onChangeSortingDirection(!isDown);
  }, []);

  return (
    <div className={classes['sort-panel']}>
      <div className={classes['sort-panel__title']}>SORT BY</div>
      <ul 
        className={classes['sort-panel__options']}
        onClick={() => onChangeDirection(isDown)}
      >
        <li className={classes['sort-panel__option']}>
          RELEASE DATE     
          <div className={
            classes[isDown ? "sort-panel__arrow-down" : "sort-panel__arrow-up"]
          }></div>
        </li>
      </ul>
    </div>
  );
}

export default SortPanel;
