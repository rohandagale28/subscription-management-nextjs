export default async function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="main-panel flex flex-col w-full h-auto px-8 gap-8 ">
            <div className="flex flex-col gap-4">
                <div className="bg-accent animate-pulse  rounded-md transition-all h-4 w-48 pl-2">
                </div>
                <div className="bg-accent animate-pulse  rounded-md transition-all h-3 w-[20rem] pl-2">
                </div>
            </div>
            <div className="w-full grid gap-4 grid-rows-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-auto-flow">
                <div className="bg-accent animate-pulse rounded-md transition-all h-[8rem] w-full pl-2">
                </div>
                <div className="bg-accent animate-pulse rounded-md transition-all h-[8rem] w-full pl-2">
                </div>
                <div className="bg-accent animate-pulse rounded-md transition-all h-[8rem] w-full pl-2">
                </div>
            </div>
            <div></div>
        </div>
    )
}