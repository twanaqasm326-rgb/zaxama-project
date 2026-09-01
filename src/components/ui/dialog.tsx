import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "dialog-overlay fixed inset-0 z-50 bg-stone-950/40 backdrop-blur-sm",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        // Mobile: bottom-sheet that slides up, full width, rounded top corners
        "dialog-content fixed z-50 grid w-full border border-border bg-card shadow-modal overflow-y-auto",
        "inset-x-0 bottom-0 max-h-[94vh] rounded-t-2xl p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] gap-3",
        // sm+: centered modal, classic dialog positioning
        "sm:inset-auto sm:left-[50%] sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:bottom-auto sm:max-w-4xl sm:rounded-2xl sm:max-h-[90vh] sm:p-6 md:p-8 sm:gap-4",
        className
      )}
      {...props}
    >
      {/* Mobile drag handle indicator */}
      <div className="sm:hidden w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-600 mx-auto shrink-0 -mt-1 mb-1" />
      {children}
      <DialogPrimitive.Close className="absolute right-2.5 top-2.5 sm:right-3.5 sm:top-3.5 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-muted-foreground transition-all hover:bg-secondary hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none cursor-pointer z-10 bg-slate-100/80 dark:bg-slate-800/80 sm:bg-transparent dark:sm:bg-transparent">
        <X className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="sr-only">Close inspection</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-xl md:text-2xl font-serif font-medium tracking-tight text-foreground",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground font-light leading-relaxed", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
