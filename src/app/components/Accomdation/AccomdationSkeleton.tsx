import Skeleton from '@/app/components/Common/Skeleton';

export default function AccomdationSkeleton() {
  return (
    <div className="relative overflow-hidden">
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="mx-2 w-full flex-shrink-0 lg:w-1/4">
            <div className="relative aspect-[4/3]">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="p-4">
              <Skeleton className="mb-2 h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center p-4">
        <Skeleton className="h-2 w-full" />
      </div>
    </div>
  );
}
