const crypto = require('crypto');

class FileEncryption {
    constructor(key) {
        this.key = key;
        this.ALGO = "aes-256-cbc";
    }

    encrypt(text) {
        try {
            const iv = process.env.IV
            const cipher = crypto.createCipheriv(this.ALGO, Buffer.from(this.key), iv);
            let encrypted = cipher.update(text, 'utf8', 'base64');
            encrypted += cipher.final('base64');
            return iv.toString('base64') + ':' + encrypted;
        } catch (error) {
            console.error('Encryption error:', error.message);
            return null;
        }
    }

    decrypt(encryptedText) {
        try {
            const [ivStr, encryptedData] = encryptedText.split(':');
            const iv = Buffer.from(ivStr, 'base64');
            const decipher = crypto.createDecipheriv(this.ALGO, Buffer.from(this.key), iv);
            let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        } catch (error) {
            console.error('Decryption error:', error.message);
            return null;
        }
    }
}

module.exports = FileEncryption;
