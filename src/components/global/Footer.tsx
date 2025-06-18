export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`border-t border-gray-50 p-80 max-lg:p-20 ${className}`}>
      Footer
    </footer>
  );
}
