export interface FileWithPreview extends File {
    preview?: string | ArrayBuffer | null;
}

export interface ImageUploaderProps {
    uploadedImage : FileWithPreview | null;
    setUploadedImage : (file: FileWithPreview | null) => void;
    getPreviewUrl: (url:string)=>void;
    onImageRemove?: () => void;
}