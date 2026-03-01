window.Portfolio = window.Portfolio || {};
window.Portfolio.POST_CONTENT = {
  id: 'design-tokens-in-practice',
  content: `
    <p>When I inherited the catalog component library, it had 847 hardcoded color values spread across 134 files. Some were hex. Some were rgba. A few were named CSS variables that referred to other named CSS variables in a chain of indirection that made me question my career choices. One particularly creative engineer had defined a variable called <code>--almost-white</code> with a value of <code>#fafaf9</code>, which is objectively not almost white in any meaningful sense.</p>
    <p>This is the state of most real-world design systems: evolved, not designed. Each decision made sense in isolation at the time it was made. Together, they form a sediment of choices that make global changes terrifying and theming effectively impossible.</p>

    <h2>Why Tokens, Why Now</h2>
    <p>Design tokens are a solved problem in theory and a deeply unsolved problem in practice. The theory: you define a single source of truth for every visual decision — color, spacing, typography, elevation — give each decision a semantic name, and reference those names everywhere. Changing the brand accent color becomes a one-line edit in the token file. Dark mode is just a second mapping of semantic tokens to different primitive values.</p>
    <p>The practice: your existing codebase was written by six different people over four years with no shared vocabulary. The concept of "primary action color" maps to seventeen slightly different values depending on who wrote that file and when. Your Figma designs use one naming convention, your CSS uses another, and your engineers have invented a third one in code because they were working offline and couldn't check the design file.</p>

    <h2>The Migration Strategy</h2>
    <p>We used a three-pass approach that I'd recommend to anyone facing a similar migration. Pass one is the audit. We wrote a script that extracted every color value from every CSS file and grouped near-identical values using a simple hue-saturation-lightness comparison. Anything within five percent lightness of another value was a candidate for consolidation. This surfaced the fact that we had eleven variations of what was conceptually "muted text" — values that ranged from <code>#8a7462</code> to <code>#a08878</code> with no meaningful semantic distinction between them.</p>
    <p>Pass two is the token layer. We defined a two-tier system. Primitive tokens are the raw palette — <code>coral-500: #d44f39</code>, <code>cream-100: #f2e8d5</code>. They describe what the value is. Semantic tokens are intent-based references — <code>color-action-primary: var(--coral-500)</code>, <code>color-text-muted: var(--warm-gray-400)</code>. They describe what the value means. Components only ever reference semantic tokens. Primitive tokens exist only to be referenced by semantic ones.</p>
    <p>Pass three is the find-and-replace. We automated as much as possible — any hardcoded value that had a clear semantic match was replaced automatically. Values that could map to multiple tokens went into a manual review queue. The entire migration across a library of eighty-three components took three sprints.</p>

    <h2>The Figma Synchronisation Problem</h2>
    <p>Tokens in code and tokens in design are only useful if they're the same tokens. Keeping them in sync manually is a losing battle — the design file drifts from the code within weeks. We solved this by making the token file the single source of truth and generating both the CSS custom properties and the Figma variable library from it using a build step. When a designer changes a primitive in Figma, it creates a pull request. When an engineer changes it in code, it syncs back to Figma. The system isn't perfect, but it makes divergence visible rather than silent.</p>

    <h2>The Payoff</h2>
    <p>Dark mode implementation, which I'd been dreading for months, took four hours once the token system was in place. We defined a second set of semantic token values for the dark context and applied them under an <code>[data-theme="dark"]</code> attribute. Components needed zero changes. That moment alone justified every hour of the migration.</p>
    <p>The more subtle payoff is what I'd call "confident change." Before tokens, touching the visual style of any component was a game of whack-a-mole — you'd fix one place and break something visually similar in a component you'd forgotten existed. After tokens, you can change a semantic value and trust that every component using it updates correctly. That trust changes how quickly you're willing to iterate on visual design. It's the difference between a codebase that resists change and one that invites it.</p>
  `
};
