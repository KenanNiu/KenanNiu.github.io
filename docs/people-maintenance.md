# People and RAM sources

The People page contains Group Lead, Postdoctoral Researchers, PhD Researchers, Master's Students and Alumni sections. Group membership was specified by Kenan Niu. Public staff names, research interests, professional email addresses and portraits were checked against the RAM staff directory and individual profiles on October 14, 2026. The eleven master's students were identified from the Chrome profile tabs selected by Kenan and verified from their RAM page headings.

Edit `assets/data/people-data.js` to maintain members. Use `group` values `lead`, `postdoc`, `phd`, `master` or `alumni`. Alumni currently has no records and intentionally renders only its heading. Keep member roles accurate and preserve the RAM profile link and source-photo URL when updating staff portraits.

Local portrait files are the original RAM 500px square thumbnails, with no face editing. `maintenance/people-sources.json` records their origins. Public source credit appears on the People page, and each member links directly to their RAM profile.

Master's students use only the shared `student-avatar.svg` placeholder. No student photos, email addresses or project details are copied. `maintenance/master-student-sources.json` records their public profile URLs. Deduplicate both normalized names and RAM profile paths before adding records; remove `/index.php`, query strings and trailing slashes when comparing URLs. Tests reject duplicate profiles and accidental use of student photographs.

Both full and concise versions use a sky-blue theme. Stylesheet references include a version query to refresh cached files; update that version when future palette changes need a cache refresh.
