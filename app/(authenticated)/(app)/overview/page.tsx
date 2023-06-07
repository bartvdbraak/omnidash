
import { cn } from "@/lib/utils";

export default async function Page(_props: {
  params: { tenantSlug: string };
}) {
  const stats: {
    label: string;
    value: string;
  }[] = [
    {
      label: "Total Channels",
      value: '0',
    },
    {
      label: "Total Events (7 days)",
      value: '0',
    },
  ];
  return (
    <main>
      <div className="relative overflow-hidden isolate">
        {/* Stats */}
        <div className="border-b border-b-white/10 ">
          <div className="flex flex-col items-start justify-between h-16 px-4 py-4 border-b  bg-primary-900 gap-x-8 gap-y-4 sm:flex-row sm:items-center sm:px-6 lg:px-8 border-white/10">
            <div>
              <div className="flex items-center gap-x-3 ">
                {/* <div className="flex-none p-1 text-green-400 rounded-full bg-green-400/10">
                <div className="w-2 h-2 rounded-full bg-current" />
              </div> */}
                <h1 className="flex text-base gap-x-2 leading-7">
                  <span className="font-semibold text-white">
                    {"Personal Account"}
                  </span>
                </h1>
              </div>
              {/* <p className="mt-2 text-xs leading-6 text-zinc-400">{channel.description}</p> */}
            </div>
            <div className="flex-none order-first px-2 py-1 text-xs font-medium rounded-full bg-rose-400/10 text-rose-400 ring-1 ring-inset ring-rose-400/30 sm:order-none">
              test
            </div>
          </div>
          <dl
            className={cn(
              "grid grid-cols-1  bg-zinc-700/10 sm:grid-cols-2  border-b border-white/10 h-32",
              {
                "lg:grid-cols-2": stats.length === 2,
                "lg:grid-cols-3": stats.length === 3,
                "lg:grid-cols-4": stats.length >= 4,
              },
            )}
          >
            {" "}
            {stats.map((stat, statIdx) => (
              <div
                key={stat.label}
                className={cn(
                  statIdx % 2 === 1 ? "sm:border-l" : statIdx === 2 ? "lg:border-l" : "",
                  "flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-zinc-100/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8",
                )}
              >
                <dt className="text-sm font-medium leading-6 text-zinc-500">{stat.label}</dt>
                {/* <dd
                  className={cn(
                    stat.changeType === 'negative' ? 'text-rose-600' : 'text-zinc-700',
                    'text-xs font-medium'
                  )}
                >
                  {stat.change}
                </dd> */}
                <dd className="flex-none w-full text-3xl font-medium tracking-tight leading-10 text-zinc-100">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="py-16 space-y-16 xl:space-y-20">
        {/* Recent activity table */}
        <div>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h2 className="max-w-2xl mx-auto text-base font-semibold leading-6 text-zinc-100 lg:mx-0 lg:max-w-none">
              Recent events
            </h2>
          </div>
          <div className="mt-6 overflow-x-hidden overflow-y-scroll border-t border-zinc-900">
            <div className="mx-auto max-w-7xl ">
              <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-none">
                <table className="w-full text-left ">
                  <thead className="sr-only">
                    <tr>
                      <th>Event</th>
                      <th className="hidden sm:table-cell">Content</th>
                      <th>More details</th>
                    </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
