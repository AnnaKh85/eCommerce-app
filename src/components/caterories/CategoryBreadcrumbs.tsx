import { Breadcrumbs, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';

import type { ICategory } from '../../services/interfaces.ts';
import { useCategories } from './useCategories.ts';

interface CategoryBreadcrumbsProps {
  selectedCategory: string | null;
  setSelectedCategory: (id: string | null) => void;
}

const CategoryBreadcrumbs: React.FC<CategoryBreadcrumbsProps> = ({ selectedCategory, setSelectedCategory }) => {
  const [selectedCategoryPath, setSelectedCategoryPath] = useState<ICategory[]>([]);
  const { categories } = useCategories();

  useEffect(() => {
    if (selectedCategory && categories) {
      const path = getCategoryPath(selectedCategory, categories.results);
      setSelectedCategoryPath(path);
    }
  }, [selectedCategory, categories]);

  const getCategoryPath = (categoryId: string | null, categories: ICategory[]): ICategory[] => {
    if (!categoryId) return [];
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return [];
    const ancestors = category.ancestors
      .map((ancestor) => categories.find((c) => c.id === ancestor.id))
      .filter((c) => c !== undefined) as ICategory[];
    return [...ancestors, category];
  };

  const handleDeleteCategory = () => {
    setSelectedCategory(null);
    setSelectedCategoryPath([]);
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" onClick={handleDeleteCategory} sx={{ cursor: 'pointer' }}>
        All products
      </Link>
      {selectedCategoryPath.map((category) => (
        <Link
          key={category.id}
          color="inherit"
          onClick={() => setSelectedCategory(category.id)}
          sx={{ cursor: 'pointer' }}
        >
          {category.name['en-GB']}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default CategoryBreadcrumbs;
