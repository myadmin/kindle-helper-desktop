declare module 'download-file-with-progressbar';

interface DownloadBookProps {
  id: string;
  progress: string;
  filename: string;
  filesize: number;
  filepath: string;
  done: boolean;
}