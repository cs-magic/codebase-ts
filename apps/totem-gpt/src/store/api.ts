import { atom } from 'jotai';

export const responseIdAtom = atom<string | null>(null);
export const responseStatusAtom = atom<'idle' | 'running' | 'finished'>('idle');
export const responseTextAtom = atom('');
export const responseErrorAtom = atom<string | null>(null);
export const responseAtom = atom((get, options) => ({
  text: get(responseTextAtom),
  status: get(responseStatusAtom),
  id: get(responseIdAtom),
  error: get(responseErrorAtom),
}));
