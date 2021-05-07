import React from 'react';
import { categories } from 'mocks';
import { Categories } from 'shared/enums';
import classnames from 'classnames';
import classes from './CategoryPanel.module.scss';

interface CategoryPanelProps {
  selectedCategory: string;
  onChangeCategory: (category: string) => void;
}

const CategoryPanel: React.FC<CategoryPanelProps> = ({ selectedCategory, onChangeCategory }) => (
  <ul className={classes['category-panel']}>
    <li
      className={classnames(classes['category-panel__item'], {
        [classes['category-panel__item--active']]: selectedCategory === Categories.ALL,
      })}
      onClick={() => onChangeCategory(Categories.ALL)}
    >
      {Categories.ALL}
    </li>
    {categories.map((category) => (
      <li
        key={category}
        className={classnames(classes['category-panel__item'], {
          [classes['category-panel__item--active']]: selectedCategory === category,
        })}
        onClick={() => onChangeCategory(category)}
      >
        {category}
      </li>
    ))}
  </ul>
);

export default CategoryPanel;
