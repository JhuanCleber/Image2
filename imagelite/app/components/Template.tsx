interface TemplateProps {
  children: React.ReactNode;
}

export const Template: React.FC<TemplateProps> = ({ children }: TemplateProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-green-950">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

const Header: React.FC = () => {
  return (
    <header className="border-b-4 border-yellow-400 bg-green-900 py-3 text-white">
      <div className="container mx-auto flex items-center justify-between px-4">
        <h1 className="text-3xl font-bold">
          Image<span className="text-yellow-400">Lite</span>
        </h1>
      </div>
    </header>
  );
}

const Footer: React.FC = () => {
  return (
    <footer className="border-t-4 border-yellow-400 bg-green-900 py-4 text-white">
      <div className="container mx-auto text-center">
        <h1>Desenvolvido por Jhuan</h1>
      </div>
    </footer>
  )
}