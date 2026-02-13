export interface Breed {
  id: string;
  name: string;
}

export interface BreedCatalog {
  species: "dog" | "cat";
  breeds: Breed[];
}
