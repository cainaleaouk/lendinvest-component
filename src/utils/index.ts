const TITLE_MAX_LENGTH = 25;

//@TODO: Added this as a "hacky" solution because I was having problem using text-overflow: elipsis
export const getTruncatedTitle = (title: string): string =>
    title.length <= TITLE_MAX_LENGTH ? title : `${title.substring(0, TITLE_MAX_LENGTH)}...`;