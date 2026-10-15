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

## Configured DNS (2026-10-15)

The domain administrator confirmed these six records are saved at Spaceship:
five routing records and one ownership-verification TXT record.

| Type | Host | Value |
| --- | --- | --- |
| CNAME | `www` | `kenanniu.github.io` |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| TXT | `_github-pages-challenge-KenanNiu` | Retain the existing GitHub-issued verification token. |

Retain all six records. The TXT token is intentionally not reproduced here.
This documentation update does not modify DNS, purchase services, or change
repository visibility.

## HTTPS and Verification

HTTPS was configured and verified on 2026-10-15. The domain administrator
reported an approved certificate and a certificate-validated `curl --resolve`
response of HTTP/2 200 at 10:29:53 CEST, then successfully enabled HTTPS
enforcement. A subsequent Pages API readback independently confirmed:

| Field | Verified value |
| --- | --- |
| `status` | `built` |
| `cname` | `www.rvirobotics.com` |
| `html_url` | `https://www.rvirobotics.com/` |
| `source.branch` / `source.path` | `main` / `/` |
| `protected_domain_state` | `verified` |
| `https_certificate.state` | `approved` |
| Certificate domains | `www.rvirobotics.com`, `rvirobotics.com` |
| Certificate expiry at this check | `2027-01-13` |
| `https_enforced` | `true` |

After DNS setup, the custom domain was removed and immediately re-added once
to restart provisioning, following GitHub's troubleshooting guidance. Do not
repeat this as a retry loop. Certificate issuance subsequently completed.

## Maintenance

GitHub Pages manages certificate issuance and automatic renewal. The expiry
above is a dated snapshot, not a fixed renewal deadline for manual action.
Keep HTTPS enforcement enabled and retain the configured DNS records, including
the ownership-verification TXT record.

Do not delete the root `CNAME` file. Keep its exact contents as
`www.rvirobotics.com` followed by a newline, and preserve publishing from
`main` at `/`. Do not remove and re-add the domain during routine maintenance.
Never disable TLS certificate validation to work around a certificate error.

Read back the Pages configuration with:

```bash
gh api repos/KenanNiu/KenanNiu.github.io/pages
```

Confirm `cname`, `source.branch`, `source.path`, `https_enforced`, and any
certificate or domain-verification status returned by GitHub.
