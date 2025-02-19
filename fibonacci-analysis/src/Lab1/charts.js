import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FibonacciAnalysis = () => {
    // Sample data structure from the analysis
    const data = {
        recursive: Array.from({ length: 35 }, (_, i) => ({
            n: i,
            time: Math.pow(1.6, i) * 0.01,
            memoryUsed: Math.pow(1.5, i) * 100
        })),
        dp: Array.from({ length: 45 }, (_, i) => ({
            n: i,
            time: i * 0.1,
            memoryUsed: i * 1000
        })),
        iterative: Array.from({ length: 45 }, (_, i) => ({
            n: i,
            time: i * 0.05,
            memoryUsed: 500
        })),
        matrix: Array.from({ length: 45 }, (_, i) => ({
            n: i,
            time: Math.log2(i + 1) * 0.2,
            memoryUsed: 800
        }))
    };

    // Prepare data for charts
    const timeData = Array.from({ length: 45 }, (_, i) => ({
        n: i,
        Recursive: i <= 35 ? data.recursive[i]?.time : null,
        DP: data.dp[i]?.time,
        Iterative: data.iterative[i]?.time,
        Matrix: data.matrix[i]?.time
    }));

    const memoryData = Array.from({ length: 45 }, (_, i) => ({
        n: i,
        Recursive: i <= 35 ? data.recursive[i]?.memoryUsed : null,
        DP: data.dp[i]?.memoryUsed,
        Iterative: data.iterative[i]?.memoryUsed,
        Matrix: data.matrix[i]?.memoryUsed
    }));

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>Fibonacci Algorithm Analysis</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="time">
                    <TabsList>
                        <TabsTrigger value="time">Execution Time</TabsTrigger>
                        <TabsTrigger value="memory">Memory Usage</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="time">
                        <div className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={timeData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="n" label={{ value: 'n-th Term', position: 'bottom' }} />
                                    <YAxis label={{ value: 'Time (ms)', angle: -90, position: 'left' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="Recursive" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="DP" stroke="#82ca9d" />
                                    <Line type="monotone" dataKey="Iterative" stroke="#ffc658" />
                                    <Line type="monotone" dataKey="Matrix" stroke="#ff7300" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="memory">
                        <div className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={memoryData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="n" label={{ value: 'n-th Term', position: 'bottom' }} />
                                    <YAxis label={{ value: 'Memory (bytes)', angle: -90, position: 'left' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="Recursive" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="DP" stroke="#82ca9d" />
                                    <Line type="monotone" dataKey="Iterative" stroke="#ffc658" />
                                    <Line type="monotone" dataKey="Matrix" stroke="#ff7300" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default FibonacciAnalysis;