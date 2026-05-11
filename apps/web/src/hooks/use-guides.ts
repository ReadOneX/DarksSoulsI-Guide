'use client';

import { useQuery } from '@tanstack/react-query';
import { guideAPI } from '@darks-souls/api';

export function useBosses(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: ['bosses', page, pageSize],
    queryFn: async () => {
      const response = await guideAPI.getBosses(page, pageSize);
      if (!response.success) throw new Error('Failed to fetch bosses');
      return response.data;
    },
  });
}

export function useBoss(id: string | undefined) {
  return useQuery({
    queryKey: ['boss', id],
    queryFn: async () => {
      if (!id) return null;
      const response = await guideAPI.getBossById(id);
      if (!response.success) throw new Error('Failed to fetch boss');
      return response.data;
    },
    enabled: !!id,
  });
}

export function useAreas(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: ['areas', page, pageSize],
    queryFn: async () => {
      const response = await guideAPI.getAreas(page, pageSize);
      if (!response.success) throw new Error('Failed to fetch areas');
      return response.data;
    },
  });
}

export function useArea(id: string | undefined) {
  return useQuery({
    queryKey: ['area', id],
    queryFn: async () => {
      if (!id) return null;
      const response = await guideAPI.getAreaById(id);
      if (!response.success) throw new Error('Failed to fetch area');
      return response.data;
    },
    enabled: !!id,
  });
}
