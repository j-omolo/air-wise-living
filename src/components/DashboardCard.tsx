
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
  headerClassName?: string;
  contentClassName?: string;
}

const DashboardCard = ({ 
  title, 
  description, 
  className,
  children,
  headerClassName,
  contentClassName
}: DashboardCardProps) => {
  return (
    <Card className={cn("h-full shadow-sm", className)}>
      <CardHeader className={cn("pb-3", headerClassName)}>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={cn("pt-2", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
