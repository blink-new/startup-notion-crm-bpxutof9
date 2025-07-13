import { Building2, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CompaniesProps {
  onNewCompany?: () => void;
}

export function Companies({ onNewCompany }: CompaniesProps) {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Companies</h2>
          <p className="text-muted-foreground">
            Manage your company relationships and accounts
          </p>
        </div>
        <Button onClick={onNewCompany} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Company
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            This page will contain a table view of all companies with filtering, sorting, and management capabilities.
          </CardDescription>
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Companies Coming Soon</h3>
            <p className="text-muted-foreground mb-4">
              Manage your company accounts, track relationships, and organize your B2B contacts.
            </p>
            <Button onClick={onNewCompany} variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add First Company
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}