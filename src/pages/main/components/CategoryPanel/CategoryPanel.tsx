import React from "react";
import { categories } from "mocks";
import { Categories } from "shared/enums";
import classes from "./CategoryPanel.module.scss";

interface CategoryPanelProps {
  onChangeCategory?: (category: string) => void;
  selectedCategory?: string;
}

const CategoryPanel: React.FC<CategoryPanelProps> = ({onChangeCategory = () => {}, selectedCategory = ''}) => {

  return (
    <ul className={classes['category-panel']}>
      <li 
        className={`${classes['category-panel__item']} 
          ${selectedCategory === Categories.ALL ? classes['category-panel__item--active'] : ''}`
        }
        onClick={() => onChangeCategory(Categories.ALL)}
      >{ Categories.ALL }</li>
      { 
        categories.map(category => (
          <li 
            key={category}
            className={`${classes['category-panel__item']} 
              ${category === selectedCategory ? classes['category-panel__item--active'] : ''}`
            }
            onClick={() => onChangeCategory(category)}
          > 
            { category }
          </li>
        )) 
      }
    </ul>
  );
}

export default CategoryPanel;
