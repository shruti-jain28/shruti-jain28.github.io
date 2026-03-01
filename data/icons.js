window.Portfolio = window.Portfolio || {};

window.Portfolio.ICONS = [
  {
    label: 'Digital',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="26" height="17" rx="2"/><path d="M10 23l2 4h8l2-4"/><rect x="7" y="9" width="18" height="10" rx="1"/><line x1="9" y1="11" x2="14" y2="11"/><line x1="9" y1="13" x2="17" y2="13"/></svg>`,
  },
  {
    label: 'Cooking',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 14v6a9 9 0 0018 0v-6z"/><path d="M7 14c0-2 4-4 9-4s9 2 9 4"/><line x1="4" y1="12" x2="7" y2="14"/><line x1="28" y1="12" x2="25" y2="14"/><path d="M13 6c0-2 1-3 3-3s3 1 3 3"/><path d="M10 28h12"/></svg>`,
  },
  {
    label: 'Hustle',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 3L8 17h8l-2 12L26 15h-9z"/></svg>`,
  },
  {
    label: 'Swim',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="20" cy="7" r="3"/><path d="M3 17c2-4 4-4 6 0s4 4 6 0 4-4 6 0 4-4 6 0"/><path d="M3 23c2-4 4-4 6 0s4 4 6 0 4-4 6 0 4-4 6 0"/><path d="M14 10l3 4-4 3"/></svg>`,
  },
  {
    label: 'Nature',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 29C16 29 5 21 5 12a11 11 0 0122 0c0 9-11 17-11 17z"/><line x1="16" y1="29" x2="16" y2="12"/><path d="M16 20c-3-2-6-2-8-1"/><path d="M16 16c3-2 6-2 8-1"/></svg>`,
  },
  {
    label: 'Sports',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="16" r="13"/><path d="M16 3v4M16 25v4M3 16h4M25 16h4"/></svg>`,
  },
  {
    label: 'Running',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="21" cy="6" r="3"/><path d="M15 10l4 3 4 2M15 10l-4 6-4 1"/><path d="M19 13l-2 7-5 6M23 15l2 7-4 4"/></svg>`,
  },
  {
    label: 'Music',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 26V9l14-4v17"/><circle cx="9" cy="26" r="4"/><circle cx="23" cy="22" r="4"/></svg>`,
  },
  {
    label: 'Coding',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 8L3 16l7 8"/><path d="M22 8l7 8-7 8"/><line x1="14" y1="5" x2="18" y2="27"/></svg>`,
  },
  {
    label: 'Hiking',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 28L13 6l5 8 3-4 9 18z"/><line x1="2" y1="28" x2="30" y2="28"/><circle cx="24" cy="10" r="3"/></svg>`,
  },
  {
    label: 'Adventure',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 15a8 8 0 0116 0"/><path d="M8 15L16 28M24 15L16 28"/><line x1="8" y1="15" x2="24" y2="15"/><line x1="14" y1="15" x2="13" y2="28"/><line x1="18" y1="15" x2="19" y2="28"/></svg>`,
  },
  {
    label: 'Reading',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h13v20H3z"/><path d="M29 7H16v20h13z"/><path d="M16 7c0 0 .5 4 0 20"/><line x1="6" y1="12" x2="13" y2="12"/><line x1="6" y1="16" x2="13" y2="16"/><line x1="19" y1="12" x2="26" y2="12"/><line x1="19" y1="16" x2="26" y2="16"/></svg>`,
  },
  {
    label: 'Social',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16a2 2 0 012 2v9a2 2 0 01-2 2H9l-5 5V7a2 2 0 012-2z"/><line x1="8" y1="10" x2="17" y2="10"/><line x1="8" y1="14" x2="13" y2="14"/></svg>`,
  },
  {
    label: 'Coffee',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 12h14v10a7 7 0 01-14 0V12z"/><path d="M21 14h3a2 2 0 010 4h-3"/><path d="M11 8c0 0 0-3 3-2M17 8c0 0 0-3 3-2"/></svg>`,
  },
  {
    label: 'Yoga',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="5" r="3"/><path d="M16 8v8M10 12l6 4 6-4"/><path d="M12 20c0 0-4 2-6 6h20c-2-4-6-6-6-6"/></svg>`,
  },
  {
    label: 'Flower',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="16" r="4"/><ellipse cx="16" cy="7" rx="3" ry="5"/><ellipse cx="16" cy="25" rx="3" ry="5"/><ellipse cx="7" cy="16" rx="5" ry="3"/><ellipse cx="25" cy="16" rx="5" ry="3"/></svg>`,
  },
  {
    label: 'Bicycle',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="23" r="7"/><circle cx="24" cy="23" r="7"/><path d="M8 23l6-11h6l4 11"/><line x1="14" y1="12" x2="18" y2="12"/></svg>`,
  },
  {
    label: 'Star',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3l3.5 9h9.5l-7.5 5.5 3 9L16 21l-8.5 5.5 3-9L3 12h9.5z"/></svg>`,
  },
  {
    label: 'Camera',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="10" width="28" height="18" rx="3"/><circle cx="16" cy="19" r="6"/><circle cx="16" cy="19" r="3"/><path d="M6 10l3-5h14l3 5"/></svg>`,
  },
  {
    label: 'Moon',
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M27 17A11 11 0 1115 5a9 9 0 0012 12z"/></svg>`,
  },
];
