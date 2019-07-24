export const baseUrl = 'http://localhost:56029/api';

export const downloadFile = (data, filename) => {
  const link =  document.createElement('a');
  link.href  =  URL.createObjectURL(new Blob([data]));
  link.setAttribute('download', filename);

  // Append to html page
  document.body.appendChild(link);

  // Force download
  link.click();

  // Clean up and remove the link
  link.parentNode.removeChild(link);

};
