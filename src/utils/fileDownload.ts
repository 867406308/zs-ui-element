// 封装通用下载方法
const downloadFile = async (data: Blob, fileName: string, mimeType: string) => {
  const blob = new Blob([data], { type: mimeType });
  try {
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, fileName);
    } else {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      await new Promise((resolve) => setTimeout(resolve, 0));
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

// Excel 下载专用导出函数
const download = {
  excel: (data: Blob, fileName: string) =>
    downloadFile(data, fileName, 'application/vnd.ms-excel'),
  word: (data: Blob, fileName: string) =>
    downloadFile(data, fileName, 'application/msword'),
};

export default download;
