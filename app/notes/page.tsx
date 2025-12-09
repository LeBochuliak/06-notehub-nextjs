import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';
import NotesClient from './Notes.client';

type AppProps = {
  searchParams: Promise<{ page: number; search: string; perPage: number }>;
};

export default async function App({ searchParams }: AppProps) {
  const queryClient = new QueryClient();

  const { page, search, perPage } = await searchParams;

  queryClient.prefetchQuery({
    queryKey: ['notes', page, search, perPage],
    queryFn: () => fetchNotes({ search, page, perPage }),
    staleTime: 1000 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
