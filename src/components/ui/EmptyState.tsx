import { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="border-2 border-dashed border-divider rounded-2xl py-16 flex flex-col items-center gap-3 w-full">
      <div className="bg-default-100 p-4 rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <div className="text-center">
        <p className="font-medium text-default-600">{title}</p>
        <p className="text-sm text-default-400 mt-0.5">{description}</p>
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
