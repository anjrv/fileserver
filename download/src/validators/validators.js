import { param } from 'express-validator';

const illegalCharacterCheck = function (name) {
  const substrings = ['/', '?', '<', '>', '\\', ':', '*', '|'];

  if (substrings.some((v) => name.includes(v))) return true;

  return false;
};

export const fileValidator = param('fileName').custom(
  async (_id, { req = {} }) => {
    const { fileName } = req.params;

    if (fileName.length < 128 && !illegalCharacterCheck(fileName))
      return Promise.resolve();

    return Promise.reject(new Error('Illegal filename'));
  }
);
