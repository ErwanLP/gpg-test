'use strict';
const implementation = require('./implementation');

const JSON_DATA = {
  'glossary': {
    'title': 'example glossary',
    'GlossDiv': {
      'title': 'S',
      'GlossList': {
        'GlossEntry': {
          'ID': 'SGML',
          'SortAs': 'SGML',
          'GlossTerm': 'Standard Generalized Markup Language',
          'Acronym': 'SGML',
          'Abbrev': 'ISO 8879:1986',
          'GlossDef': {
            'para': 'A meta-markup language, used to create markup languages such as DocBook.',
            'GlossSeeAlso': ['GML', 'XML'],
          },
          'GlossSee': 'markup',
        },
      },
    },
  },
};
const JSON_FILE_PATH = 'data.json';
const SIGNATURE_FILE_PATH = 'data.sig';
const KEY = 'UqF7w5SvKMnUacSZ';

(async () => {
  const FINGERPRINT_RAM = implementation.getFingerPrintRAM(JSON_DATA);
  console.log('FINGERPRINT_RAM  : ', FINGERPRINT_RAM);
  await implementation.createJsonFile(JSON_FILE_PATH, JSON_DATA);
  const FINGERPRINT_FILE = await implementation.getFingerPrintFile(
      JSON_FILE_PATH);
  console.log('FINGERPRINT_FILE : ', FINGERPRINT_FILE);
  console.log('FINGERPRINT_RAM === FINGERPRINT_FILE ? : ', FINGERPRINT_RAM ===
      FINGERPRINT_FILE);
  const SIGNATURE = await implementation.createSignature(FINGERPRINT_FILE, KEY);
  console.log('SIGNATURE', SIGNATURE);
  await implementation.createSignatureFile(SIGNATURE_FILE_PATH, SIGNATURE);
  const FINGERPRINT_FILE_DECRYPTED = await implementation.getFingerPrintSignatureFile(
      SIGNATURE_FILE_PATH, KEY);
  console.log('FINGERPRINT_FILE_DECRYPTED', FINGERPRINT_FILE_DECRYPTED);
  console.log(
      'FINGERPRINT_RAM === FINGERPRINT_FILE_DECRYPTED ? : ', FINGERPRINT_RAM ===
      FINGERPRINT_FILE_DECRYPTED);

})();







