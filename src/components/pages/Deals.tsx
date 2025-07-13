import { useState } from 'react';
import { DollarSign, Calendar, User, Building2, MoreHorizontal, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockDeals, mockContacts, mockCompanies } from '../../data/mockData';
import { Deal } from '../../types';
import { format } from 'date-fns';

interface DealsProps {
  onNewDeal?: () => void;
}

const stages = [
  { key: 'prospecting', label: 'Prospecting', color: 'bg-blue-100 border-blue-200' },
  { key: 'qualified', label: 'Qualified', color: 'bg-yellow-100 border-yellow-200' },
  { key: 'proposal', label: 'Proposal', color: 'bg-purple-100 border-purple-200' },
  { key: 'negotiation', label: 'Negotiation', color: 'bg-orange-100 border-orange-200' },
  { key: 'closed-won', label: 'Closed Won', color: 'bg-green-100 border-green-200' },
  { key: 'closed-lost', label: 'Closed Lost', color: 'bg-red-100 border-red-200' },
];

export function Deals({ onNewDeal }: DealsProps) {
  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null);

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600 bg-green-100';
    if (probability >= 60) return 'text-yellow-600 bg-yellow-100';
    if (probability >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getStageDeals = (stage: string) => {
    return mockDeals.filter(deal => deal.stage === stage);
  };

  const getContact = (contactId: string) => {
    return mockContacts.find(c => c.id === contactId);
  };

  const getCompany = (companyId?: string) => {
    return companyId ? mockCompanies.find(c => c.id === companyId) : null;
  };

  const totalPipelineValue = mockDeals
    .filter(deal => !['closed-won', 'closed-lost'].includes(deal.stage))
    .reduce((sum, deal) => sum + deal.value, 0);

  const handleDragStart = (e: React.DragEvent, deal: Deal) => {
    setDraggedDeal(deal);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetStage: string) => {
    e.preventDefault();
    if (draggedDeal && draggedDeal.stage !== targetStage) {
      // In a real app, this would update the deal's stage
      console.log(`Moving deal ${draggedDeal.title} from ${draggedDeal.stage} to ${targetStage}`);
    }
    setDraggedDeal(null);
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Deals</h2>
          <p className="text-muted-foreground">
            Manage your sales pipeline and track deal progress
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Pipeline Value</p>
            <p className="text-2xl font-bold">${totalPipelineValue.toLocaleString()}</p>
          </div>
          <Button onClick={onNewDeal} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            New Deal
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-6 gap-6 h-[calc(100vh-200px)] overflow-hidden">
        {stages.map((stage) => {
          const stageDeals = getStageDeals(stage.key);
          const stageValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);

          return (
            <div
              key={stage.key}
              className="flex flex-col"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.key)}
            >
              {/* Stage Header */}
              <div className={`p-4 rounded-t-lg border-2 ${stage.color}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">{stage.label}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {stageDeals.length}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  ${stageValue.toLocaleString()}
                </p>
              </div>

              {/* Deals List */}
              <div className="flex-1 bg-muted/20 border-2 border-t-0 border-gray-200 rounded-b-lg p-2 overflow-y-auto space-y-3">
                {stageDeals.map((deal) => {
                  const contact = getContact(deal.contactId);
                  const company = getCompany(deal.companyId);

                  return (
                    <Card
                      key={deal.id}
                      className="cursor-move hover:shadow-md transition-shadow"
                      draggable
                      onDragStart={(e) => handleDragStart(e, deal)}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Deal Header */}
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-sm leading-tight">{deal.title}</h4>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Deal</DropdownMenuItem>
                                <DropdownMenuItem>Create Task</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  Delete Deal
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          {/* Value & Probability */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm font-medium">
                                ${deal.value.toLocaleString()}
                              </span>
                            </div>
                            <Badge
                              className={`text-xs px-2 py-1 ${getProbabilityColor(deal.probability)}`}
                              variant="secondary"
                            >
                              {deal.probability}%
                            </Badge>
                          </div>

                          {/* Contact & Company */}
                          <div className="space-y-2">
                            {contact && (
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                    {contact.firstName[0]}{contact.lastName[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground">
                                  {contact.firstName} {contact.lastName}
                                </span>
                              </div>
                            )}
                            
                            {company && (
                              <div className="flex items-center space-x-2">
                                <Building2 className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {company.name}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Expected Close Date */}
                          {deal.expectedCloseDate && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {format(deal.expectedCloseDate, 'MMM d, yyyy')}
                              </span>
                            </div>
                          )}

                          {/* Tags */}
                          {deal.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {deal.tags.slice(0, 2).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs px-1 py-0"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {deal.tags.length > 2 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs px-1 py-0"
                                >
                                  +{deal.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}