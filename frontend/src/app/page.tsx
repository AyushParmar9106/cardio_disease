"use client"

import { useState } from "react"
import { Activity, HeartPulse } from "lucide-react"

import { DiagnosticForm } from "@/components/DiagnosticForm"
import { ResultDashboard } from "@/components/ResultDashboard"
import { ModelInsights } from "@/components/ModelInsights"
import { DeveloperProfile } from "@/components/DeveloperProfile"
import { TechStack } from "@/components/TechStack"
import { ProjectIntro } from "@/components/ProjectIntro"
import { PatientAnalysis } from "@/components/PatientAnalysis"
import { StaticChartGallery } from "@/components/StaticChartGallery"
import { ModeToggle } from "@/components/mode-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [result, setResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("intro")

  const handlePredictionComplete = (data: any) => {
    setResult(data)
    setActiveTab("analysis")
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8 flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 pb-4 border-b">
        <div className="flex items-center gap-3">
          <div className="bg-red-500 p-2 rounded-lg text-white">
            <HeartPulse size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight md:text-2xl">Cardio_disease</h1>
          </div>
        </div>
        <ModeToggle />
      </header>

      {/* Main Tabs Layout */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-[800px] grid-cols-2 md:grid-cols-5 h-auto">
            <TabsTrigger value="intro">Intro</TabsTrigger>
            <TabsTrigger value="predict">Predict</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="developer">Developer</TabsTrigger>
          </TabsList>
        </div>

        {/* Slide 4: Intro (Default) */}
        <TabsContent value="intro" className="flex-1 animate-in fade-in duration-500 will-change-transform">
          <ProjectIntro />
          <div className="mt-8">
            <TechStack />
          </div>
        </TabsContent>

        {/* Slide 1: Prediction Form */}
        <TabsContent value="predict" className="animate-in slide-in-from-right-8 duration-500">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Patient Diagnostics Form
            </h2>
            <DiagnosticForm onPredictionComplete={handlePredictionComplete} />
          </div>
        </TabsContent>

        {/* Slide 2: Analysis Results */}
        <TabsContent value="analysis" className="animate-in slide-in-from-right-8 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="space-y-6">
              <ResultDashboard result={result} />
              {!result && (
                <div className="p-12 border border-dashed rounded-lg text-center text-muted-foreground bg-slate-50 dark:bg-slate-900/50">
                  Run a prediction in the "Predict" tab to see results here.
                </div>
              )}
            </div>
            <div className="space-y-6">
              <ModelInsights />
            </div>
          </div>

          {/* Detailed Analysis Section */}
          {result && result.analysis && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <PatientAnalysis analysis={result.analysis} />
            </div>
          )}
        </TabsContent>

        {/* Slide 3: Detailed Charts */}
        <TabsContent value="charts" className="animate-in slide-in-from-right-8 duration-500">
          <div className="max-w-7xl mx-auto">
            <StaticChartGallery />
          </div>
        </TabsContent>

        {/* Slide 4: Developer Profile */}
        <TabsContent value="developer" className="animate-in slide-in-from-right-8 duration-500">
          <div className="max-w-xl mx-auto mt-8">
            <DeveloperProfile />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
