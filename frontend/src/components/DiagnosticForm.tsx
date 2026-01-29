"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
    age: z.coerce.number().min(1, "Age is required"),
    gender: z.string(),
    height: z.coerce.number().min(50, "Height must be valid"),
    weight: z.coerce.number().min(10, "Weight must be valid"),
    ap_hi: z.coerce.number().min(50, "Systolic BP must be valid"),
    ap_lo: z.coerce.number().min(30, "Diastolic BP must be valid"),
    cholesterol: z.string(),
    gluc: z.string(),
    smoke: z.boolean(),
    alco: z.boolean(),
    active: z.boolean(),
})

interface DiagnosticFormProps {
    onPredictionComplete: (result: any) => void
}

export function DiagnosticForm({ onPredictionComplete }: DiagnosticFormProps) {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            age: 50,
            gender: "1",
            height: 165,
            weight: 70,
            ap_hi: 120,
            ap_lo: 80,
            cholesterol: "1",
            gluc: "1",
            smoke: false,
            alco: false,
            active: true,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        try {
            // Map values to API format (age in years)

            const payload = {
                age: values.age,
                gender: parseInt(values.gender),
                height: values.height,
                weight: values.weight,
                ap_hi: values.ap_hi,
                ap_lo: values.ap_lo,
                cholesterol: parseInt(values.cholesterol),
                gluc: parseInt(values.gluc),
                smoke: values.smoke ? 1 : 0,
                alco: values.alco ? 1 : 0,
                active: values.active ? 1 : 0,
            }

            const response = await axios.post("http://localhost:8000/predict", payload)
            onPredictionComplete(response.data)
        } catch (error) {
            console.error("Error submitting form:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Patient Diagnostics</CardTitle>
                <CardDescription>Enter patient details for real-time risk assessment.</CardDescription>
            </CardHeader>
            <CardContent>
                {/* We need to wrap with Form provider, but Shadcn UseForm is slightly different. */}
                {/* Shadcn's Form component is a wrapper around react-hook-form FormProvider */}
                {/* I need to import correctly. Shadcn `Form` export is `const Form = FormProvider`. */}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="age"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Age (Years)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select gender" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">Female</SelectItem>
                                                <SelectItem value="2">Male</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="height"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Height (cm)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="weight"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Weight (kg)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="ap_hi"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Systolic BP (ap_hi)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="ap_lo"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Diastolic BP (ap_lo)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cholesterol"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Cholesterol</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select level" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">Normal</SelectItem>
                                                <SelectItem value="2">Above Normal</SelectItem>
                                                <SelectItem value="3">Well Above Normal</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="gluc"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Glucose</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select level" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">Normal</SelectItem>
                                                <SelectItem value="2">Above Normal</SelectItem>
                                                <SelectItem value="3">Well Above Normal</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                            <FormField
                                control={form.control}
                                name="smoke"
                                render={({ field }: { field: any }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Smoking</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="alco"
                                render={({ field }: { field: any }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Alcohol</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="active"
                                render={({ field }: { field: any }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Physical Activity</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Analyzing..." : "Predict Risk"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
