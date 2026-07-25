/** Join the last two words with a non-breaking space — no orphan words. */
export const noWidow = (s: string) => s.replace(/ (?=[^ ]+$)/, " ");
