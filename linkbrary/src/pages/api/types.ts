export interface Link {
  id: number;
  url: string;
  title: string;
  description: string;
  imageSource: string;
  createdAt: string;
  folderId: number;
  isFavorite: boolean;
}
export interface Folder {
  id: number;
  name: string;
  count: number;
}

export interface UpdateLinkPayload {
  id: number;
  url?: string;
  title?: string;
  description?: string;
  folderId?: number;
}
