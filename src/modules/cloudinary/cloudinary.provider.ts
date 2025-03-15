import { v2 as cloudinary } from 'cloudinary';
import { Provider } from '@nestjs/common';
import { CLOUDINARY } from '@common/constants';
import AppConfigService from '@modules/config/config.service';

const CloudinaryProvider: Provider = {
  provide: CLOUDINARY as string,
  useFactory: (configService: AppConfigService) => {
    return cloudinary.config(configService.getCloudinary());
  },
  inject: [AppConfigService]
};

export default CloudinaryProvider;
