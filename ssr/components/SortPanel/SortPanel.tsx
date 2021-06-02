import React, { useCallback, useState } from 'react';
import classes from './SortPanel.module.scss';
import { SortingOptions, SortingOptionsProperties } from '../../shared/enums';
import { useClickOutside } from '../../shared/hooks';

interface SortPanelProps {
  isDownDirection: boolean;
  sortingOption: SortingOptionsProperties;
  onChangeSortingDirection: (isDownDirection: boolean) => void;
  setSortingOption: (sortingOption: SortingOptionsProperties) => void;
}

const sortingOptions: SortingOptionsProperties[] = [
  SortingOptionsProperties.RELEASE_DATE,
  SortingOptionsProperties.TITLE,
  SortingOptionsProperties.RATING,
  SortingOptionsProperties.DURATION,
];

const SortPanel: React.FC<SortPanelProps> = ({
  isDownDirection,
  sortingOption,
  setSortingOption,
  onChangeSortingDirection,
}) => {
  const [shouldShowOptions, setShouldShowOptionsValue] = useState(false);

  const triggerSetShouldShowOptionsValue = useCallback(() => {
    setShouldShowOptionsValue(!shouldShowOptions);
  }, [shouldShowOptions]);

  const hideOptions = useCallback(() => {
    setShouldShowOptionsValue(false);
  }, []);

  const onSetSortingOption = useCallback((sortingOption, shouldShowOptions) => {
    setShouldShowOptionsValue(!shouldShowOptions);
    setSortingOption(sortingOption);
  }, []);

  useClickOutside(classes['sort-panel__options-wrapper'], hideOptions, shouldShowOptions);

  const onChangeDirection = useCallback(() => {
    onChangeSortingDirection(!isDownDirection);
  }, [isDownDirection]);

  return (
    <div className={classes['sort-panel']}>
      <div className={classes['sort-panel__options-wrapper']}>
        <div className={classes['sort-panel__title']} onClick={triggerSetShouldShowOptionsValue}>
          SORT BY
        </div>
        {shouldShowOptions && (
          <div className={classes['sort-panel__options']}>
            {sortingOptions.map((sortingOption) => (
              <div
                className={classes['sort-panel__option']}
                key={sortingOption}
                onClick={() => onSetSortingOption(sortingOption, shouldShowOptions)}
              >
                {SortingOptions[sortingOption]}
              </div>
            ))}
          </div>
        )}
      </div>
      <ul className={classes['sort-panel__selected-option-wrapper']} onClick={onChangeDirection}>
        <li className={classes['sort-panel__selected-option']}>
          {SortingOptions[sortingOption]}
          <div className={classes[isDownDirection ? 'sort-panel__arrow-down' : 'sort-panel__arrow-up']}></div>
        </li>
      </ul>
    </div>
  );
};

export default SortPanel;
