import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { getNote } from '@/lib/notes';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, PlusCircle } from 'lucide-react';

export default function ViewNote() {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      try {
        const content = getNote(id);
        setNote(content);
      } catch (error) {
        setNote(null);
      } finally {
        setIsLoading(false);
      }
    }
  }, [id]);

  const handleCopy = () => {
    if (note) {
      navigator.clipboard.writeText(note);
      toast.success('Note content copied to clipboard!');
    }
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  if (isLoading) {
    return <div className="text-center">Loading note...</div>;
  }

  if (!note) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Note not found</h2>
        <p className="text-muted-foreground mb-6">The note you are looking for does not exist or has been deleted.</p>
        <Button asChild>
          <Link to="/">Create a new note</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start pt-10">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Shared Note</CardTitle>
          <CardDescription>This is a read-only view of a shared note.</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted rounded-md p-4 whitespace-pre-wrap font-sans text-base min-h-[300px]">
            {note}
          </pre>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 justify-end">
           <Button variant="outline" onClick={handleCopyLink} className="w-full sm:w-auto">
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
          <Button onClick={handleCopy} className="w-full sm:w-auto">
            <Copy className="mr-2 h-4 w-4" />
            Copy Content
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <Link to="/">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Note
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
