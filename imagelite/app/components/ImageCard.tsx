'use client'
interface ImageCardProps {
  imageUrl?: string;
  imageName?: string;
  imageSize?: string;
  uploadDate?: string;
  extension?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({ imageName, imageUrl, imageSize, uploadDate, extension }) => {

  function downloadImage() {
    window.open(imageUrl, '_blank');
  }

  return (
    <div className="card relative overflow-hidden rounded-md border border-yellow-400/40 bg-green-900 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-400/20">
      <img onClick={downloadImage} src={imageUrl} className="h-56 w-full cursor-pointer object-cover" alt="Thumbnail" />
      <div className="card-body p-4">
        <h1 className="mb-2 text-xl font-semibold text-yellow-300">{imageName}</h1>
        <p className="mb-2 text-xl font-semibold text-white/80">{formatBytes(Number(imageSize))}</p>
        <p className="mb-2 text-xl font-semibold text-white/80">{uploadDate}</p>
        <p className="mb-2 text-xl font-semibold text-white/80">{extension}</p>
      </div>
    </div>
  )
}

function formatBytes(bytes: number = 0, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const absBytes = Math.abs(bytes);

  // Evita estourar o tamanho do array sizes
  const i = Math.min(
    Math.floor(Math.log(absBytes) / Math.log(k)),
    sizes.length - 1
  );

  const formattedValue = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formattedValue} ${sizes[i]}`;
}