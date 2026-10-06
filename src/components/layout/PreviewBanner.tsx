/**
 * Shown on every page of a preview deployment, where proposed and draft content is visible
 * for client review. Never rendered in production content mode.
 */
export function PreviewBanner() {
  return (
    <div role="note" className="bg-yellow-400 px-4 py-2 text-center text-sm font-semibold text-ink">
      Preview build — includes unconfirmed content for client review. Not for publication.
    </div>
  );
}
