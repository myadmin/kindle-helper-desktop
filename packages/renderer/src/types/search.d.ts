interface SearchType {
  title: string;
  link: string;
  types: string[];
}

interface DetailType {
  link: string;
  text: string;
}

interface BookDataProps {
  bookName: string; 
  bookUrl: string; 
  bookId: string;
  bookPass?: number;
}
