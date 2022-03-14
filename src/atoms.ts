import { atom } from 'recoil';

export const isDarkAtom = atom({
  key: 'isDark',
  default: false,
});

export const isCheckedAtom = atom({
  key: 'isCheck',
  default: false,
});
