import { nextServer } from './api';
import type { Note, NewNote } from '@/types/note';
import type { User } from '@/types/user';

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  searchText: string,
  tag: string | undefined,
  page: number
): Promise<NotesHttpResponse> => {
  const config = {
    params: {
      search: searchText,
      tag,
      page,
      perPage: 12,
    },
  };

  const res = await nextServer.get<NotesHttpResponse>('/notes', config);
  return res.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${noteId}`);
  return res.data;
};

export const createNote = async (newNote: NewNote) => {
  const res = await nextServer.post<Note>('/notes', newNote);
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const res = await nextServer.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export type UpdateUserRequest = {
  username: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};
