import Skeleton from '@/app/components/Common/Skeleton';

export default function EventSkeleton() {
  return (
    <>
      <div className="scroll-container ml-16 mt-5 flex gap-4 md:ml-32 lg:ml-[10.5rem] 1xl:ml-60 2xl:ml-[36rem] 2xl:mt-10">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="relative w-[78%] flex-shrink-0 rounded-md bg-white p-5 lg:w-[54%] 2xl:flex 2xl:w-[50rem]"
          >
            <div className="relative mx-auto h-[12.5rem] w-full md:w-[18.75rem] 2xl:mx-0 2xl:h-72 2xl:w-[12.5rem]">
              <Skeleton className="absolute h-full w-full" />
            </div>
            <div className="mt-4 border-b-0 border-dashed text-center 2xl:ml-8 2xl:mt-0 2xl:flex 2xl:flex-col 2xl:justify-between 2xl:border-l 2xl:pl-8">
              <div className="my-3 flex flex-col items-center 2xl:items-start">
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="mt-4 border-b border-dashed pb-4 lg:mt-10 2xl:border-b-0">
                <div className="flex justify-center gap-3 lg:justify-between">
                  <Skeleton className="h-4 w-20 lg:w-32" />
                  <Skeleton className="h-4 w-4 lg:hidden" />
                  <Skeleton className="h-4 w-20 lg:w-32" />
                </div>
              </div>
              <div className="mt-4">
                <Skeleton className="mx-auto h-4 w-24 2xl:mx-0 2xl:h-8" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Skeleton className="h-2 w-20 lg:w-32" />
      </div>
    </>
  );
}
