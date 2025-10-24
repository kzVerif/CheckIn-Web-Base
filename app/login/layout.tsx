// app/login/layout.tsx
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans bg-indigo-50 flex items-center justify-center">
      {children}
    </div>
  );
}
