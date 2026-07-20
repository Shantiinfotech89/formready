import { ArrowUpRight, Github, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function OpenSourceCard() {
  return (
    <Card variant="warm" className="border-border">
      <CardContent className="grid gap-6 p-6 sm:p-8 md:grid-cols-[auto_1fr_auto] md:items-center">
        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background shadow-sm">
          <Github className="h-6 w-6" strokeWidth={1.75} />
        </div>

        {/* Body */}
        <div>
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            Read the code. Audit the engine.
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We open-source the compression engine on GitHub under{' '}
            <span className="num font-medium text-foreground">MIT</span>. Every claim about how compression works can be verified by reading the source. Found a vulnerability? Please report privately to{' '}
            <a
              href="mailto:security@compress4.com"
              className="inline-flex items-center gap-1 font-medium text-primary-press underline-offset-4 hover:underline"
            >
              <ShieldAlert className="h-3 w-3" />
              security@compress4.com
            </a>{' '}
            before public disclosure.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
          <Button asChild variant="primary" size="sm">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              View on GitHub
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a href="mailto:security@compress4.com">
              Security disclosure
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
