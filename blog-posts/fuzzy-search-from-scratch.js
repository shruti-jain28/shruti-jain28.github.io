window.Portfolio = window.Portfolio || {};
window.Portfolio.POST_CONTENT = {
  id: 'fuzzy-search-from-scratch',
  content: `
    <p>Most tutorials on fuzzy search point you straight to a library. Fuse.js for JavaScript, RapidFuzz for Python, whoosh for anything requiring indexing. And for production systems with scale requirements, that's often exactly the right call — these libraries are well-tested, well-documented, and handle edge cases you haven't thought of yet. But there's real value in understanding what's happening under the hood, especially when you need something lightweight, customisable, or simply don't want to pull in a 20KB dependency for a search bar that queries a list of fifty items.</p>
    <p>This is the story of writing a fuzzy matcher from scratch that's small enough to understand completely and powerful enough to actually use. The final implementation is under sixty lines including comments.</p>

    <h2>What "Fuzzy" Actually Means</h2>
    <p>A fuzzy search matches strings that are approximately equal to the query rather than exactly equal. Type "algrtm" and get back "algorithm." Type "javscript" and still find "JavaScript." The definition sounds simple; the implementation branches into several different algorithmic approaches depending on what kind of "approximately equal" you care about.</p>
    <p>The two main families are edit-distance based matching (Levenshtein distance, Damerau-Levenshtein) and subsequence based matching. Edit distance counts the minimum number of single-character insertions, deletions, or substitutions needed to transform one string into another. Subsequence matching asks a simpler question: do all the characters in the query appear in the target, in order, regardless of what's between them? For search-as-you-type interfaces, subsequence matching tends to feel more natural because it rewards users for typing the distinctive parts of what they're looking for.</p>

    <h2>The Subsequence Approach</h2>
    <p>The core idea: does every character in the query appear in the target string, in order? "jscrpt" matches "JavaScript" because j, s, c, r, p, t all appear left-to-right. The matching doesn't have to be contiguous — there can be any number of characters between matched positions. This is why it feels natural: you're essentially typing the skeleton of the word you're thinking of.</p>
    <p>The implementation is a two-pointer walk through both strings simultaneously. We advance through the target character by character. When we find a match for the current query character, we advance the query pointer. If we exhaust the query before the target, every query character was found in order — it's a match.</p>
    <pre><code>function fuzzyMatch(target, query) {
  target = target.toLowerCase();
  query  = query.toLowerCase();
  let ti = 0, qi = 0;
  while (ti &lt; target.length &amp;&amp; qi &lt; query.length) {
    if (target[ti] === query[qi]) qi++;
    ti++;
  }
  return qi === query.length;
}</code></pre>

    <h2>Adding a Score</h2>
    <p>Boolean matching is useful for filtering; ranking results by relevance is what makes search feel intelligent. A list of fifty matches is only marginally better than no filter at all if the most relevant result is buried at position thirty-seven. Scoring is what separates a useful search from a technically-correct one.</p>
    <p>I score each match based on three weighted factors. First, early-start bonus: matches that begin closer to the start of the string score higher, because "jav" matching "JavaScript" at position zero is probably more relevant than "jav" matching "object traversal" at position eight. Second, consecutiveness: the proportion of matched characters that are adjacent to each other. "jscript" matching "JavaScript" consecutively scores higher than "j_s_c_r_i_p_t" spread across the whole string. Third, exact-substring bonus: if the query appears verbatim anywhere in the target, that's a strong relevance signal and earns a significant score boost.</p>
    <p>The weighted sum is normalised to zero through one hundred. In practice, results above sixty feel deliberately relevant. Results between thirty and sixty are plausible. Results below thirty are probably noise and can be filtered out. These thresholds are tunable — your content and user behaviour will tell you where the right cutoffs are.</p>

    <h2>Multi-Field Search</h2>
    <p>Real search queries don't respect field boundaries. A user searching "AI catalog" might be thinking about the title of one post, the tag on another, and the excerpt of a third. Scoring each field separately and taking the maximum — with different weights for each field — handles this naturally. Title matches score highest because titles are the most concentrated signal. Tag matches score high because tags are deliberately chosen keywords. Excerpt matches score lower but still contribute to overall relevance.</p>
    <p>This multi-field approach is what makes the search feel like it "understands" what you're looking for even when your query is an approximate fragment of something buried in the content. The implementation adds maybe fifteen lines to the core matching function, and the improvement in user experience is substantial.</p>

    <h2>What the Libraries Add</h2>
    <p>After building this, I have a much clearer sense of what Fuse.js and its relatives are actually doing. The core algorithms are similar; the libraries add phonetic matching, Unicode normalisation, configurable thresholds, index structures for performance at scale, and years of edge case handling. If you're searching thousands of records or need to handle non-Latin scripts reliably, use a library. If you're searching a reasonably-sized list of items in a controlled context, a sixty-line implementation you fully understand is worth considering.</p>
  `
};
