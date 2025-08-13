export interface FileSystemNode {
  name: string;
  isDirectory: boolean;
}

const mockFileSystem: Record<string, FileSystemNode[]> = {
  '/': [
    { name: 'home', isDirectory: true },
    { name: 'etc', isDirectory: true },
  ],
  '/home': [
    { name: 'user', isDirectory: true },
  ],
  '/home/user': [
    { name: 'documents', isDirectory: true },
    { name: 'file1.txt', isDirectory: false },
  ],
  '/home/user/documents': [
    { name: 'report.docx', isDirectory: false },
    { name: 'notes.txt', isDirectory: false },
  ],
  '/etc': [
    { name: 'hosts', isDirectory: false },
    { name: 'resolv.conf', isDirectory: false },
  ],
};

export const getFileSystemNodes = async (path: string): Promise<FileSystemNode[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFileSystem[path] || []);
    }, 500);
  });
};
