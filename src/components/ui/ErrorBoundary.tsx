import { Component, ErrorInfo, ReactNode } from 'react'
import { RotateCcw, Compass } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Showroom Uncaught Error:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  private handleReload = () => {
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 shadow-card space-y-6 animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center mx-auto text-primary">
              <Compass className="h-7 w-7" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-primary font-medium block">
                FAKHAMA DECOR • SHOWROOM RECOVERY
              </span>
              <h2 className="font-serif text-2xl font-normal text-foreground">
                Experience Temporarily Interrupted
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                An unexpected client-side interface issue occurred. Your curated product selection remains safely preserved.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="flex-1 py-3 px-4 rounded-xl border border-border bg-secondary hover:bg-stone-200/80 text-foreground text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer"
              >
                Reset View
              </button>
              <button
                onClick={this.handleReload}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-foreground text-background hover:bg-stone-800 text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-subtle cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5 text-primary" />
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
