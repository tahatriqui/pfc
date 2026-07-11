import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form.jsx";
import { Input } from "../../ui/input.jsx";
import { Button } from "../../ui/button.jsx";
import { useNavigate } from "react-router-dom";
import { redirectToDashboard } from "../../../router/index.jsx";
import { Loader, MailIcon, LockIcon } from "lucide-react";
import { useUserContext } from "../../../context/StudentContext.jsx";

const formSchema = z.object({
  email: z.string().email("Invalid email address").min(2).max(50),
  password: z.string().min(8, "Password must be at least 8 characters").max(30),
});

export default function UserLogin() {
  const { login, setAuthenticated, setToken } = useUserContext();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    try {
      const { status, data } = await login(values.email, values.password);

      if (status === 200) {
        setToken(data.token);
        setAuthenticated(true);

        const { role } = data.user;
        navigate(redirectToDashboard(role));
      }
    } catch (error) {
      console.log(error);

      const message =
        error.response?.data?.errors?.email?.join(", ") ||
        error.response?.data?.message ||
        "Cannot connect to backend. Make sure Laravel is running.";

      setError("email", {
        message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-200">
                Email
              </FormLabel>

              <FormControl>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <Input
                    placeholder="admin@admin.admin"
                    {...field}
                    className="h-12 border-slate-700 bg-slate-900 pl-10 text-white placeholder:text-slate-500 focus:border-cyan-500"
                  />
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-200">
                Password
              </FormLabel>

              <FormControl>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <Input
                    type="password"
                    placeholder="123456789"
                    {...field}
                    className="h-12 border-slate-700 bg-slate-900 pl-10 text-white placeholder:text-slate-500 focus:border-cyan-500"
                  />
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isSubmitting}
          type="submit"
          className="h-12 w-full bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold text-white hover:from-blue-700 hover:to-cyan-600"
        >
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>

       
      </form>
    </Form>
  );
}
