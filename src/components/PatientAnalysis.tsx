"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Info } from "lucide-react"

interface RiskFactor {
    factor: string
    value: string
    status: string
    severity: "High" | "Medium" | "Low"
}

interface PatientAnalysisProps {
    analysis: {
        bmi: number
        risk_factors: RiskFactor[]
    } | null
}

export function PatientAnalysis({ analysis }: PatientAnalysisProps) {
    if (!analysis) return null

    return (
        <Card className="col-span-1 md:col-span-2 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-900/50 border-blue-200 dark:border-blue-900">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500" />
                    <CardTitle>Detailed Patient Analysis</CardTitle>
                </div>
                <CardDescription>
                    Key contributing factors based on the provided health data.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {analysis.risk_factors.length === 0 ? (
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-lg flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        No specific high-risk factors identified in the basic analysis. Maintain healthy habits!
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {analysis.risk_factors.map((factor, index) => (
                                <div key={index} className={`p-4 rounded-lg border backdrop-blur-sm shadow-sm flex items-start gap-3
                                    ${factor.severity === "High" ? "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/50" :
                                        factor.severity === "Medium" ? "bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-900/50" :
                                            "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900/50"}
                                `}>
                                    <div className={`p-2 rounded-full shrink-0 
                                         ${factor.severity === "High" ? "bg-red-100 text-red-600" :
                                            factor.severity === "Medium" ? "bg-orange-100 text-orange-600" :
                                                "bg-yellow-100 text-yellow-600"}
                                    `}>
                                        <AlertTriangle size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm">{factor.factor}</h4>
                                        <p className="text-xs text-muted-foreground mt-1">Value: {factor.value}</p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                                                ${factor.severity === "High" ? "bg-red-200 text-red-800" :
                                                    factor.severity === "Medium" ? "bg-orange-200 text-orange-800" :
                                                        "bg-yellow-200 text-yellow-800"}
                                            `}>
                                                {factor.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-sm text-center text-muted-foreground pt-2">
                            BMI Calculated: <span className="font-semibold">{analysis.bmi}</span>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
