import { BarChart3, DollarSign, TrendingUp, Users, Clock, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockContacts, mockDeals, mockTasks, mockActivities } from '../../data/mockData';
import { formatDistanceToNow } from 'date-fns';

export function Dashboard() {
  // Calculate metrics
  const totalContacts = mockContacts.length;
  const totalDeals = mockDeals.length;
  const totalDealValue = mockDeals.reduce((sum, deal) => sum + deal.value, 0);
  const wonDeals = mockDeals.filter(deal => deal.stage === 'closed-won').length;
  const activeTasks = mockTasks.filter(task => task.status !== 'completed').length;
  const overdueTasks = mockTasks.filter(task => 
    task.dueDate && task.dueDate < new Date() && task.status !== 'completed'
  ).length;

  const conversionRate = totalContacts > 0 ? (wonDeals / totalContacts) * 100 : 0;

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here's what's happening with your startup CRM today.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContacts}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDealValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +25% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDeals}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              +3.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Pipeline Overview */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Pipeline Overview</CardTitle>
            <CardDescription>
              Your deals by stage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['prospecting', 'qualified', 'proposal', 'negotiation'].map((stage) => {
                const stageDeals = mockDeals.filter(deal => deal.stage === stage);
                const stageValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
                const stagePercentage = totalDealValue > 0 ? (stageValue / totalDealValue) * 100 : 0;
                
                return (
                  <div key={stage} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium capitalize">{stage}</p>
                        <p className="text-xs text-muted-foreground">
                          {stageDeals.length} deals • ${stageValue.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{stagePercentage.toFixed(1)}%</p>
                      </div>
                    </div>
                    <Progress value={stagePercentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity & Tasks */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Activity
              <Button variant="ghost" size="sm">View all</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActivities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(activity.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tasks Overview */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Upcoming Tasks
              </span>
              <Button variant="ghost" size="sm">View all</Button>
            </CardTitle>
            <CardDescription>
              {activeTasks} active tasks, {overdueTasks} overdue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTasks.slice(0, 4).map((task) => {
                const isOverdue = task.dueDate && task.dueDate < new Date() && task.status !== 'completed';
                const contact = mockContacts.find(c => c.id === task.contactId);
                
                return (
                  <div key={task.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{task.title}</p>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={task.priority === 'urgent' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {task.priority}
                          </Badge>
                          {isOverdue && (
                            <Badge variant="destructive" className="text-xs">
                              Overdue
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {contact && `${contact.firstName} ${contact.lastName}`}
                        {task.dueDate && ` • Due ${formatDistanceToNow(task.dueDate, { addSuffix: true })}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="ghost">
                <Users className="mr-2 h-4 w-4" />
                Add New Contact
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <BarChart3 className="mr-2 h-4 w-4" />
                Create Deal
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <Clock className="mr-2 h-4 w-4" />
                Schedule Follow-up
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <DollarSign className="mr-2 h-4 w-4" />
                Update Pipeline
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}