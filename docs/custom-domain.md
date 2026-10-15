# Custom Domain

The GitHub Pages custom domain is `www.rvirobotics.com` for
`KenanNiu/KenanNiu.github.io`. The publishing source remains branch `main`,
repository root (`/`). The root `CNAME` file contains only this domain.

## Deployment Order

1. Merge the `CNAME` file into `main`.
2. Set the GitHub Pages custom domain to `www.rvirobotics.com` and confirm
   the Pages API returns that exact `cname`, with source `main` and path `/`.
3. Only after GitHub confirms the binding, the domain administrator may update
   routing DNS at Spaceship. Domain ownership verification, if needed, is also
   handled by the domain administrator.

## Expected DNS

| Type | Host | Value |
| --- | --- | --- |
| CNAME | `www` | `kenanniu.github.io` |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Replace conflicting records for these hosts as appropriate. These are expected
records, not confirmation that DNS has been changed. This repository change does
not modify DNS, purchase services, or change repository visibility.

## HTTPS and Verification

On 2026-10-15, the domain administrator confirmed all five DNS records were
saved and GitHub reported successful ownership verification of `rvirobotics.com`.
Retain the `_github-pages-challenge-KenanNiu` TXT record used for verification.
The Pages API also confirmed `protected_domain_state: verified`. Ownership
verification is separate from certificate provisioning and HTTPS enforcement.

After DNS setup, the custom domain was removed and immediately re-added once
to restart provisioning, following GitHub's troubleshooting guidance. Do not
repeat this as a retry loop. Check the live API and certificate for current
HTTPS readiness; these setup facts are not a claim that HTTPS is operational.

Retain existing HTTPS enforcement; do not disable it during domain setup.
The GitHub domain binding alone does not establish that TLS is ready. DNS
propagation, GitHub DNS checks, and certificate provisioning may remain pending.
After routing DNS is updated, check Pages settings and verify the certificate
and HTTPS response for `www.rvirobotics.com` before declaring HTTPS operational.

Read back the Pages configuration with:

```bash
gh api repos/KenanNiu/KenanNiu.github.io/pages
```

Confirm `cname`, `source.branch`, `source.path`, `https_enforced`, and any
certificate or domain-verification status returned by GitHub.
