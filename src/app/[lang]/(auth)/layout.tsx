

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-100 dark:bg-black text-slate-900 dark:text-white" style={{ minHeight: '100vh' }}>
      {children}
    </div>
  );
}
