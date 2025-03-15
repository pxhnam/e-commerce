import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

function UploadFiles(fieldName: string = 'files', maxCount?: number) {
  return applyDecorators(
    UseInterceptors(FilesInterceptor(fieldName, maxCount ?? undefined))
  );
}

export default UploadFiles;
