import { Link } from 'react-router-dom';
import { NotebookPen } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <NotebookPen className="h-6 w-6" />
          <span className="font-bold text-lg">NoteShare</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
