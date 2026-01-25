"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, BrainCircuit } from "lucide-react"

interface ModelInfo {
    model_type: string
    accuracy: number
    feature_importances: { feature: string; importance: number }[]
}

export function ModelInsights() {
    const [info, setInfo] = useState<ModelInfo | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchModelInfo() {
            try {
                const response = await axios.get("http://localhost:8000/model-info")
                setInfo(response.data)
            } catch (error) {
                console.error("Failed to fetch model info:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchModelInfo()
    }, [])

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
    }

    if (!info) return <div>Model insights unavailable.</div>

    return (
        <Card className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border-none shadow-md">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                        <BrainCircuit className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            AI Model Insights
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800 animate-pulse">
                                Live from Backend
                            </span>
                        </CardTitle>
                        <CardDescription>
                            Logic behind the prediction. Model: <span className="font-semibold text-primary">{info.model_type}</span>
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-white/5 rounded-lg border backdrop-blur-sm">
                        <span className="text-sm font-medium">Model Accuracy</span>
                        <span className="text-2xl font-bold text-blue-600">{(info.accuracy * 100).toFixed(1)}%</span>
                    </div>

                    <div className="h-[350px] w-full">
                        <h4 className="text-sm font-semibold mb-4 text-muted-foreground">Top Risk Factors (Feature Importance)</h4>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={info.feature_importances}
                                layout="vertical"
                                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.3} />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="feature"
                                    type="category"
                                    width={80}
                                    tick={{ fontSize: 11, fill: 'var(--foreground)' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    formatter={(value: any) => [value?.toFixed(4), 'Impact Score']}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="importance" radius={[0, 4, 4, 0]} barSize={20}>
                                    {info.feature_importances.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={`hsl(${210 + index * 5}, 80%, ${50 + index * 2}%)`} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
