declare module 'download-file-with-progressbar';

interface DownloadBookProps {
  id?: string;
  progress?: string;
  filename: string;
  filesize: string;
  filepath?: string;
  done?: boolean;
  dirPath: string;
}