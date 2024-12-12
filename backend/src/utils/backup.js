```javascript
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const BACKUP_DIR = path.join(process.cwd(), 'backups');

export const createBackup = async () => {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR);
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `backup-${timestamp}.gz`;
  const filepath = path.join(BACKUP_DIR, filename);

  const cmd = `mongodump --uri="${process.env.MONGODB_URI}" --archive="${filepath}" --gzip`;

  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(filepath);
    });
  });
};

// Schedule daily backups
export const scheduleBackups = () => {
  const BACKUP_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours
  setInterval(async () => {
    try {
      await createBackup();
      console.log('Database backup completed successfully');
    } catch (error) {
      console.error('Database backup failed:', error);
    }
  }, BACKUP_INTERVAL);
};
```