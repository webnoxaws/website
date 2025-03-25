"use client"

import type * as React from "react"
import { BarChart3, Box, CreditCard, MessageSquare, Package, Settings, ShoppingCart, Truck } from "lucide-react"
import Image from "next/image"
import "./app-sidebar.css"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"

const navItems = [
  {
    title: "Ecommerce",
    icon: ShoppingCart,
    url: "/seller",
  },
  {
    title: "Analysis",
    icon: BarChart3,
    url: "#",
  },
  {
    title: "Products",
    icon: Box,
    url: "/seller/products",
    isActive:true
  },
  {
    title: "Orders",
    icon: Package,
    url: "#",
  },
  {
    title: "Payments",
    icon: CreditCard,
    url: "#",
  },
  {
    title: "Chat",
    icon: MessageSquare,
    url: "#",
  },
  {
    title: "Shipping & Logistics",
    icon: Truck,
    url: "#",
  },
  {
    title: "Reports",
    icon: BarChart3,
    url: "#",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "#",
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="sidebar-custom relative self-start mt-[-100vh]" {...props}>
      <SidebarHeader className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 sidebar-menu">
          <div className="flex-shrink-0 overflow-hidden" >
            <Link href={"/"}>
            <Image
              src="/assets/logo.svg"
              alt="Make Easy"
              width={100}
              height={40}
              className="h-[2rem] w-auto absolute top-2 left-[25%]"
              />
              </Link>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="py-4">
        <SidebarMenu className="sidebar-menu ">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title} className="sidebar-menu-item">
              <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title} className="sidebar-menu-button">
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

