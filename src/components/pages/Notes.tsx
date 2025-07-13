import { StickyNote, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NotesProps {
  onNewNote?: () => void;
}

export function Notes({ onNewNote }: NotesProps) {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notes</h2>
          <p className="text-muted-foreground">
            Create and organize your Notion-style notes and documentation
          </p>
        </div>
        <Button onClick={onNewNote} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StickyNote className="h-5 w-5" />
            Block-based Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            This page will feature a Notion-style block editor for creating rich notes and documentation.
          </CardDescription>
          <div className="text-center py-12">
            <StickyNote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Notes Coming Soon</h3>
            <p className="text-muted-foreground mb-4">
              Create rich, block-based notes with embedded content, just like Notion.
            </p>
            <Button onClick={onNewNote} variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Create First Note
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}