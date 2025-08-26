
import { useState, useMemo, useCallback } from 'react';
import { Student } from '@/components/students/StudentTypes';

export function useStudentFiltering(students: Student[]) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Handle clearing search
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // Toggle sort order
  const toggleSort = useCallback((field: string) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  }, [sortField]);

  // Filter and sort students
  const sortedAndFilteredStudents = useMemo(() => {
    // First filter by search query
    let filteredStudents = students;
    
    if (searchQuery.trim()) {
      const normalizedQuery = searchQuery.trim().toLowerCase();
      
      filteredStudents = students.filter(student => {
        return (
          student.name?.toLowerCase().includes(normalizedQuery) ||
          student.phone?.toLowerCase().includes(normalizedQuery) ||
          student.height?.toString().includes(normalizedQuery) ||
          student.weight?.toString().includes(normalizedQuery)
        );
      });
    }
    
    // Then sort
    return [...filteredStudents].sort((a, b) => {
      let valueA: any = a[sortField as keyof Student];
      let valueB: any = b[sortField as keyof Student];
      
      // Convert to strings for comparison
      if (valueA === undefined) valueA = '';
      if (valueB === undefined) valueB = '';
      
      valueA = valueA.toString().toLowerCase();
      valueB = valueB.toString().toLowerCase();
      
      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [students, searchQuery, sortField, sortOrder]);

  return {
    searchQuery,
    setSearchQuery,
    sortField,
    sortOrder,
    toggleSort,
    sortedAndFilteredStudents,
    handleClearSearch
  };
}
