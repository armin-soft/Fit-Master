
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

// Create a VisuallyHidden component for accessibility
const VisuallyHidden = ({ children }: { children: React.ReactNode }) => (
  <span className="sr-only">{children}</span>
);

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
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

// Enhanced function to check if DialogTitle exists in component tree
const hasDialogTitle = (children: React.ReactNode): boolean => {
  const checkChildren = (child: any): boolean => {
    if (!child) return false;
    
    // Check if it's a DialogTitle directly  
    if (child?.type?.displayName === 'DialogTitle' || child?.type === DialogPrimitive.Title) {
      return true;
    }
    
    // Check if it's our custom DialogTitle component
    if (child?.type?.name === 'DialogTitle') {
      return true;
    }
    
    // Check if it's a string displayName (for compiled components)
    if (typeof child?.type === 'string' && child?.type === 'h2') {
      return true; // DialogTitle usually renders as h2
    }
    
    // Check for data attributes or className that might indicate a title
    if (child?.props && (
      child?.props?.['data-dialog-title'] ||
      child?.props?.className?.includes('dialog-title') ||
      child?.props?.role === 'heading'
    )) {
      return true;
    }
    
    // Check children recursively
    if (child?.props?.children) {
      const childArray = React.Children.toArray(child.props.children);
      return childArray.some(checkChildren);
    }
    
    return false;
  };

  const childrenArray = React.Children.toArray(children);
  return childrenArray.some(checkChildren);
};

const hasDialogDescription = (children: React.ReactNode): boolean => {
  const checkChildren = (child: any): boolean => {
    if (!child) return false;
    
    // Check if it's a DialogDescription directly
    if (child?.type?.displayName === 'DialogDescription' || child?.type === DialogPrimitive.Description) {
      return true;
    }
    
    // Check if it's our custom DialogDescription component
    if (child?.type?.name === 'DialogDescription') {
      return true;
    }
    
    // Check for data attributes or className that might indicate a description
    if (child?.props && (
      child?.props?.['data-dialog-description'] ||
      child?.props?.className?.includes('dialog-description') ||
      child?.props?.role === 'description'
    )) {
      return true;
    }
    
    // Check children recursively
    if (child?.props?.children) {
      const childArray = React.Children.toArray(child.props.children);
      return childArray.some(checkChildren);
    }
    
    return false;
  };

  const childrenArray = React.Children.toArray(children);
  return childrenArray.some(checkChildren);
};

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    hideTitle?: boolean;
  }
>(({ className, children, hideTitle = false, ...props }, ref) => {
  const hasTitle = hasDialogTitle(children);
  const hasDescription = hasDialogDescription(children);

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )}
        aria-describedby={hasDescription ? undefined : "dialog-description-default"}
        {...props}
      >
        {!hasTitle && (
          <DialogPrimitive.Title asChild>
            <VisuallyHidden>گفتگو</VisuallyHidden>
          </DialogPrimitive.Title>
        )}
        {!hasDescription && (
          <DialogPrimitive.Description id="dialog-description-default" asChild>
            <VisuallyHidden>محتوای گفتگو</VisuallyHidden>
          </DialogPrimitive.Description>
        )}
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
})
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
      "text-lg font-semibold leading-none tracking-tight",
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
    className={cn("text-sm text-muted-foreground", className)}
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
  VisuallyHidden
}
