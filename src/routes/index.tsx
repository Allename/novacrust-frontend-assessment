import { Button } from '@/components/ui/button';
import { createFileRoute, Link, redirect } from '@tanstack/react-router'

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/users", replace: true });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md flex flex-col gap-4 w-full items-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground text-center">
            User Management System
          </h1>
          <p className="text-lg text-muted-foreground text-center">
            Browse users and explore their posts in a simple, intuitive
            interface. Get started by clicking the button below to view all
            users and their information.
          </p>
        </div>

        <Button className='w-[180px]'>
          <Link to={"/users"} className='w-full'>
            Continue to Task
          </Link>
        </Button>

        <div className="text-sm text-muted-foreground">
          <p>✓ View paginated user list</p>
          <p>✓ Explore user posts</p>
          <p>✓ Manage posts easily</p>
        </div>
      </div>
    </main>
  );
}
