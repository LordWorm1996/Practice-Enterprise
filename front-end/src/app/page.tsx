import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle>Welcome to Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input placeholder="Enter your email" />
                    <Button>Submit</Button>
                </CardContent>
            </Card>
        </main>
    );
}
