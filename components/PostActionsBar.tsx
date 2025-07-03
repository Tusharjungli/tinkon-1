// components/PostActionsBar.tsx

export default function PostActionsBar({
  bookmark,
  share,
}: {
  bookmark: React.ReactNode;
  share: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-end w-full py-4 mt-2 mb-8">
      <div className="flex items-center gap-7">
        {bookmark}
        {share}
      </div>
    </div>
  );
}
