import { IsBoolean, IsOptional } from 'class-validator';

class ImageOptions {
  @IsOptional()
  @IsBoolean()
  isDefault: boolean;
}
export default ImageOptions;
