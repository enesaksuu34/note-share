import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { saveNote } from '@/lib/notes';
import { Share2 } from 'lucide-react';

export default function Home() {
  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleShare = () => {
    if (!note.trim()) {
      toast.error('Note cannot be empty.');
      return;
    }
    setIsSaving(true);
    try {
      const id = saveNote(note);
      const url = `${window.location.origin}/${id}`;
      
      toast.success('Note saved! Link copied to clipboard.', {
        action: {
          label: 'Copy',
          onClick: () => navigator.clipboard.writeText(url),
        },
      });
      navigator.clipboard.writeText(url);
      navigate(`/${id}`);
    } catch (error) {
      toast.error('Failed to save note.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex justify-center items-start pt-10">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">Create a New Note</CardTitle>
          <CardDescription>
            Write your note below and click the share button to generate a unique link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Type your note here..."
            className="min-h-[300px] text-base"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={isSaving}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleShare} disabled={isSaving} className="w-full sm:w-auto ml-auto">
            <Share2 className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Share Note'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
