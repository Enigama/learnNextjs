export function GET(request: Request) {
    console.log("API route called with request:", request);
    return new Response(JSON.stringify({ message: "Hello from the API!" }));
}
