'use strict';
const finger = require('fingerprinting');
const fs = require('fs');
const openpgp = require('openpgp');

module.exports.getFingerPrintRAM = (jsonData) => {
  let print = finger('JSON_DATA', {
    content: JSON.stringify(jsonData),
  });
  return print.file;
};

module.exports.createJsonFile = async (jsonFilePath, jsonData) => {
  await fs.writeFile(jsonFilePath, JSON.stringify(jsonData), (err) => {
    if (err) throw err;
  });
};

module.exports.readJsonFile = async (jsonFilePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(jsonFilePath, async function(err, buffer) {
      if (err) reject(err);
      resolve(JSON.parse(buffer))
    });
  });
};


module.exports.getFingerPrintFile = (jsonFilePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(jsonFilePath, function(err, buffer) {
      if (err) reject(err);

      let print = finger('JSON_FILE_PATH', {
        content: buffer,
      });
      resolve(print.file);

    });
  });
};

module.exports.createSignature = async (fingerprintFile, key) => {
  const {message} = await openpgp.encrypt({
    message: openpgp.message.fromText(fingerprintFile), // input as Message object
    passwords: [key],                                             // multiple passwords possible
    armor: false                                                             // don't ASCII armor (for Uint8Array output)
  });
  return message.packets.write();
};

module.exports.createSignatureFile = async (signatureFilePath, signature) => {
  await fs.writeFile(signatureFilePath,
      signature, (err) => {
        if (err) throw err;
      });
};

module.exports.getFingerPrintSignatureFile = (signatureFilePath, key) => {
  return new Promise((resolve, reject) => {
    fs.readFile(signatureFilePath, async function(err, buffer) {
      if (err) reject(err);
      const {data: decrypted} = await openpgp.decrypt({
        message: await openpgp.message.read(new Uint8Array(buffer)), // parse encrypted bytes
        passwords: [key],
      }).catch(err => console.error(err));
      resolve(decrypted);

    });
  });
};

