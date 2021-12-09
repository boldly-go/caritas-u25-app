export interface IAttachment {
    title: string;
    type: string;
    description: string;
    title_link: string;
    title_link_download: boolean;
    image_url: string;
    image_type: string;
    image_size: number;
    image_preview?: string;
}
