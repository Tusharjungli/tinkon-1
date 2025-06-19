// components/Breadcrumb.tsx
import Link from "next/link";

type BreadcrumbProps = {
  items: { name: string; href?: string }[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-xs text-gray-400 mb-3" aria-label="Breadcrumb">
      <ol className="list-none p-0 flex flex-wrap gap-1 items-center">
        {items.map((item, i) => (
          <li key={i} className="flex items-center">
            {item.href ? (
              <Link href={item.href} className="hover:underline">
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-500">{item.name}</span>
            )}
            {i !== items.length - 1 && (
              <span className="mx-1 select-none text-gray-300">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
