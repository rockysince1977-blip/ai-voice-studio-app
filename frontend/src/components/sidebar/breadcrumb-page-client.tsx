"use client"

import { usePathname } from 'next/navigation'
import React from 'react'
import { BreadcrumbPage } from '../ui/breadcrumb'

export function BreadcrumbPageClient() {
    const pathname = usePathname()
    const getPageTitle = (path:String)=>{
        switch (path) {
            case "/dashboard":
                return "Dashboard"
            case "/dashboard/create":
                return "Create"
            case "/dashboard/projects":
                return "Projects"
            case "/dashboard/settings":
                return "Settings"
            default:
                return "Dashboard"
        }
        
    }

  return (
    <BreadcrumbPage className='text-foreground text-sm font-medium'>{getPageTitle(pathname)}</BreadcrumbPage>
  )
}

