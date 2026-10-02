'use client'
import { Template, ImageCard } from '../components';
import { ImageService, useImageService } from '../resource/service';
import { useState } from 'react';
import { Image } from '../resource/image';

export default function Galeria() {

  const useService = useImageService();
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('')
  const [extension, setExtension] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  async function searchImages() {
    setLoading(true);
    try {
      const result = await useService.buscar(query, extension);
      setImages(result);
      console.table(result);
    } finally {
      setLoading(false);
    }
  }
  /*renderizando a imagem na tela*/
  function renderImageCard(image: Image) {
    return (
      <ImageCard key={image.url}
        imageName={image.name}
        imageUrl={image.url}
        imageSize={`${image.size}`}
        uploadDate={image.uploadDate}
        extension={image.extension} />
    )
  }

  function renderImageCards() {
    //return images.map((image) => renderImageCard(image));
    return images.map(renderImageCard);
  }


  return (
    <Template>
      <div className="text-white">
        <section className="flex flex-col items-center justify-center py-5">
          <div className="flex space-x-4">
            <input type="text"
              onChange={event => setQuery(event.target.value)}
              className="rounded-lg border border-yellow-400/40 bg-green-900/60 px-4 py-2 text-white placeholder-white/50 outline-none focus:border-yellow-400" placeholder="Buscar imagens..." />
            <select onChange={event => setExtension(event.target.value)}
              className="rounded-lg border border-yellow-400/40 bg-green-900/60 px-4 py-2 text-white outline-none focus:border-yellow-400">
              <option className="bg-green-950" value="">All formats</option>
              <option className="bg-green-950" value="PNG">PNG</option>
              <option className="bg-green-950" value="JPG">JPG</option>
              <option className="bg-green-950" value="JPEG">JPEG</option>
              <option className="bg-green-950" value="GIF">GIF</option>
            </select>
            <button className="rounded bg-gradient-to-r from-green-500 to-yellow-400 px-4 py-2 font-bold text-green-950 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60" onClick={searchImages} disabled={loading}>Search </button>
            <button className="rounded bg-yellow-400 px-4 py-2 font-bold text-green-950 transition hover:bg-yellow-300">Add New </button>
          </div>
        </section>
        {loading ? (
          <section className="flex flex-col items-center justify-center gap-4 py-16">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-400/30 border-t-yellow-400" />
            <p className="text-lg font-semibold text-yellow-300">Buscando imagens...</p>
          </section>
        ) : (
          <section className="grid grid-cols-3 gap-4 p-4">
            {
              renderImageCards()
            }
          </section>
        )}
      </div>
    </Template>
  );
}