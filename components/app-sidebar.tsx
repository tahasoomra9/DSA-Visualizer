"use client"

import * as React from "react"
import { MoveHorizontal, SearchCode, SquareStack } from "lucide-react"
import { ALGORITHM_DEFINITIONS, ALGORITHM_ORDER, type AlgorithmKey } from "@/lib/algorithms"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  selectedAlgorithm: AlgorithmKey
  onAlgorithmSelect: (algorithm: AlgorithmKey) => void
}

const iconByAlgorithm: Record<AlgorithmKey, React.ComponentType<{ className?: string }>> = {
  "linear-search": SearchCode,
  "two-pointers": MoveHorizontal,
  "sliding-window": SquareStack,
}

export function AppSidebar({ selectedAlgorithm, onAlgorithmSelect, ...props }: AppSidebarProps) {
  const selectedDefinition = ALGORITHM_DEFINITIONS[selectedAlgorithm]

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border" {...props}>
      <SidebarHeader className="border-b border-sidebar-border px-3 py-3 transition-[padding] duration-300 ease-out motion-reduce:transition-none group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2">
        <div className="flex items-center gap-3 rounded-lg px-1 py-1 transition-[gap,padding] duration-300 ease-out motion-reduce:transition-none group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0">
          <div className="flex aspect-square size-9 shrink-0 items-center justify-center rounded-lg border border-sidebar-border text-sidebar-foreground transition-[width,height] duration-300 ease-out motion-reduce:transition-none group-data-[collapsible=icon]:size-8">
            DS
          </div>
          <div className="grid min-w-0 flex-1 max-w-48 gap-0.5 overflow-hidden leading-none transition-[max-width,opacity,transform] duration-300 ease-out motion-reduce:transition-none group-data-[collapsible=icon]:max-w-0 group-data-[collapsible=icon]:translate-x-1 group-data-[collapsible=icon]:opacity-0">
            <span className="truncate text-sm font-semibold text-sidebar-foreground">DSA Wizard</span>
            <span className="truncate text-xs text-sidebar-foreground/70">Algorithm Visualizer</span>
          </div>
          <div className="max-w-24 overflow-hidden whitespace-nowrap rounded-md border border-sidebar-border px-2 py-1 text-xs font-medium text-sidebar-foreground/70 transition-[max-width,opacity,padding,margin] duration-300 ease-out motion-reduce:transition-none group-data-[collapsible=icon]:max-w-0 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:opacity-0">
            {ALGORITHM_ORDER.length} algorithms
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3 transition-[padding] duration-300 ease-out motion-reduce:transition-none group-data-[collapsible=icon]:py-2">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-2 text-xs font-semibold uppercase tracking-[0.08em] text-sidebar-foreground/70">
            Choose Algorithm
          </SidebarGroupLabel>
          <SidebarGroupContent className="pt-1">
            <SidebarMenu className="gap-1 transition-[gap] duration-300 ease-out motion-reduce:transition-none group-data-[collapsible=icon]:gap-2">
              {ALGORITHM_ORDER.map((key) => {
                const algorithm = ALGORITHM_DEFINITIONS[key]
                const isSelected = selectedAlgorithm === key
                const Icon = iconByAlgorithm[key]

                return (
                  <SidebarMenuItem key={key}>
                    <SidebarMenuButton
                      tooltip={algorithm.label + " - " + algorithm.description}
                      isActive={isSelected}
                      onClick={() => onAlgorithmSelect(key)}
                      className="h-auto items-start gap-3 rounded-lg px-3 py-3 text-sidebar-foreground hover:translate-x-0.5 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:hover:translate-x-0 data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2!"
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover/menu-button:translate-x-0.5 group-data-[collapsible=icon]:mt-0 group-data-[collapsible=icon]:group-hover/menu-button:translate-x-0" />
                      <div className="min-w-0 max-w-48 max-h-20 space-y-1 overflow-hidden text-left transition-[max-width,max-height,opacity,transform] duration-300 ease-out motion-reduce:transition-none group-data-[collapsible=icon]:max-w-0 group-data-[collapsible=icon]:max-h-0 group-data-[collapsible=icon]:translate-x-1 group-data-[collapsible=icon]:opacity-0">
                        <div className="truncate text-sm font-medium">{algorithm.label}</div>
                        <p
                          className={
                            isSelected
                              ? "line-clamp-2 text-xs leading-relaxed text-sidebar-primary-foreground/80"
                              : "line-clamp-2 text-xs leading-relaxed text-sidebar-foreground/70"
                          }
                        >
                          {algorithm.description}
                        </p>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="max-h-28 overflow-hidden border-t border-sidebar-border p-3 transition-[max-height,opacity,padding,border-color] duration-300 ease-out motion-reduce:transition-none group-data-[collapsible=icon]:max-h-0 group-data-[collapsible=icon]:border-transparent group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:opacity-0">
        <div className="rounded-lg border border-sidebar-border px-3 py-3">
          <p className="truncate text-xs font-semibold text-sidebar-foreground">
            Now viewing: {selectedDefinition.label}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-sidebar-foreground/70">
            Press Ctrl/Cmd + B to collapse or expand the navigation.
          </p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}