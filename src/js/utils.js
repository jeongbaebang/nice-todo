/**
 *
 * @param {?string} tag
 * @returns {Element}
 */
export const $ = (tag) => {
  if (typeof tag !== 'string' || tag === '') {
    throw new TypeError('It must be a valid tag name.');
  }

  const $tag = document.querySelector(tag);

  if ($tag === null) {
    throw new Error(`Invalid tag:${tag}`);
  }

  return $tag;
};
