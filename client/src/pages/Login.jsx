import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export default function Login({ isOpen, onClose,onOpenSignUp }) {
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("Login data:", data);
    // Add your login API logic here
     onClose()         // modal band karo
    navigate("/") 
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <Card
        className="max-w-sm w-full border border-l-6 rounded-md border-l-amber-500   shadow-2xl shadow-amber-600/60 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 text-xl z-10"
        >
          ×
        </button>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-amber-600">Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="login-email" className={errors.email ? "text-red-500" : ""}>Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="m@example.com"
                  className={errors.email ? "border-red-500" : ""}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs font-medium text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-1.5">
                <div className="flex items-center">
                  <Label htmlFor="login-password" className={errors.password ? "text-red-500" : ""}>Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-xs underline-offset-4 hover:underline text-muted-foreground"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="login-password"
                  type="password"
                  className={errors.password ? "border-red-500" : ""}
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs font-medium text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
          <Button variant="outline" type="button" className="w-full gap-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Login with Google
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => { onClose(); onOpenSignUp?.(); }}
              className="underline underline-offset-4 font-medium text-foreground hover:text-amber-600 transition-colors"
            >
              Sign up
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
