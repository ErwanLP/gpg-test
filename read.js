'use strict';
const implementation = require('./implementation');

const JSON_FILE_PATH = 'data.json';
const SIGNATURE_FILE_PATH = 'data.sig';
const KEY = 'UqF7w5SvKMnUacSZ';

(async () => {
  const JSON_DATA = await implementation.readJsonFile(JSON_FILE_PATH);
  console.log(JSON.stringify(JSON_DATA))
  const FINGERPRINT_RAM = implementation.getFingerPrintRAM(JSON_DATA)
  console.log('FINGERPRINT_RAM  : ', FINGERPRINT_RAM);
  const FINGERPRINT_FILE_DECRYPTED = await implementation.getFingerPrintSignatureFile(
      SIGNATURE_FILE_PATH, KEY);
  console.log('FINGERPRINT_FILE_DECRYPTED', FINGERPRINT_FILE_DECRYPTED);
  console.log(
      'FINGERPRINT_RAM === FINGERPRINT_FILE_DECRYPTED ? : ', FINGERPRINT_RAM ===
      FINGERPRINT_FILE_DECRYPTED);


})();







