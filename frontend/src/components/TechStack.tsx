import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Server, Database, Layout } from "lucide-react"

export function TechStack() {
    const stack = [
        { name: "Frontend", icon: Layout, items: ["Next.js 14", "Tailwind CSS", "Shadcn UI", "Recharts"] },
        { name: "Backend", icon: Server, items: ["FastAPI", "Python", "Joblib", "Uvicorn"] },
        { name: "Machine Learning", icon: Server, items: ["Scikit-learn", "Pandas", "Random Forest"] }, // Icon reused
    ]

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    Technology Stack
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stack.map((s) => (
                        <div key={s.name} className="border p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
                            <div className="flex items-center gap-2 mb-2 font-semibold">
                                <s.icon className="w-4 h-4 text-blue-500" />
                                {s.name}
                            </div>
                            <ul className="text-sm space-y-1 text-muted-foreground">
                                {s.items.map(item => <li key={item}>• {item}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
