import type { Metadata } from 'next';
import BookmarksPageContent from '@/components/pages/bookmarks-page';

export const metadata: Metadata = {
  title: 'Bookmark Collection',
  description: 'Saved guides, maps, builds, and collections'
};

export default function BookmarksPage(): JSX.Element {
  return <BookmarksPageContent />;
}
