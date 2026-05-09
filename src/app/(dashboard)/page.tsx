import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Dashboard Overview</h2>
        <p className="text-zinc-500 dark:text-zinc-400">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Revenue" 
          value="$45,231.89" 
          trend="+20.1% from last month" 
          icon={<DollarSign className="h-4 w-4 text-zinc-500" />}
          positive={true}
        />
        <KPICard 
          title="Active Users" 
          value="2,350" 
          trend="+180 from last month" 
          icon={<Users className="h-4 w-4 text-zinc-500" />}
          positive={true}
        />
        <KPICard 
          title="Sales" 
          value="+12,234" 
          trend="+19% from last month" 
          icon={<ShoppingCart className="h-4 w-4 text-zinc-500" />}
          positive={true}
        />
        <KPICard 
          title="Active Now" 
          value="573" 
          trend="-201 since last hour" 
          icon={<TrendingUp className="h-4 w-4 text-zinc-500" />}
          positive={false}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">Revenue Overview</h3>
          </div>
          <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-500">
            [Chart Area Placeholder]
          </div>
        </div>

        {/* Recent Activity Area */}
        <div className="lg:col-span-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">Recent Activity</h3>
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mr-4">
                  <div className="h-2 w-2 rounded-full bg-indigo-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                    New order placed #{1000 + i}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Customer {i} purchased a product.
                  </p>
                </div>
                <div className="ml-auto font-medium text-sm text-zinc-900 dark:text-zinc-50">
                  +$2{i}9.00
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function KPICard({ title, value, trend, icon, positive }: { title: string, value: string, trend: string, icon: React.ReactNode, positive: boolean }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="tracking-tight text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</h3>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{value}</div>
        <p className={`text-xs mt-1 flex items-center ${positive ? 'text-emerald-500' : 'text-red-500'}`}>
          {positive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
          {trend}
        </p>
      </div>
    </div>
  )
}
