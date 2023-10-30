export class SocketShim {
    private client: DataConnection;
    public events: Map<string, (args: any) => void>;
    public id: string;
    constructor(_socket: DataConnection) {
        this.id = "";
        this.events = new Map();

        this.client.on("error", (error) => {
            console.error("Data connection error:", error);
        });
        this.client.on("close", () => {
            try {
                const xhandler = this.events.get("disconnect");
                if (xhandler !== undefined) {
                    xhandler("");
                }
            } catch {}
        });
    }
    public on(event_name: string | "disconnect", handler: (args: any) => void) {
        this.events.set(event_name, handler);
        this.client.on("data", () => {});
    }
    public emit(event_name: string, args?: any) {
        this.client.send(JSON.stringify({ event: event_name, args: args ?? undefined }));
    }
    public disconnect() {
        
    }
}