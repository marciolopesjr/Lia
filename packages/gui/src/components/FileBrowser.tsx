import React, { useState, useEffect } from 'react';
import { getFileSystemNodes, FileSystemNode } from '../mockApi';

export const FileBrowser = () => {
  const [nodes, setNodes] = useState<FileSystemNode[]>([]);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    const fetchNodes = async () => {
      const newNodes = await getFileSystemNodes(currentPath);
      setNodes(newNodes);
    };
    fetchNodes();
  }, [currentPath]);

  const handleNodeClick = (node: FileSystemNode) => {
    if (node.isDirectory) {
      setCurrentPath(`${currentPath}${node.name}/`);
    }
  };

  const handleGoUp = () => {
    if (currentPath !== '/') {
      const newPath = currentPath.split('/').slice(0, -2).join('/') + '/';
      setCurrentPath(newPath);
    }
  };

  return (
    <div className="w-64 p-4 border-r">
      <h2 className="text-lg font-bold mb-4">Files</h2>
      <div>
        <button
          className="p-2 mb-2 bg-gray-200 rounded-lg"
          onClick={handleGoUp}
          disabled={currentPath === '/'}
        >
          Go Up
        </button>
      </div>
      <ul>
        {nodes.map((node, index) => (
          <li
            key={index}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleNodeClick(node)}
          >
            {node.isDirectory ? '📁' : '📄'} {node.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
