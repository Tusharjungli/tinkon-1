export default function Footer() {
  return (
    <footer className="border-t py-8 text-center text-xs text-gray-500 bg-white">
      &copy; {new Date().getFullYear()} Tushar Panchal — Tink On It.
      <span className="ml-2">Made with 💡 for thinkers and introverts.</span>
    </footer>
  );
}
