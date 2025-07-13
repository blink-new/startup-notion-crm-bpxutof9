export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  status: 'lead' | 'prospect' | 'customer' | 'inactive';
  source: 'website' | 'referral' | 'social' | 'email' | 'cold-outreach' | 'event' | 'other';
  tags: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  lastContactDate?: Date;
  avatarUrl?: string;
}

export interface Company {
  id: string;
  name: string;
  domain?: string;
  industry?: string;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  location?: string;
  website?: string;
  description: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  logoUrl?: string;
}

export interface Deal {
  id: string;
  title: string;
  contactId: string;
  companyId?: string;
  value: number;
  currency: 'USD' | 'EUR' | 'GBP';
  stage: 'prospecting' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number; // 0-100
  expectedCloseDate?: Date;
  actualCloseDate?: Date;
  description: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'call' | 'email' | 'meeting' | 'follow-up' | 'demo' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in-progress' | 'completed' | 'cancelled';
  dueDate?: Date;
  completedAt?: Date;
  assignedTo?: string;
  contactId?: string;
  dealId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task' | 'deal' | 'contact';
  title: string;
  description: string;
  entityId: string; // Contact, Deal, or Company ID
  entityType: 'contact' | 'deal' | 'company';
  userId: string;
  createdAt: Date;
}

export type ViewType = 'table' | 'kanban' | 'calendar' | 'list';

export interface ViewConfig {
  type: ViewType;
  filters: Record<string, any>;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  groupBy?: string;
}