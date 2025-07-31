export interface Link {
  id: number;
  url: string;
  title: string;
  description: string;
  imageSource: string;
  createdAt: string;
  folderId: number;
  favorite?: boolean;
}
export interface Folder {
  id: number;
  name: string;
  count: number;
}
