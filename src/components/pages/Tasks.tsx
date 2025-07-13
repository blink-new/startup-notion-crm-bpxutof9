import { CheckSquare, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TasksProps {
  onNewTask?: () => void;
}

export function Tasks({ onNewTask }: TasksProps) {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground">
            Manage your follow-ups, calls, and action items
          </p>
        </div>
        <Button onClick={onNewTask} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Task Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            This page will contain a task list with filtering by priority, status, and due dates.
          </CardDescription>
          <div className="text-center py-12">
            <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Tasks Coming Soon</h3>
            <p className="text-muted-foreground mb-4">
              Track your follow-ups, calls, meetings, and action items all in one place.
            </p>
            <Button onClick={onNewTask} variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add First Task
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}