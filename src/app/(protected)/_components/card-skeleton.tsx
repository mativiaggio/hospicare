import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Props {
  icon?: React.ReactNode;
  bottomLine?: boolean;
}

export default function CardSkeleton({ icon, bottomLine = true }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="w-full">
          <Skeleton className="w-44 h-[20px]" />
        </div>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold pb-2">
          <Skeleton className="w-8 h-[24px]" />
        </div>
        <div
          className={cn(
            "text-xs text-muted-foreground",
            !bottomLine && "hidden"
          )}>
          <Skeleton className="w-36 h-[16px]" />
        </div>
      </CardContent>
    </Card>
  );
}
