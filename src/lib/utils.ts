import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {createElement, Fragment} from 'react'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const NEWLINE_REGEX = /\r\n|\r|\n/g;
export const nl2br = (text: string) =>
  text
    .split(NEWLINE_REGEX)
    .map((line, key) =>
      createElement(Fragment, {key}, key > 0 && createElement('br'), line),
    );
