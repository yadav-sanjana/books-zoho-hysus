import { Storage } from '@google-cloud/storage';
import multer from 'multer';

const serviceAccount = require('./keyFile.json');

const storage = new Storage({
    keyFilename: serviceAccount,
    projectId: 'hysus-invoice',
});

console.log(storage);


export const bucket = storage.bucket('file_bucket_hysus');
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage })

export const singleUpload = upload.single('file')


