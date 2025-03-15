import slugify from 'slugify';

const generateShortUUID = (length = 6): string => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
};

const generateSlug = (text: string, length: number = 0): string => {
  if (!text) throw new Error('Text is required to generate slug');
  const randomStr: string = length > 0 ? `-${generateShortUUID(length)}` : '';
  return slugify(text + randomStr, { lower: true, strict: true });
};

export default generateSlug;
