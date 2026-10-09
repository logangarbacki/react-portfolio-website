import './Note.css';

// A handwritten margin note. On wide screens it sits in the margin beside the
// column; on narrow screens it either drops inline or hides (desktopOnly),
// since notes like "that's me →" only make sense next to what they point at.
export default function Note({ side = 'right', top = 0, tilt = -3, tone = 'pen', desktopOnly = false, children }) {
  const cls = ['note', `note-${side}`, `note-${tone}`, desktopOnly ? 'note-desktop' : ''].join(' ');
  return (
    <span className={cls} style={{ '--top': `${top}px`, '--tilt': `${tilt}deg` }} aria-hidden="true">
      {children}
    </span>
  );
}
