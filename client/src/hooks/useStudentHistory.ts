
import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface HistoryEntry {
  id: number;
  timestamp: number;
  studentId: number | null;
  studentName: string;
  studentImage?: string;
  action: string;
  details: string;
  type: 'edit' | 'exercise' | 'diet' | 'supplement' | 'delete';
  description: string;
}

export function useStudentHistory() {
  const queryClient = useQueryClient();

  // Load history from API
  const { data: historyEntries = [], isLoading: loading } = useQuery({
    queryKey: ['/api/student-history'],
    queryFn: async () => {
      const response = await fetch('/api/student-history', {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Failed to fetch student history');
      const data = await response.json();
      
      // Normalize entries for consistency
      return data.map((entry: any) => ({
        ...entry,
        timestamp: typeof entry.timestamp === 'string' ? new Date(entry.timestamp).getTime() : entry.timestamp,
        type: entry.type || (entry.action as 'edit' | 'exercise' | 'diet' | 'supplement' | 'delete'),
        description: entry.description || entry.details
      }));
    }
  });

  // Add new entry to history via API
  const addHistoryMutation = useMutation({
    mutationFn: async (entry: HistoryEntry) => {
      const response = await fetch('/api/student-history', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
      if (!response.ok) throw new Error('Failed to add history entry');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/student-history'] });
    }
  });

  // Clear history entries via API
  const clearHistoryMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/student-history', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Failed to clear history');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/student-history'] });
    }
  });

  const addHistoryEntry = useCallback(async (entry: HistoryEntry) => {
    console.log("Adding new history entry:", entry);
    try {
      await addHistoryMutation.mutateAsync(entry);
    } catch (error) {
      console.error('خطا در اضافه کردن تاریخچه:', error);
      // Avoid rethrowing the error to prevent UI disruption
      return false;
    }
    return true;
  }, [addHistoryMutation]);

  const clearHistory = useCallback(async () => {
    console.log("Clearing all history entries");
    try {
      await clearHistoryMutation.mutateAsync();
    } catch (error) {
      console.error('خطا در پاک کردن تاریخچه:', error);
    }
  }, [clearHistoryMutation]);

  return {
    historyEntries,
    addHistoryEntry,
    clearHistory,
    loading
  };
}
