import { Template } from "../components/Template";
import { ImageCard } from "../components/Image";


export default function Galeria() {
  return (
      <main>
        <Template>
          <select className="grid grid-cols-3 gap-8">
            <ImageCard />
          </select>
        </Template>       
      </main>     
  )
}