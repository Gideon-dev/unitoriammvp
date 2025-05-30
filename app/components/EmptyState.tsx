import Image from "next/image";

interface EmptyStateProps {
  message?: string;
  icon?: string;
}

const EmptyState = ({ message = "No items found", icon }: EmptyStateProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 py-8">
      {icon && (
        <Image 
          src={icon}
          alt="Empty state icon"
          width={64}
          height={64}
        />
      )}
      <p className="text-center text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyState;
