# Thunderstore Checker

[![GitHub Super-Linter](https://github.com/WarperSan/action-thunderstore-check/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/WarperSan/action-thunderstore-check/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/WarperSan/action-thunderstore-check/actions/workflows/check-dist.yml/badge.svg)](https://github.com/WarperSan/action-thunderstore-check/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/WarperSan/action-thunderstore-check/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/WarperSan/action-thunderstore-check/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

A GitHub Action for verifying if a mod is valid to be published on Thunderstore

## Thunderstore format

This action _tries_ to replicate the format required by Thunderstore. The format
may not be perfect, and not always be up to date. However, most restrictions
have been found from testing, and from the
[official format requirements](https://thunderstore.io/package/create/docs/).

> [!NOTE]
>
> Theses are the restrictions enforced by this action. Thunderstore themselves
> might have other restrictions hidden.

### Files

<table>
   <tbody>
      <tr>
         <th>Tables</th>
         <th>Restrictions</th>
      </tr>
      <tr>
         <td>icon.png</td>
         <td>
            <ul>
               <li>Required</li>
               <li><code>.png</code> extension</li>
               <li><code>PNG</code> header</li>
               <li>Must be <code>256x256</code></li>
            </ul>
         </td>
      </tr>
      <tr>
         <td>README.md</td>
         <td>
            <ul>
               <li>Required</li>
               <li><code>.md</code> extension</li>
            </ul>
         </td>
      </tr>
      <tr>
         <td>manifest.json</td>
         <td>
            <ul>
               <li>Required</li>
               <li><code>.json</code> extension</li>
               <li><code>{}</code> has the root</li>
               <li>For the properties, see below</li>
            </ul>
         </td>
      </tr>
   </tbody>
</table>

### Manifest

Since `manifest.json` is one of the most complex file, its restrictions will be
listed here, field by field:

<table>
   <thead>
      <tr>
         <td>
            Field
         </td>
         <td>
            Restrictions
         </td>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>name</td>
         <td><ul>
         <li>Required</li>
         <li><code>string</code> value</li>
         <li>Length between <code>1</code> and <code>128</code> inclusive</li>
         <li>Must respect this pattern <code>[a-zA-Z0-9_&nbsp;]+</code></li>
         </ul></td>
      </tr>
      <tr>
         <td>description</td>
         <td><ul>
         <li>Required</li>
         <li><code>string</code> value</li>
         <li>Length between <code>0</code> and <code>250</code> inclusive</li>
         </ul></td>
      </tr>
      <tr>
         <td>version_number</td>
         <td><ul>
         <li>Required</li>
         <li><code>string</code> value</li>
        <li>Length between <code>5</code> and <code>16</code> inclusive</li>
        <li>Must respect this pattern <a href="https://semver.org/" target="_blank"><code>[0-9]+.[0-9]+.[0-9]+</code></a></li>
         </ul></td>
      </tr>
      <tr>
        <td>dependencies</td>
        <td><ul>
         <li>Required</li>
         <li><code>[]</code> value</li>
         <li>Every item must be a <code>string</code></li>
         <li>Every item must respect this pattern <code>${TEAM}-${NAME}-${VERSION}</code>:
            <ul>
            <li><code>${TEAM}</code>: <code>(?!_)[a-zA-Z0-9_]+(?&lt;!_)</code></li>
            <li><code>${NAME}</code>: same as <code>name</code>;</li>
            <li><code>${VERSION}</code>: same as <code>version_number</code>;</li>
            </ul>
         </li>
         </ul></td>
      </tr>
      <tr>
        <td>website_url</td>
        <td><ul>
         <li>Required</li>
         <li><code>string</code> value</li>
         <li>Length between <code>0</code> and <code>1024</code> inclusive</li>
         <li>Must respect this pattern <a href="https://stackoverflow.com/a/3809435" target="_blank"><code>https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&/=]*</code></a>, <b>only if not empty</b></li>
         </ul></td>
      </tr>
   </tbody>
</table>
