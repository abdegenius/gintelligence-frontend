import { onMount } from "svelte";

export const __serialize = JSON.stringify;
// export const __deserialize = JSON.parse;

export const __deserialize = (key) =>
  JSON.parse(window.localStorage.getItem(key));

