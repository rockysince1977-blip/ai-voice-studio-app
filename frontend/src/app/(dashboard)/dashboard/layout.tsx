import "~/styles/globals.css"
import { Providers } from "~/components/providers"
import { Toaster } from "sonner"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
export default function RootLayout({children,}:Readonly<{children: React.ReactNode}>){
    return <Providers>
        <SidebarProvider>
            <SidebarTrigger/>
            <SidebarInset className="flex h-screen felx-col">
            {children}
            </SidebarInset>
        <Toaster/>
        </SidebarProvider>

    </Providers>
}