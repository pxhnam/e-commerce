import { join } from 'path';

export const CLOUDINARY = 'CLOUDINARY';
export const FILE_UPLOAD_DIR = join(process.cwd(), 'src', 'uploads');
export const FILE_UPLOAD_MAX_SIZE = 1024 * 1024 * 5; // 5MB
