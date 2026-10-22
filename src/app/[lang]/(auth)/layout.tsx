

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen min-h-[100dvh] w-full flex flex-col lg:flex-row bg-gray-100 dark:bg-black text-slate-900 dark:text-white" style={{ minHeight: '100dvh' }}>
      {children}
    </div>
  );
}
