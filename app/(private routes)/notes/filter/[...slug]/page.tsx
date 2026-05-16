import { Metadata } from 'next';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchServerNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Tag: ${slug[0]}`,
    description: `Filter by Tag: ${slug[0]}`,
    openGraph: {
      title: `Tag: ${slug[0]}`,
      description: `Filter by Tag: ${slug[0]}`,
      url: `http://localhost:3000/notes/filter/${slug[0]}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'Og Image Alt',
        },
      ],
    },
  };
}

export default async function Notes({ params }: Props) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', tag, 1],
    queryFn: () => fetchServerNotes('', tag, 1),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
