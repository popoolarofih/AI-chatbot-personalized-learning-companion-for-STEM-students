import { login, signup } from './actions';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white dark:bg-[#1a2033] p-8 shadow-xl border border-slate-200 dark:border-[#252d46]">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-[#95a0c6]">Sign in to your STEM Companion</p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-lg border-0 py-2.5 text-slate-900 dark:text-white ring-1 ring-inset ring-slate-300 dark:ring-[#252d46] placeholder:text-slate-400 dark:bg-[#252d46] focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-lg border-0 py-2.5 text-slate-900 dark:text-white ring-1 ring-inset ring-slate-300 dark:ring-[#252d46] placeholder:text-slate-400 dark:bg-[#252d46] focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              formAction={login}
              className="group relative flex w-full justify-center rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all shadow-lg shadow-primary/20"
            >
              Sign in
            </button>
            <button
              formAction={signup}
              className="group relative flex w-full justify-center rounded-lg border border-slate-300 dark:border-[#252d46] px-3 py-2.5 text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#252d46] transition-all"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
