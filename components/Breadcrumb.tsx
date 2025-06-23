// components/Breadcrumb.tsx
import Link from "next/link";

type BreadcrumbProps = {
  items: { name: string; href?: string }[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-xs text-gray-600 dark:text-gray-300 mb-3 transition-colors" aria-label="Breadcrumb">
      <ol className="list-none p-0 flex flex-wrap gap-1 items-center">
        {items.map((item, i) => (
          <li key={i} className="flex items-center">
            {item.href ? (
              <Link href={item.href} className="hover:underline text-gray-700 dark:text-gray-100 transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-400 dark:text-gray-400">{item.name}</span>
            )}
            {i !== items.length - 1 && (
              <span className="mx-1 select-none text-gray-300 dark:text-gray-600">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
