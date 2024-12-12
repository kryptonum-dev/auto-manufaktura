export function shortenFilename(filename: string, maxBaseLength = 10): string {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1) return filename;
  const baseName = filename.slice(0, lastDotIndex);
  const extension = filename.slice(lastDotIndex);
  return baseName.length <= maxBaseLength ? filename : `${baseName.slice(0, maxBaseLength - 3)}...${extension}`;
}
