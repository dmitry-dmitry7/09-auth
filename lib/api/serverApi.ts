import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
import type { Note } from '@/types/note';

export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб proxy мав доступ до нових cookie
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchServerNotes = async (
  searchText: string,
  tag: string | undefined,
  page: number
): Promise<NotesHttpResponse> => {
  const cookieStore = await cookies();
  const config = {
    params: {
      search: searchText,
      tag,
      page,
      perPage: 12,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  };

  const res = await nextServer.get<NotesHttpResponse>('/notes', config);
  return res.data;
};

export const fetchServerNoteById = async (noteId: string): Promise<Note> => {
  const cookieStore = await cookies();
  const config = {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };

  const res = await nextServer.get<Note>(`/notes/${noteId}`, config);
  return res.data;
};
