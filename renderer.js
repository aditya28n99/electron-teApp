const selectFileBtn = document.getElementById('selectFileBtn');
const filePathParagraph = document.getElementById('filePath');


selectFileBtn.addEventListener('click', async () => {
  try {
    const filePath = await ipcRenderer.invoke('open-file-dialog');
    if (filePath) {
      filePathParagraph.textContent = `Selected file: ${filePath}`;
      console.log("This is the path : "+filePath)
    }
  } catch (error) {
    console.error('Error selecting file:', error);
  }
});
