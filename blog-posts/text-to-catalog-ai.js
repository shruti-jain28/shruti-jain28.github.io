window.Portfolio = window.Portfolio || {};
window.Portfolio.POST_CONTENT = {
  id: 'text-to-catalog-ai',
  content: `
    <p>There's a particular kind of terror that comes from deploying a feature whose output you fundamentally cannot predict. Generative AI sits right in that category. When my team at ServiceNow set out to build Text to Catalog — an agent that reads a plain-English description and spits out a fully structured catalog item — we had no idea how many assumptions we'd have to kill along the way.</p>

    <p>The promise was compelling: an enterprise IT manager shouldn't need to know the internal schema of a service catalog to create a request form. They should be able to type "I need a form for laptop procurement approvals" and get back something production-ready. That's the dream. The reality involved considerably more YAML, considerably more retry logic, and at least three internal debates about what "production-ready" even means for AI output.</p>

    <h2>The Naive Version</h2>
    <p>Our first prototype was embarrassingly simple: take user input, stuff it into a prompt, call the model, parse the JSON. It worked beautifully in demos. It failed in roughly forty percent of real inputs during internal testing. The failure modes were fascinating — the model would occasionally invent fields we hadn't defined, hallucinate approval workflows, or produce valid JSON that violated our schema in creative ways we hadn't anticipated.</p>
    <p>We quickly learned that "prompt engineering" is a misleading phrase. It implies you write a prompt once and ship it. The reality is closer to writing a contract with an entity that has read the entire internet and has very strong opinions about what a catalog item should look like. You're not instructing it; you're negotiating with it, and sometimes it decides the negotiation is over and does what it wants.</p>

    <h2>Schema-First Thinking</h2>
    <p>The breakthrough came when we flipped the framing entirely. Instead of asking the model to generate a catalog item, we started asking it to fill in a schema we controlled completely. We'd hand it a JSON template with every field explicitly typed and described, along with one-shot examples of ideal completions. The model's job was no longer to be creative — it was to be a very smart form-filler.</p>
    <p>This reduced hallucinations dramatically. More importantly, it made validation trivial: if the output didn't match the schema, we could retry with a targeted correction prompt rather than starting from scratch. We built a lightweight retry loop with three attempts before surfacing an error to the user. In practice, the third attempt was needed less than two percent of the time.</p>
    <p>The schema approach also had an unexpected benefit: it made the feature's capabilities legible to non-engineers. When a product manager asks "what can this thing generate?" the answer is now "anything that fits this schema" rather than "it depends on what the model feels like doing today."</p>

    <h2>The Latency Problem</h2>
    <p>Enterprise users are patient, but not infinitely so. Our P90 latency sat at around eleven seconds on first load — acceptable for a power user generating a complex item, brutal for someone who just wants a simple request form. We solved this with streaming: piping the model's output token-by-token into the UI so users could see the form fields populate in real time. It didn't make the process faster, but it made it feel faster, which turns out to matter just as much as actual performance.</p>
    <p>Perceived performance and actual performance are different problems with different solutions. Streaming addressed the former. Caching common patterns and pre-warming model connections addressed the latter. Together, they brought our perceived response time from "frustrating" to "impressive" without changing the underlying model call at all.</p>

    <h2>Testing AI Output</h2>
    <p>Testing non-deterministic systems requires rethinking what "a test" even is. We couldn't assert that the output would be exactly a specific JSON blob — it changed on every run. What we could assert was structural: does it contain all required fields? Are the field types correct? Does the output validate against our schema? Is the variable naming consistent with our conventions?</p>
    <p>We built a test suite that ran a hundred representative prompts and checked these structural properties. We also built a "red team" test suite specifically targeting edge cases: empty inputs, inputs in other languages, inputs that were really questions rather than descriptions, inputs designed to make the model ignore its instructions. The red team suite surfaced more genuine issues than the happy-path suite by a factor of three.</p>

    <h2>What I'd Tell Myself Six Months Ago</h2>
    <p>Test your prompts against the weirdest inputs your users will actually type. Run red-teaming sessions where teammates try to break the feature on purpose. Build your validation layer before your generation layer. And accept early that some percentage of outputs will need human review — designing that gracefully is the actual engineering challenge, not the AI part.</p>
    <p>The most honest thing I can say about shipping AI features is that the model is maybe thirty percent of the work. The other seventy is everything you build around it: the schema, the validation, the retry logic, the streaming UX, the fallback states, and the careful work of setting user expectations correctly. The model doesn't make promises to your users. You do.</p>
  `
};
