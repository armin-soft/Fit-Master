
export interface StudentSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export interface StudentSortProps {
  sortField: "name" | "weight" | "height" | "progress";
  sortOrder: "asc" | "desc";
  toggleSort: (field: "name" | "weight" | "height" | "progress") => void;
}

export interface StudentSearchSortProps extends StudentSearchProps, StudentSortProps {}
