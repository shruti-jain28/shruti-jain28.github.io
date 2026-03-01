window.Portfolio = window.Portfolio || {};
window.Portfolio.POST_CONTENT = {
  id: 'cloud-account-management',
  content: `
    <p>Cloud onboarding used to be a ticket you filed on Monday that got resolved by Wednesday next week, if you were lucky. By the time your AWS account was connected and visible in the service map, the infrastructure it represented had already changed three times and the engineer who submitted the original request had moved on to a different project entirely.</p>
    <p>This wasn't anyone's fault. It was the natural result of a process that had grown organically around a problem that nobody owned entirely. Each handoff made sense locally. Together, they created a friction that was invisible to any one person and deeply visible to everyone who experienced the whole journey.</p>

    <h2>The Problem with Manual Processes</h2>
    <p>The root cause was a series of handoffs across team boundaries. The request went from the engineer to the IT admin, to the cloud team, back to IT, then to whoever owned the CMDB that week. Each handoff introduced latency, the possibility of transcription error, and the overhead of context re-establishment. Credentials were passed in emails. Account IDs were typed by hand into forms. MID server configurations were copy-pasted from last year's runbook which may or may not have been updated since the cloud provider changed their API.</p>
    <p>It was the kind of process that accumulates because no single person sees the whole thing at once. The IT admin does their part correctly. The cloud team does their part correctly. The CMDB owner does their part correctly. The outcome is still a two-week wait for something that is fundamentally a series of API calls.</p>

    <h2>Designing for Self-Service</h2>
    <p>CAM's core insight was that the person who needs the cloud account connected is usually the same person who has the credentials to connect it. The engineer requesting an AWS account onboarding has IAM access to that AWS account. There's no fundamental reason for a handoff at all — only historical reasons born from the assumption that cloud connectivity was a specialised, high-risk operation that required dedicated experts.</p>
    <p>We built a wizard-style UI where an engineer could authenticate their cloud provider using their own credentials, select which accounts to onboard, review the discovered resources, and confirm the connection — all in a single browser session. The background automation handled the MID server configuration, discovery scheduling, CMDB population, and notification to stakeholders. The user saw a progress screen and then a success state. The complexity was entirely hidden.</p>
    <p>Designing for self-service requires an unusual discipline: you have to resist the urge to expose your system's internal complexity to the user. Every question we removed from the wizard — every decision we made automatically on the user's behalf — reduced the chance of error and reduced the time to completion. The hardest conversations weren't with engineers; they were with the cloud team who felt, reasonably, that they were losing visibility into a process they'd previously owned.</p>

    <h2>The Rollout</h2>
    <p>We launched CAM as an Innovation Lab release, which gave us the freedom to iterate quickly without the full weight of enterprise change management. The first two weeks revealed several assumptions we'd made incorrectly: some users had read-only credentials and couldn't complete the authentication step; some cloud accounts had non-standard naming conventions that broke our account ID validation; some MID servers were behind network configurations we hadn't accounted for.</p>
    <p>Each of these was fixable, and having real users surface them in the first two weeks was infinitely preferable to finding them six months later in a full release. The Lab model gave us permission to be wrong in a bounded context, which meant we could be right in production.</p>

    <h2>The Result</h2>
    <p>Average onboarding time dropped from eight business days to under four minutes for the common case. The support queue for cloud connectivity issues dropped by sixty percent in the first month after the full release, because users who could self-serve their initial connection were also better equipped to self-diagnose connectivity issues later. Those numbers are satisfying in a spreadsheet. What's more satisfying is hearing an engineer say "I didn't even have to file a ticket."</p>
    <p>The thing I'm most proud of isn't the automation — it's that the process now matches the mental model of the person doing it. You have an AWS account. You want ServiceNow to see it. You authenticate, you select, you confirm. That's the mental model. That's the product. The weeks of queued handoffs in between were always a workaround, not a feature.</p>
  `
};
