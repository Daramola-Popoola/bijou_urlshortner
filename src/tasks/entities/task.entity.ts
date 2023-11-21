import {Url as UrlModel} from '@prisma/client';

export class TaskEntity implements UrlModel {
    id: string;
    title: string;
    actualUrl: string;
    shortUrl: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    
}

