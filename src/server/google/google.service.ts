import { Injectable } from '@nestjs/common';
import { google, drive_v3 } from 'googleapis';

@Injectable()
export class GoogleService {

  async uploadAttachment(file: Express.Multer.File): Promise<string> {
    const createMedia = () => ({
      mimeType: 'image/jpeg',
      body: file,
    })

    const getScopes = (): string[] => [
      'https://www.googleapis.com/auth/drive'
    ];

    const createDrive = () : drive_v3.Drive => {
      const auth = new google.auth.JWT(
        'jav1palace@gmail.com', null,
        'AIzaSyA-Ofg2uRI5OZ4t1MAcYD7FTR5zunQIQNo', getScopes()
      );
      return google.drive({ version: 'v3', auth });
    }

    try {
      const drive = createDrive();
      const file = await drive.files.create({
        media: createMedia(),
        fields: 'id',
      });

      console.log('File Id:', file.data.id);
      return file.data.id;
    } catch (err) {
      // TODO(developer) - Handle error
      throw err;
    }
  }
}
