export interface Assessment {
  id: string,
  name: string,
  score: number,
  total: number,
}

export interface Subcategory {
  id: string,
  weight: number,
  name: string,
  assessments: Assessment[],
}

export interface Category {
  id: string,
  weight: number,
  name: string,
  subcategories: Subcategory[],
}

export interface SubjectData {
  name: string,
  teacher: string,
  categories: Category[],
}