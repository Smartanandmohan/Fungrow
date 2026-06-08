import { useState } from "react";
import Modal from "./Modal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Login successful!");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Welcome Back">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label htmlFor="login-email" className="text-sm font-medium text-slate-700 mb-1.5 block">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all text-sm"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="login-password" className="text-sm font-medium text-slate-700 mb-1.5 block">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all text-sm"
          />
        </div>

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand/20"
            />
            <span className="text-sm text-slate-600">Remember me</span>
          </label>
          <a
            href="#"
            className="text-sm font-medium text-brand hover:text-brand-dark transition-colors"
          >
            Forgot password?
          </a>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-brand text-white py-3 rounded-full font-medium text-sm hover:bg-brand-dark transition-colors"
        >
          Log In
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-sm text-slate-400">or</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Sign up as Company */}
        <a
          href="#"
          className="block w-full text-center py-3 rounded-full border border-slate-200 text-sm font-medium text-slate-700 hover:border-brand hover:text-brand transition-colors"
        >
          Sign up as a Company
        </a>
      </form>
    </Modal>
  );
}

export default LoginModal;
