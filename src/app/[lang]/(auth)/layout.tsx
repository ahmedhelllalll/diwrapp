import './auth.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-root dark:bg-black transition-colors duration-300">
      {children}
    </div>
  );
}
