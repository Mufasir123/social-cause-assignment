"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getUser } from "@/store/userSlice/userSlice";
import { toast } from "react-toastify";

function Register() {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = useId();
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password || (!login && !data.name)) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const url = login ? "/api/login" : "/api/register";
      const res = await axios.post(url, data);

      if (res.data.success === true) {
        toast.success(login ? "Login successful" : "User registered successfully");
        localStorage.setItem("token", res.data.token);
        dispatch(getUser(res.data.user));
        router.push("/content-library");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid Credentials");
    } finally {
      setLoading(false);
      setData({ name: "", email: "", password: "" });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button  className='bg-black text-white hover:bg-white hover:text-black duration-300 transition-all border cursor-pointer '>Sign in</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <svg className="stroke-zinc-800 dark:stroke-zinc-100 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
              <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">{login ? "Welcome back" : "Create an account"}</DialogTitle>
            <DialogDescription className="sm:text-center">
              {login ? "Enter your credentials to login to your account." : "Sign up to get started."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {!login && (
            <div className="space-y-2">
              <Label htmlFor={`${id}-name`}>User Name</Label>
              <Input
                id={`${id}-name`}
                placeholder="Enter your name"
                type="text"
                name="name"
                value={data.name}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor={`${id}-email`}>Email</Label>
            <Input
              id={`${id}-email`}
              placeholder="hi@yourcompany.com"
              type="email"
              name="email"
              value={data.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${id}-password`}>Password</Label>
            <Input
              id={`${id}-password`}
              placeholder="Enter your password"
              type="password"
              name="password"
              value={data.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
            {loading ? (login ? "Signing in..." : "Registering...") : login ? "Sign in" : "Register"}
          </Button>
        </form>

        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          <span className="text-xs text-muted-foreground">Or</span>
        </div>

        <p className="mt-4 text-center text-sm">
          {login ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setLogin(false)}
                className="text-blue-500 underline cursor-pointer"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setLogin(true)}
                className="text-blue-500 underline cursor-pointer"
              >
                Login
              </button>
            </>
          )}
        </p>
      </DialogContent>
    </Dialog>
  );
}

export default Register;
