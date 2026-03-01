window.Portfolio = window.Portfolio || {};

/**
 * Manual category definitions.
 * Any blog post whose tags[] intersects with a category's tags[] is automatically
 * included under that category — no per-post configuration needed.
 *
 * Add a new category here and it appears in both the ribbon and the index panel.
 * Add a new blog post with matching tags and it auto-populates.
 */
window.Portfolio.CATEGORIES = [
  {
    id:    'engineering',
    label: 'Engineering',
    color: '#d44f39',   /* coral — default accent */
    tags:  ['Engineering', 'Backend', 'JavaScript', 'Algorithms', 'Cloud', 'ITOM'],
  },
  {
    id:    'ai',
    label: 'AI & LLMs',
    color: '#b07d3a',
    tags:  ['AI', 'LLMs', 'Patterns'],
  },
  {
    id:    'frontend',
    label: 'Frontend & Design',
    color: '#5a6e9a',
    tags:  ['Frontend', 'CSS', 'Design Systems', 'UX'],
  },
  {
    id:    'security',
    label: 'Security',
    color: '#7a4a8a',
    tags:  ['Security'],
  },
  {
    id:    'servicenow',
    label: 'ServiceNow',
    color: '#2e7d5e',
    tags:  ['ServiceNow', 'ITOM', 'Cloud'],
  },
  {
    id:    'career',
    label: 'Career & Growth',
    color: '#8a5a2a',
    tags:  ['Career', 'Writing', 'Growth', 'Personal'],
  },
];
