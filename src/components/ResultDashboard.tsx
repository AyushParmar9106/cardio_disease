"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Heart } from "lucide-react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface ResultDashboardProps {
    result: {
        risk_prediction: number
        risk_probability: number
        message: string
    } | null
}

export function ResultDashboard({ result }: ResultDashboardProps) {
    if (!result) return null

    const percentage = (result.risk_probability * 100).toFixed(1)
    const isHighRisk = result.risk_prediction === 1
    const probability = result.risk_probability * 100

    // Colors
    const riskColor = isHighRisk ? "#ef4444" : "#22c55e"
    const gradientFrom = isHighRisk ? "from-red-500/10" : "from-green-500/10"
    const gradientTo = isHighRisk ? "to-red-900/10" : "to-green-900/10"
    const borderColor = isHighRisk ? "border-red-200 dark:border-red-900" : "border-green-200 dark:border-green-900"

    const gaugeData = [
        { name: "Risk", value: probability },
        { name: "Safety", value: 100 - probability },
    ]

    const COLORS = [riskColor, "#e2e8f0"] // Second color is slate-200 for empty part

    return (
        <div className="space-y-6">
            {/* Main Result Card */}
            <Card className={`overflow-hidden border-2 ${borderColor} bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <Heart className={`h-6 w-6 ${isHighRisk ? "text-red-500 fill-red-500" : "text-green-500 fill-green-500"}`} />
                        Risk Assessment
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Left: Gauge */}
                    <div className="h-[200px] w-full relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={gaugeData}
                                    cx="50%"
                                    cy="70%"
                                    startAngle={180}
                                    endAngle={0}
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={2}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {gaugeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-[60%] flex flex-col items-center">
                            <span className={`text-4xl font-bold ${isHighRisk ? "text-red-600" : "text-green-600"}`}>
                                {percentage}%
                            </span>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Risk Probability</span>
                        </div>
                    </div>

                    {/* Right: Message & Action */}
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-black/20 rounded-xl backdrop-blur-sm border">
                            {isHighRisk ? (
                                <AlertCircle className="h-6 w-6 text-red-500 mt-1 shrink-0" />
                            ) : (
                                <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 shrink-0" />
                            )}
                            <div>
                                <h4 className="font-semibold text-lg">{isHighRisk ? "High Risk Detected" : "Low Risk Detected"}</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {isHighRisk
                                        ? "The analysis indicates a significant probability of cardiovascular issues. Please consider the feedback below."
                                        : "The analysis indicates your risk is currently low. Continue maintaining healthy habits."}
                                </p>
                            </div>
                        </div>

                        {isHighRisk && (
                            <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-4 py-2 rounded-lg text-sm font-medium">
                                Recommendation: Consult a cardiologist immediately.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
