'use client';

import css from './NotesPage.module.css';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

import Link from 'next/link';

import { fetchNotes } from '@/lib/api/clientApi';

export default function NotesClient({ tag }: { tag: string | undefined }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, 300);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', searchQuery, tag, page],
    queryFn: () => fetchNotes(searchQuery, tag, page),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  if (error) {
    throw error;
  }

  const totalPages = data?.totalPages ?? 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox text={searchQuery} onSearch={handleSearch} />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            onPageChange={setPage}
            currentPage={page}
          />
        )}

        <Link href={`/notes/action/create`}>
          <button className={css.button}>Create note +</button>
        </Link>
      </header>
      {isLoading && <strong>Loading tasks...</strong>}

      {data && !isLoading && <NoteList notes={data.notes} />}
    </div>
  );
}
