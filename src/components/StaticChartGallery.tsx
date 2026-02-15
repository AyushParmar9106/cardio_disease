"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, ImageIcon } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"

const CHARTS = [
    {
        title: "Correlation Heatmap",
        description: "Relationships between various health metrics. Darker/Lighter colors indicate stronger positive/negative correlations.",
        filename: "step_14_correlation_heatmap.png"
    },
    {
        title: "Age Distribution",
        description: "The spread of age groups within the training dataset.",
        filename: "step_07_age_distribution.png"
    },
    {
        title: "Cardio Risk vs Age",
        description: "Analysis of how cardiovascular risk probability changes with age.",
        filename: "step_15_cardio_risk_vs_age.png"
    },
    {
        title: "Blood Pressure Analysis",
        description: "Scatter plot showing Systolic (ap_hi) vs Diastolic (ap_lo) blood pressure distributions.",
        filename: "step_19_bp_scatter_by_cardio.png"
    },
    {
        title: "BMI vs Risk",
        description: "Boxplot comparison of Body Mass Index (BMI) for patients with and without cardiovascular disease.",
        filename: "step_17_bmi_vs_cardio_boxplot.png"
    },
    {
        title: "Risk Distribution",
        description: "Overall balance of cardiovascular disease cases in the dataset.",
        filename: "step_10_cardio_distribution_raw.png"
    },
    {
        title: "Lifestyle Factors Risk",
        description: "Combined risk heatmap for Smoking and Alcohol consumption.",
        filename: "step_20_smoke_alco_combined_risk_heatmap.png"
    },
    {
        title: "Systolic BP & Risk",
        description: "Boxplots showing the impact of Systolic BP on cardiovascular health.",
        filename: "step_18_bp_vs_cardio_boxplots.png"
    }
]

export function StaticChartGallery() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Data Analysis Visualizations</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Exploratory Data Analysis (EDA) charts generated directly from the machine learning training pipeline.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {CHARTS.map((chart, index) => (
                    <Dialog key={index}>
                        <DialogTrigger asChild>
                            <Card className="cursor-zoom-in hover:shadow-lg transition-all hover:border-blue-500/50 group overflow-hidden">
                                <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-900 relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                                        <ImageIcon size={48} />
                                    </div>
                                    {/* Backend is running on port 8000, mounted at /charts */}
                                    <img
                                        src={`http://localhost:8000/charts/${chart.filename}`}
                                        alt={chart.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            (e.target as HTMLImageElement).parentElement?.classList.add('flex', 'items-center', 'justify-center');
                                            (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-sm text-red-500">Image not found</span>';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <div className="bg-white/90 dark:bg-black/80 px-4 py-2 rounded-full text-xs font-semibold shadow-sm flex items-center gap-2">
                                            <ExternalLink size={14} />
                                            View Full Size
                                        </div>
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-lg">{chart.title}</CardTitle>
                                    <CardDescription>{chart.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                            <DialogTitle className="sr-only">{chart.title}</DialogTitle>
                            <img
                                src={`http://localhost:8000/charts/${chart.filename}`}
                                alt={chart.title}
                                className="w-full h-auto rounded-lg shadow-2xl"
                            />
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </div>
    )
}
