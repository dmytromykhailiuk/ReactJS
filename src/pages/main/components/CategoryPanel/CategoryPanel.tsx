import React, { useCallback, useState } from "react";
import { categories } from "../../../../mocks";
import classes from "./CategoryPanel.module.scss";

interface CategoryPanelProps {
  onChangeCategories?: (category: string) => void;
}

const ALL = 'ALL';

const CategoryPanel: React.FC<CategoryPanelProps> = ({onChangeCategories = () => {}}) => {
  const [selectedCategory, selectCategory] = useState("ALL");

  const onSelectCategory = useCallback((selectedCategory: string) => {
    selectCategory(selectedCategory);
    onChangeCategories(selectedCategory);
  }, []);

  return (
    <ul className={classes['category-panel']}>
      <li 
        className={`${classes['category-panel__item']} 
          ${selectedCategory === ALL ? classes['category-panel__item--active'] : ''}`
        }
        onClick={() => onSelectCategory(ALL)}
      >{ ALL }</li>
      { 
        categories.map(category => (
          <li 
            key={category}
            className={`${classes['category-panel__item']} 
              ${category === selectedCategory ? classes['category-panel__item--active'] : ''}`
            }
            onClick={() => onSelectCategory(category)}
          > 
            { category }
          </li>
        )) 
      }
    </ul>
  );
}

export default CategoryPanel;
