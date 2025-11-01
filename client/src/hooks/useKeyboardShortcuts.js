import { useEffect } from 'react';

export const useKeyboardShortcuts = ({
  onClearSelection,
  onSelectAll,
  onDownloadSelected,
  selectedCount,
  hasResults
}) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Only trigger if we're not typing in an input
      if (event.target.tagName === 'INPUT') return;

      // Ctrl/Cmd + A: Select all images
      if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
        event.preventDefault();
        if (hasResults && onSelectAll) {
          onSelectAll();
        }
      }

      // Escape: Clear selection
      if (event.key === 'Escape') {
        if (selectedCount > 0 && onClearSelection) {
          onClearSelection();
        }
      }

      // Ctrl/Cmd + D: Download selected
      if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
        event.preventDefault();
        if (selectedCount > 0 && onDownloadSelected) {
          onDownloadSelected();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClearSelection, onSelectAll, onDownloadSelected, selectedCount, hasResults]);
};