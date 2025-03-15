import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

function UploadFile(fieldName: string = 'file') {
  return applyDecorators(UseInterceptors(FileInterceptor(fieldName)));
}

export default UploadFile;
